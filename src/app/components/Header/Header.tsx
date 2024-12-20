"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { getTimeZone } from "../../../api/methods";
import { cleanTimeZone } from "../../../utils/helpers";

interface Coordinates {
  latitude: string | null;
  longitude: string | null;
}

const Header: React.FC = () => {
  const [coords, setCoords] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoords({ latitude: "N/A", longitude: "N/A" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude.toFixed(4),
          longitude: position.coords.longitude.toFixed(4),
        });
      },
      () => {
        setCoords({ latitude: "N/A", longitude: "N/A" });
      }
    );
  }, []);

  const { data: timeZoneData, isLoading: isLoadingTimeZoneData } = useQuery({
    queryKey: ["getTimeZone"],
    queryFn: () =>
      getTimeZone(Number(coords.latitude), Number(coords.longitude)),
    enabled: !!coords.latitude && !!coords.longitude,
  });

  const country = timeZoneData?.location?.country;
  const city = timeZoneData?.location?.name;
  const timezone = cleanTimeZone(timeZoneData?.location?.tz_id);

  return (
    <header className="min-h-[62px] lg:min-h-[82px] bg-blue-600 flex flex-row flex-wrap lg:flex-nowrap items-center justify-between px-4 py-4">
      <div className="w-full lg:w-1/2 flex-1 min-w-[200px]">
        <SearchBar />
      </div>

      <div className="w-full lg:w-1/2 flex flex-row lg:justify-end items-center space-x-4 mt-4 lg:mt-0 lg:ml-10">
        {isLoadingTimeZoneData ? (
          <span className="text-white text-sm lg:text-base">Loading...</span>
        ) : (
          <>
            <span className="text-white text-sm lg:text-base">
              {city && country
                ? `${city}, ${country}`
                : ""}
            </span>

            <span className="text-white text-sm lg:text-base">
              {timezone ? <span className="font-bold">Time Zone:</span> : ""}{" "}
              {timezone || ""}
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
