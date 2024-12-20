"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getForecast } from "../../api/methods";
import { IForecastData } from "../../api/types";

interface IError {
    message: string;
    code: number;
}
interface WeatherContextType {
  weatherData: IForecastData | undefined;
  isLoading: boolean;
  fetchWeatherData: (query: string) => void;
  error: IError | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = React.useState<string>("");
  const [error, setError] = React.useState<IError | null>(null);

  const {
    data: weatherData,
    refetch,
    isLoading: isLoadingWeatherData,
    isRefetching,
    error: errorWeatherData,
    isError,
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
    if (isError && errorWeatherData) {
      const errorMessage =
        (errorWeatherData as { response?: { data?: { error?: IError } } })
          ?.response?.data?.error || { message: "An unknown error occurred", code: 0 };
      setError(errorMessage);
    }
  }, [errorWeatherData, isError]);

  useEffect(() => {
    if (query) {
      refetch();
      setError(null);
    }
  }, [query, refetch]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        isLoading,
        fetchWeatherData,
        error,
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
