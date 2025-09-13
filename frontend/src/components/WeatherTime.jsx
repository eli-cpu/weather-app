import React from "react";

function WeatherTime({ dt_txt, weather, temp }) {
  // Wetter-Icon von OpenWeatherMap
  const iconUrl =
    weather && weather[0]
      ? `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
      : "";
  // Uhrzeit extrahieren (z.B. 18:00)
  const time = dt_txt ? dt_txt.split(" ")[1].slice(0, 5) : "";
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-semibold">{time}</div>
      {iconUrl && (
        <img src={iconUrl} alt={weather[0].description} className="w-25 h-25" />
      )}
      <div className="text-xl mt-2">{Math.round(temp)}°C</div>
    </div>
  );
}

export default WeatherTime;
