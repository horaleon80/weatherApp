"use client";
import { useState } from "react";
import { useWeather } from "../../context/Weather";
import Suggestion from "../Suggestion/Suggestion";

const Aside = () => {
  const cities = [
    "London",
    "Paris",
    "New York",
    "Tokyo",
    "Dublin",
    "Berlin",
    "Sydney",
    "Rome",
    "Madrid",
    "Vienna",
    "Moscow",
    "Beijing",
    "Los Angeles",
    "Mumbai",
    "Cape Town",
  ];

  const [selectedCondition, setSelectedCondition] = useState<string>("");

  const { weatherData } = useWeather();

  const location = weatherData?.location;
  const current = weatherData?.current;

  if (!location || !current) return null;

  return (
    <div className="lg:w-[30%] w-full max-w-none mx-0 flex flex-col gap-5">
      <div className="text-center">
        <h2 className="text-white text-2xl font-bold mb-4">Popular Cities</h2>
        <div className="flex justify-center items-center gap-4 mb-6">
          <label htmlFor="condition-filter" className="text-white text-sm">
            Filter by Weather Condition:
          </label>
          <select
            id="condition-filter"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="p-2 rounded-md border border-gray-300 bg-white text-gray-800"
          >
            <option value="">All Conditions</option>
            <option value="Cloudy">Cloudy</option>
            <option value="Sunny">Sunny</option>
            <option value="Overcast">Overcast</option>
            <option value="Light rain">Light Rain</option>
            <option value="Light rain shower">Light Rain Shower</option>
            <option value="Patchy rain nearby">Patchy Rain Nearby</option>
            <option value="Partly cloudy">Partly Cloudy</option>
          </select>
        </div>
      </div>

      {cities.slice(0, 10).map((city, index) => (
        <Suggestion
          key={index}
          suggestion={city}
          selectedCondition={selectedCondition}
        />
      ))}
    </div>
  );
};

export default Aside;
