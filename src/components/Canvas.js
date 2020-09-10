import React, { useRef, useMemo } from "react";
import { connect } from "react-redux";

const Canvas = React.memo((props) => {
  const canvas = useRef(null);

  useMemo(() => {
    if (props.sunrise.length !== 0 && props.sunset.length !== 0) {
      console.log();
      let a = props.sunrise[0].slice(0, 1);
      let b = props.sunset[0].slice(0, 1);
      updateCanvas(a, b);
    }
  }, [props.sunrise]);

  function updateCanvas(a, b) {
    const ctx = canvas.current.getContext("2d");
    function showAxes(ctx, axes) {
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      var xMin = 150;

      ctx.beginPath();
      ctx.translate(-150, 0);

      ctx.font = "11px Arial";
      ctx.fillText(props.sunrise[0], 200, 80);
      ctx.font = "11px Arial";
      ctx.fillText(props.sunset[0], 400, 80);
      ctx.strokeStyle = "rgb(128,128,128)";

      // X-Axis
      ctx.moveTo(xMin, height / 2);
      ctx.lineTo(width, height / 2);

      // Starting line
      ctx.moveTo(0, 0);
      ctx.lineTo(0, height);
      ctx.stroke();
    }
    function plotSine(ctx) {
      var width = ctx.canvas.width;
      var height = ctx.canvas.height;
      showAxes(canvas.current.getContext("2d"));
      ctx.beginPath();
      ctx.translate(-10, 0);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgb(255,165,0)";

      var x = 150;
      var y = 0;
      var amplitude = 40;
      var frequency = 70;
      ctx.moveTo(x, y);
      while (x < width) {
        y = height / 2 + amplitude * Math.sin(x / frequency);
        ctx.lineTo(x, y);
        x = x + 1;
      }
      ctx.stroke();
    }
    plotSine(canvas.current.getContext("2d"));
  }

  return (
    <div className="sine-wave">
      <canvas ref={canvas} id="canvas" width="500" height="100"></canvas>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

export default connect(mapStateToProps, {})(Canvas);
