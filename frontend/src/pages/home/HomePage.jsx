import { useEffect, useState } from "react";
import WeatherTime from "../../components/WeatherTime";
import WeatherDay from "../../components/WeatherDay";
import LoadingSpinner from "../../components/LoadingSpinner";

function HomePage({ plz }) {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    async function fetchWeatherData(plz) {
      const res = await fetch("http://localhost:5000/api/plz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plz }),
      });
      const data = await res.json();
      setWeatherData(data);
    }
    if (plz) fetchWeatherData(plz);
  }, [plz]);

  if (!weatherData)
    return (
      <div className="flex justify-center h-full items-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  const { current, forecast } = weatherData;

  // Hilfsfunktion: Gruppiere Forecast nach Tag und berechne min/max
  const days = {};
  forecast.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  const dayEntries = Object.entries(days)
    .filter(([date]) =>
      days[date].some((item) => item.dt_txt.includes("12:00:00"))
    )
    .map(([date, items]) => {
      const min = Math.min(...items.map((i) => i.main.temp));
      const max = Math.max(...items.map((i) => i.main.temp));
      // Finde das Item für 12:00 Uhr
      const noonItem = items.find((i) => i.dt_txt.includes("12:00:00"));
      return {
        dt: noonItem.dt,
        weather: noonItem.weather,
        sunrise: current.sys.sunrise,
        sunset: current.sys.sunset,
        temp: { max, min },
        pop: noonItem.pop,
        rain: noonItem.rain ? noonItem.rain["3h"] : 0,
      };
    });

  return (
    <div>
      <div className="flex items-center gap-6 p-6">
        {/* Wetter-Icon */}
        {current.weather && current.weather[0] && (
          <img
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
            className="w-20 h-20"
          />
        )}
        {/* Temperatur und Beschreibung */}
        <div>
          <div className="text-3xl font-bold">
            {Math.round(current.main.temp)}°C
          </div>
          <div className="text-lg mt-2">{current.weather[0].description}</div>
        </div>
      </div>
      {/* WeatherTime Components für die nächsten Stunden */}
      <div className="flex gap-4 px-6 overflow-x-auto">
        {forecast.slice(0, 8).map((item) => (
          <WeatherTime
            key={item.dt}
            dt_txt={item.dt_txt}
            weather={item.weather}
            temp={item.main.temp}
          />
        ))}
      </div>
      {/* WeatherDay Components für die nächsten Tage */}
      <div className="flex flex-col gap-4 px-6 mt-8">
        {dayEntries.map((item) => (
          <WeatherDay
            key={item.dt}
            dt={item.dt}
            weather={item.weather}
            sunrise={item.sunrise}
            sunset={item.sunset}
            temp={item.temp}
            pop={item.pop}
            rain={item.rain}
          />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
