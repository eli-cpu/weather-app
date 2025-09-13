import React from "react";

function WeatherDay({ dt, weather, sunrise, sunset, temp, pop, rain }) {
  // Tag als Kürzel
  const weekday = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."][
    new Date(dt * 1000).getDay()
  ];
  // Wetter-Icon
  const iconUrl =
    weather && weather[0]
      ? `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
      : "";
  // Sonnenstunden berechnen
  const sunHours = Math.round((sunset - sunrise) / 3600);
  // Beschreibung
  const description = weather && weather[0] ? weather[0].description : "";
  // Regenwahrscheinlichkeit in %
  const popPercent = Math.round((pop || 0) * 100);
  // Niederschlagsmenge in mm
  const rainAmount = rain ? rain : 0;
  // Datum TT.MM mit führender Null
  const dateObj = new Date(dt * 1000);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dateStr = `${day}.${month}`;
  return (
    <div className="flex flex-row p-4 border rounded-lg w-full items-center">
      {/* Tag ganz links */}
      <div className="w-16 text-lg font-bold flex-shrink-0 text-center">
        {weekday}
        <div className="text-sm font-normal mt-1">{dateStr}</div>
      </div>
      {/* Mitte: Icon und Sonnenstunden */}
      <div className="flex flex-col items-center mx-4">
        {iconUrl && (
          <img src={iconUrl} alt={description} className="w-25 h-25" />
        )}
        <div className="text-sm mt-2">Tagesstunden: {sunHours}</div>
      </div>
      {/* Rechts: Restliche Infos */}
      <div className="flex flex-col items-start flex-1">
        <div className="text-xl font-semibold">
          {Math.round(temp.max)}° / {Math.round(temp.min)}°
        </div>
        <div className="mt-2 text-base italic">{description}</div>
        <div className="mt-1 text-sm">
          Regenwahrscheinlichkeit: {popPercent}%
        </div>
        <div className="text-sm">Niederschlag: {rainAmount} mm</div>
      </div>
    </div>
  );
}

export default WeatherDay;
