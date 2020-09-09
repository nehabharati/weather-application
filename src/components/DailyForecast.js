import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getHourlyData, isClicked } from "../actions/itemActions";
import { getDailyInfo, setLoadingStatus } from "../utils/getDailyInfo";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function DailyForecast(props) {
  const [dailyInfo, setDailyInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoadingStatus(props.item.city).then((res) => setLoading(res));
  }, []);

  useEffect(() => {
    getDailyInfo(props.item.city).then((res) => setDailyInfo(res));
  }, [props.item.city]);

  function handleClick(item) {
    props.getHourlyData(item.day);
    props.isClicked();
  }

  return (
    <div className="daily-forecast">
      <div className="sweet-loading">
        <RingLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      </div>
      {dailyInfo.map((info) => (
        <div
          className="container"
          key={`${info.day}-${info.min}`}
          onClick={() => handleClick(info)}
        >
          <div className="day">{info.day}</div>
          <div className="temp">
            <div>{info.max}&deg;</div>
            <div>{info.min}&deg;</div>
          </div>

          <img
            src={info.image}
            alt="Weather status"
            style={{
              width: "40px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          />

          <div className="weather">{info.weather}</div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

export default connect(mapStateToProps, { getHourlyData, isClicked })(
  DailyForecast
);
