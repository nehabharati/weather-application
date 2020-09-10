import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  getPressureInfo,
  getHumidityInfo,
  getSunriseInfo,
  getSunsetInfo,
} from "../utils/getInfo";
import "chart.js";
import { setLoadingStatus } from "../utils/getDailyInfo";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import Canvas from "./Canvas";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function GeneralStats(props) {
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoadingStatus(props.item.city).then((res) => setLoading(res));
    getSunriseInfo(props.item.city).then((res) => setSunrise(res));
    getSunsetInfo(props.item.city).then((res) => setSunset(res));
  }, []);

  useEffect(() => {
    getPressureInfo(props.item.city).then((res) => setPressure(res));
    getHumidityInfo(props.item.city).then((res) => setHumidity(res));
    getSunriseInfo(props.item.city).then((res) => setSunrise(res));
    getSunsetInfo(props.item.city).then((res) => setSunset(res));
  }, [props.item.city]);

  const state = {
    labels: [...sunrise, "1pm", ...sunset],
    datasets: [
      {
        label: "",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgb(255,240,157,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [0, 1, 0],
      },
    ],
  };

  return (
    <div className="general-container">
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
          <div className="stats">
            <div>
              <h4>Pressure</h4>
              {pressure} hpa
            </div>
            <div>
              <h4>Humidity</h4>
              {humidity} %
            </div>
          </div>
          <div className="rise-chart">
            <div className="sun-timing">
              <div>
                <h4>Sunrise</h4>
                {sunrise}
              </div>
              <div>
                <h4>Sunset</h4>
                {sunset}
              </div>
            </div>
            {/* <Line
              data={state}
              options={{
                legend: {
                  display: false,
                },
              }}
            /> */}
            <Canvas sunrise={sunrise} sunset={sunset} />
          </div>
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

export default connect(mapStateToProps, {})(GeneralStats);
