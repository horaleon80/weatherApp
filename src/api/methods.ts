import { get } from "./index";
import { ITimeZone, IWeatherData, IForecastData } from "./types";

export const getTimeZone = (lat: number, lon: number): Promise<ITimeZone> => {
  return get({
    path: "timezone.json",
    params: { q: `${lat},${lon}` },
  });
};

export const getCurrentWeather = (input: string): Promise<IWeatherData> => {
  return get({
    path: "current.json",
    params: { q: input },
  });
};

export const getForecast = (input: string): Promise<IForecastData> => {
  return get({
    path: "forecast.json",
    params: { q: input, days: 10, aqi: "no", alerts: "no" },
  });
};
