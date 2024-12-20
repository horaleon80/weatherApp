"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useWeather } from "../../context/Weather";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");

  const { fetchWeatherData, isLoading, error } = useWeather();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeatherData(query);
    setQuery("");
  };
  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex items-center space-x-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search for a location..."
        className="w-full px-4 py-2 rounded-md text-gray-800 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
      {error && <p className="text-red-500 text-sm font-bold">{error?.message}</p>}
    </form>
  );
};

export default SearchBar;
