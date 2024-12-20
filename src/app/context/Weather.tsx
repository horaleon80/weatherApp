"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../../api/methods";
import { IForecastData } from "../../api/types";

interface WeatherContextType {
  weatherData: IForecastData | undefined;
  isLoading: boolean;
  fetchWeatherData: (query: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = React.useState<string>("");

  const {
    data: weatherData,
    refetch,
    isLoading: isLoadingWeatherData,
    isRefetching
  } = useQuery({
    queryKey: ["getForecast", query],
    queryFn: () => getForecast(query),
    enabled: false,
  });

  const isLoading = isLoadingWeatherData || isRefetching;

  const fetchWeatherData = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query, refetch]);
  
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        fetchWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
