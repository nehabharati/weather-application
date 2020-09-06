import moment from "moment";
import Sun from "../images/sun.svg";
import Rain from "../images/rain.svg";
import Cloud from "../images/cloud.svg";

export function getCurrentTemp(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=df5e6e0908d845b489d8ce684b445d98`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            res.results[0].geometry.lat +
            "&lon=" +
            res.results[0].geometry.lng +
            "&units=metric&appid=4228472bfff238b3fd66bffb5801409a"
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(Math.floor(res.current.temp));
          })
      );
  });
}

export function getCurrentImage(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=df5e6e0908d845b489d8ce684b445d98`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            res.results[0].geometry.lat +
            "&lon=" +
            res.results[0].geometry.lng +
            "&units=metric&appid=4228472bfff238b3fd66bffb5801409a"
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.current.weather[0].main === "Rain") {
              resolve(Rain);
            } else if (
              res.current.weather[0].main === "Sunny" ||
              res.current.weather[0].main === "Clear"
            ) {
              resolve(Sun);
            } else {
              resolve(Cloud);
            }
          })
      );
  });
}

export function getHourlyTime(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=df5e6e0908d845b489d8ce684b445d98`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            res.results[0].geometry.lat +
            "&lon=" +
            res.results[0].geometry.lng +
            "&units=metric&appid=4228472bfff238b3fd66bffb5801409a"
        )
          .then((res) => res.json())
          .then((res) => {
            let time = [];
            let a = time.concat(
              res.hourly.map((timestamp) =>
                moment.unix(timestamp.dt).format("h:mm a")
              )
            );
            resolve(a);
          })
      );
  });
}

export function getHourlyTemp(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=df5e6e0908d845b489d8ce684b445d98`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            res.results[0].geometry.lat +
            "&lon=" +
            res.results[0].geometry.lng +
            "&units=metric&appid=4228472bfff238b3fd66bffb5801409a"
        )
          .then((res) => res.json())
          .then((res) => {
            let temp = [];
            let b = temp.concat(
              res.hourly.map((timestamp) => Math.floor(timestamp.temp))
            );
            resolve(b);
          })
      );
  });
}

export function getCurrentDescription(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=df5e6e0908d845b489d8ce684b445d98`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            res.results[0].geometry.lat +
            "&lon=" +
            res.results[0].geometry.lng +
            "&units=metric&appid=4228472bfff238b3fd66bffb5801409a"
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(res.current.weather[0].main);
          })
      );
  });
}
