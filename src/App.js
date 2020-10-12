import React, { useState } from "react";

const api = {
  key: "3b4d400cff667843a180ba79628ae52a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [bg, setBg] = useState("");
  const userLang = navigator.language || navigator.userLanguage;

  async function search(evt) {
    if (evt.key === "Enter") {
      try {
        const res = await fetch(
          `${api.base}weather?q=${query}&units=metric&lang=${userLang}&appid=${api.key}`
        );
        console.log(res.status);
        const result = await res.json();
        console.log(result);
        setQuery("");
        if (res.status !== 200) {
          alert("Try another Town/City");
        } else {
          setWeather(result);
          setBg(result.weather[0].main);
        }
      } catch (e) {}
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  function renderSwitch() {
    switch (bg) {
      case "Clouds":
        return "appCloud";
      case "Clear":
        return "appClear";
      case "Rain":
      case "Drizzle":
        return "appRain";
      case "Thunderstorm":
        return "appStorm";
      case "Snow":
        return "appSnow";
      default:
        return "app";
    }
  }

  return (
    <div className={renderSwitch()}>
      <main>
        <div className="search-box">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            type="text"
            className="search-bar"
            onKeyPress={search}
            placeholder="Search for a Country/City/Town"
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
