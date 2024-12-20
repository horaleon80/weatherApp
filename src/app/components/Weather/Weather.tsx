import { useWeather } from "../../context/Weather";

const Weather = () => {
  const { weatherData } = useWeather();
  
  const location = weatherData?.location;
  const current = weatherData?.current;

  if(!location || !current) return null;

  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {location?.name}, {location?.region}
            </h2>
            <p className="text-lg">{location?.country}</p>
          </div>
          <div className="text-md text-right">
            <p className="font-semibold">Local Time</p>
            <p>{new Date(location?.localtime || "")?.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <img
            src={current?.condition.icon}
            alt={current?.condition.text}
            className="w-20 h-20 mr-6"
          />
          <div>
            <h3 className="text-5xl font-bold">{current?.temp_c}°C</h3>
            <p className="text-lg capitalize">{current?.condition.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-md mb-6">
          <div>
            <p className="font-semibold">Feels Like</p>
            <p>{current?.feelslike_c}°C</p>
          </div>
          <div>
            <p className="font-semibold">Wind Chill</p>
            <p>{current?.windchill_c}°C</p>
          </div>
          <div>
            <p className="font-semibold">Humidity</p>
            <p>{current?.humidity}%</p>
          </div>
          <div>
            <p className="font-semibold">Pressure</p>
            <p>{current?.pressure_mb} mb</p>
          </div>
          <div>
            <p className="font-semibold">Visibility</p>
            <p>{current?.vis_km} km</p>
          </div>
          <div>
            <p className="font-semibold">UV Index</p>
            <p>{current?.uv}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-md">
          <div>
            <p className="font-semibold">Wind</p>
            <p>
              {current?.wind_kph} kph ({current?.wind_dir})
            </p>
          </div>
          <div>
            <p className="font-semibold">Gust Speed</p>
            <p>{current?.gust_kph} kph</p>
          </div>
          <div>
            <p className="font-semibold">Precipitation</p>
            <p>{current?.precip_mm} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
