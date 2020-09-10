import moment from "moment";
import Sun from "../images/sun.svg";
import Rain from "../images/rain.svg";
import Cloud from "../images/cloud.svg";

export function getDailyInfo(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ebba0a82b1892fe9343e963816506644`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=ebba0a82b1892fe9343e963816506644`
        )
          .then((res) => res.json())
          .then((res) => {
            let dailyDays = [];
            let dailyMinTemp = [];
            let dailyMaxTemp = [];
            let dailyWeather = [];
            let a = dailyDays.concat(
              res.daily.map((timestamp) =>
                moment.unix(timestamp.dt).format("dddd").slice(0, 3)
              )
            );
            let b = dailyMaxTemp.concat(
              res.daily.map((maxTemp) => Math.floor(maxTemp.temp.max))
            );
            let c = dailyMinTemp.concat(
              res.daily.map((minTemp) => Math.floor(minTemp.temp.min))
            );
            let d = dailyWeather.concat(
              res.daily.map((weather) => weather.weather[0].main)
            );
            let e = res.daily.map((weather) => {
              if (weather.weather[0].main === "Rain") {
                return Rain;
              } else if (
                weather.weather[0].main === "Sunny" ||
                weather.weather[0].main === "Clear"
              ) {
                return Sun;
              } else {
                return Cloud;
              }
            });
            let arr = [];
            let tmp;
            var len = res.daily.length;
            for (let i = 0; i < len; i++) {
              tmp = {
                day: a[i],
                max: b[i],
                min: c[i],
                weather: d[i],
                image: e[i],
                clicked: false,
              };
              arr.push(tmp);
            }
            resolve(arr);
          })
      );
  });
}

export function setLoadingStatus(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ebba0a82b1892fe9343e963816506644`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=ebba0a82b1892fe9343e963816506644`
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(false);
          })
      );
  });
}
