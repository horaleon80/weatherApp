import React from "react";
import ForecastItem from "../ForecastItem/ForecastItem";
import { useWeather } from "../../context/Weather";

const Forecast = () => {
  const { weatherData } = useWeather();

  const forecast = weatherData?.forecast?.forecastday;

  if (!forecast) return <></>;

  return (
    <div className="pt-4 max-w-[672px] mx-auto">
      <h2 className="text-white text-2xl font-bold mb-4">Forecast</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[672px] mx-auto">
        {forecast?.map((day) => (
          <ForecastItem
            key={day.date}
            date={day.date}
            minTemp={day.day.mintemp_c}
            maxTemp={day.day.maxtemp_c}
            icon={day.day.condition.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;
