import React from "react";

interface IForecastItem {
  date: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

const ForecastItem = ({ date, minTemp, maxTemp, icon }: IForecastItem) => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-sm font-semibold mb-2">{new Date(date).toLocaleDateString()}</h2>
      <img src={icon} alt="Weather Icon" className="w-8 h-8 mb-2" />
      <div className="text-xs flex flex-col items-center">
        <p>Min: <span className="font-bold">{minTemp}°C</span></p>
        <p>Max: <span className="font-bold">{maxTemp}°C</span></p>
      </div>
    </div>
  );
};

export default ForecastItem;
