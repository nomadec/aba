import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

const SliderRange = ({ min_max, value, onChange }) => {
  const classes = useStyles();
  console.log(value);

  function handleChange(event, newValue) {
    console.log(newValue);
    onChange(newValue);
  }

  function calcValue() {
    return [value[0] ? value[0] : min_max[0], value[1] ? value[1] : min_max[1]];
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Price range
      </Typography>
      <Slider
        min={min_max[0]}
        max={min_max[1]}
        value={calcValue()}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
};

export default SliderRange;
