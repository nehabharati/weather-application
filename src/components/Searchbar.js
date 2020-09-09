import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import cities from "../cities.json";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";
import {
  getCurrentImage,
  getCurrentDescription,
  getCurrentTemp,
} from "../utils/getCurrentData";
import Sun from "../images/sun.svg";
import Rain from "../images/rain.svg";
import Cloud from "../images/cloud.svg";

function Searchbar(props) {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(true);
  const [temp, setTemp] = useState(25);
  const [image, setImage] = useState("/static/media/cloud.33a1548b.svg");
  const [desciption, setDescription] = useState("Rain");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=ebba0a82b1892fe9343e963816506644`
      )
        .then((res) => res.json())
        .then((res) => {
          setTemp(Math.floor(res.current.temp));
          if (res.current.weather[0].main === "Rain") {
            setImage(Rain);
          } else if (
            res.current.weather[0].main === "Sunny" ||
            res.current.weather[0].main === "Clear"
          ) {
            setImage(Sun);
          } else {
            setImage(Cloud);
          }
          setDescription(res.current.weather[0].main);
        });
    });
  }, []);

  const fuse = new Fuse(cities, {
    keys: ["name"],
    includeScore: true,
    threshold: 0.05,
  });

  const results = fuse.search(query);
  const cityResults = results.map((result) => result.item);

  function handleSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
    setShow(true);
  }

  const handleClick = (city) => {
    props.getItems(city);
    setQuery(city);
    setShow(false);
    getCurrentTemp(props.item.city).then((res) => setTemp(res));
    getCurrentImage(props.item.city).then((res) => {
      setImage(res);
    });
    getCurrentDescription(props.item.city).then((res) => {
      setDescription(res);
    });
  };

  return (
    <div className="search-bar">
      <form>
        <img
          src={require("../images/pin.svg")}
          alt="location svg"
          style={{ width: "20px", margin: "0 10px" }}
        />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a city"
        />
      </form>
      <ul>
        {cityResults.map((city) => (
          <div className="search-items">
            <li
              key={city.refIndex}
              style={{
                display: show ? "block" : "none",
              }}
              onClick={() => handleClick(city.name)}
            >
              {city.name}, <span style={{ color: "#777" }}>{city.state}</span>
            </li>
            <div
              className="search"
              style={{
                display: show ? "flex" : "none",
              }}
            >
              <div className="search-desc">
                <div>{temp}&deg; C</div>
                <div>{desciption}</div>
              </div>
              <img
                src={image}
                alt="weather status"
                style={{
                  width: "30px",
                  marginRight: "1em",
                  marginLeft: "1em",
                }}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

export default connect(mapStateToProps, { getItems })(Searchbar);
