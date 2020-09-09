import moment from "moment";
import Sun from "../images/sun.svg";
import Rain from "../images/rain.svg";
import Cloud from "../images/cloud.svg";

export function getCurrentTemp(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
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
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
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
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            let time = [];
            let a = time.concat(
              res.hourly.map((timestamp) =>
                moment.unix(timestamp.dt).format("ha")
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
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
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
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(res.current.weather[0].main);
          })
      );
  });
}

export function getIndividualTimes(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${res.city.coord.lat}&lon=${res.city.coord.lon}&units=metric&appid=8a4db5ed7640d2dd4ae31072e75c9b45`
        )
          .then((res) => res.json())
          .then((res) => {
            let dailyDays = [];
            let array = dailyDays.concat(
              res.hourly.map((timestamp) => {
                return moment.unix(timestamp.dt).format("llll");
              })
            );
            let dailyTemps = [];
            let temps = dailyTemps.concat(
              res.hourly.map((temp) => Math.floor(temp.temp))
            );
            let arr1, arr2, temp1, temp2;
            let i = 0;
            let obj1, obj2, obj3;

            while (i < array.length) {
              if (array[i].slice(0, 3) !== array[i + 1].slice(0, 3)) {
                arr1 = array.splice(0, i + 1);
                temp1 = temps.splice(0, i + 1);
                break;
              }
              i++;
            }
            while (i < array.length) {
              if (array[i].slice(0, 3) !== array[i + 1].slice(0, 3)) {
                arr2 = array.splice(0, i + 1);
                temp2 = temps.splice(0, i + 1);
                break;
              }
              i++;
            }
            obj1 = {
              date: arr1,
              temp: temp1,
            };
            obj2 = {
              date: arr2,
              temp: temp2,
            };
            obj3 = {
              date: array,
              temp: temps,
            };
            let arr = [];
            arr.push(obj1, obj2, obj3);
            resolve(arr);
          })
      );
  });
}
