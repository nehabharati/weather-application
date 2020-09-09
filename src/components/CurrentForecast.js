import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GeneralStats from "./GeneralStats";
import {
  getCurrentTemp,
  getCurrentImage,
  getHourlyTemp,
  getHourlyTime,
} from "../utils/getCurrentData";
import { isClicked } from "../actions/itemActions";
import { Line } from "react-chartjs-2";
import { setLoadingStatus } from "../utils/getDailyInfo";
import "chart.js";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import { getIndividualTimes } from "../utils/getCurrentData";
import moment from "moment";

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
  const [individualDay, setIndividualDay] = useState([]);

  useEffect(() => {
    setLoadingStatus(props.item.city).then((res) => setLoading(res));
  }, []);

  useEffect(() => {
    getIndividualTimes(props.item.city).then((res) => setIndividualDay(res));

    let a = individualDay.filter((day) => {
      if (props.item.data === day.date[0].slice(0, 3)) {
        return day;
      }
    });

    let newTime = a.map((i) => {
      return i.date.map((j) => moment(j).format("X"));
    });
    let newTemp = a.map((i) => {
      return i.temp;
    });
    let b = newTime.map((j) => {
      return j.map((k) => moment.unix(k).format("ha"));
    });

    let c = [];
    let d = [];
    for (var i = 0; i < b.length; i++) {
      for (var j = 0; j < b[i].length; j++) {
        c.push(b[i][j]);
      }
    }
    for (var k = 0; k < newTemp.length; k++) {
      for (var l = 0; l < newTemp[k].length; l++) {
        d.push(newTemp[k][l]);
      }
    }

    setHourlyTime(c.slice(0, 5));
    setHourlyTemp(d.slice(0, 5));
  }, [props.item.clicked]);

  useEffect(() => {
    getCurrentTemp(props.item.city).then((res) => setCurrentTemp(res));
    getCurrentImage(props.item.city).then((res) => setImage(res));
    getHourlyTime(props.item.city).then((res) => {
      setHourlyTime(res.slice(0, 5));
    });
    getHourlyTemp(props.item.city).then((res) =>
      setHourlyTemp(res.slice(0, 5))
    );
  }, [props.item.city]);

  const state = {
    labels: hourlyTime,
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: hourlyTemp,
      },
    ],
  };

  const lineOptions = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
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
              options={lineOptions}
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

export default connect(mapStateToProps, { isClicked })(CurrentForecast);
