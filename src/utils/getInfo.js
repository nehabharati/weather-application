import moment from "moment";
import Sun from "../images/sun.svg";
import Rain from "../images/rain.svg";
import Cloud from "../images/cloud.svg";

export function getPressureInfo(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(res.current.pressure);
          })
      );
  });
}

export function getHumidityInfo(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(res.current.humidity);
          })
      );
  });
}

export function getSunriseInfo(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            let sunriseTime = [];
            let a = sunriseTime.concat(
              moment.unix(res.current.sunrise).format("h:mm a")
            );

            resolve(a);
          })
      );
  });
}

export function getSunsetInfo(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            let sunsetTime = [];
            let b = sunsetTime.concat(
              moment.unix(res.current.sunset).format("h:mm a")
            );
            resolve(b);
          })
      );
  });
}

export function getCurrentData(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
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
