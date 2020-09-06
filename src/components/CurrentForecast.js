import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GeneralStats from "./GeneralStats";
import {
  getCurrentTemp,
  getCurrentImage,
  getHourlyTemp,
  getHourlyTime,
} from "../utils/getCurrentData";
import { Line } from "react-chartjs-2";
import { setLoadingStatus } from "../utils/getDailyInfo";
import "chart.js";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function CurrentForecast(props) {
  const [currentTemp, setCurrentTemp] = useState(0);
  const [image, setImage] = useState("");
  const [hourlyTime, setHourlyTime] = useState([]);
  const [hourlyTemp, setHourlyTemp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoadingStatus(props.item.city).then((res) => setLoading(res));
  }, []);

  useEffect(() => {
    getCurrentTemp(props.item.city).then((res) => setCurrentTemp(res));
    getCurrentImage(props.item.city).then((res) => setImage(res));
    getHourlyTime(props.item.city).then((res) =>
      setHourlyTime(res.slice(0, 25))
    );
    getHourlyTemp(props.item.city).then((res) =>
      setHourlyTemp(res.slice(0, 25))
    );
  }, [props.item.city]);

  const state = {
    labels: hourlyTime,
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: hourlyTemp,
      },
    ],
  };

  return (
    <div className="current-container">
      <div className="sweet-loading">
        <RingLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      </div>
      {!loading && (
        <>
          <div className="main-weather">
            <div className="current-temp">{currentTemp}&deg;C</div>
            <img
              src={image}
              alt="Weather status"
              style={{
                width: "70px",
                margin: "0 3em",
              }}
            />
          </div>
          <div className="chart">
            <Line
              data={state}
              options={{
                legend: {
                  display: false,
                },
              }}
              style={{ padding: "1em" }}
            />
          </div>
          <GeneralStats />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

export default connect(mapStateToProps, {})(CurrentForecast);
