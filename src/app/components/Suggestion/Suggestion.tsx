import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../../../api/methods";
import { useWeather } from "../../context/Weather";

interface ISuggestion {
  suggestion: string;
  selectedCondition: string;
}

const Suggestion = ({ suggestion, selectedCondition }: ISuggestion) => {
  const { fetchWeatherData } = useWeather();

  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["getCurrentWeather", suggestion],
    queryFn: () => getCurrentWeather(suggestion),
    enabled: suggestion !== "",
  });

  const city = weatherData?.location.name;
  const tempC = weatherData?.current.temp_c;
  const condition = weatherData?.current.condition.text;

  const handleCity = () => {
    fetchWeatherData(suggestion);
  };

  if (selectedCondition) {
    if (condition?.toLowerCase() !== selectedCondition.toLowerCase()) {
      return <></>;
    }
  }

  if (isLoading) return <></>;

  return (
    <button
      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white max-w-[42rem] p-4 rounded-lg shadow-md flex items-center justify-between max-w-xs mx-auto w-full p-4 bg-gray-100 rounded-md shadow text-center"
      onClick={handleCity}
    >
      <div>
        <h3 className="text-lg font-semibold">{city}&nbsp;</h3>
      </div>

      <div className="text-2xl font-bold">{tempC}°C</div>
    </button>
  );
};

export default Suggestion;
