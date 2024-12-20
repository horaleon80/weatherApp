"use client";
import { useWeather } from "./context/Weather";
import Loader from "./components/Loader/Loader";
import Aside from "./components/Aside/Aside";
import Weather from "./components/Weather/Weather";
import ForecastList from "./components/ForecastList/ForecastList";

export default function Home() {
  const { isLoading } = useWeather();

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="flex flex-col lg:flex-row gap-5 lg:gap-5 max-w-[900px] mx-[12px] mt-[24px] lg:mx-auto">
        <div className="w-full lg:w-[70%]">
          <Weather />
          <ForecastList />
        </div>
        <Aside />
      </section>
    </>
  );
}
