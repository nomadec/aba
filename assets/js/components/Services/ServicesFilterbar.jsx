import {
  Radio,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  RadioGroup,
  FormControlLabel,
  Button,
  Slider,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { useHistory } from "react-router-dom";
import { SERVICE_CATEGORIES } from "../../helpers/consts";
import SliderRange from "../Utils/SliderRange";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginRight: "20px",
    marginBottom: "20px",
    minWidth: "170px",
    maxWidth: "350px",
  },
}));

const ServicesFilterbar = () => {
  const classes = useStyles();
  const { getServices, servicesFilters } = useData();
  const history = useHistory();
  const [type, setType] = useState(getType());
  const [priceMinMax, setPriceMinMax] = useState([0, 0]);
  const [priceRange, setPriceRange] = useState(getPriceRange());

  useEffect(() => {
    if (servicesFilters) {
      setPriceMinMax([servicesFilters.min_price, servicesFilters.max_price]);
    }
  }, [servicesFilters]);

  function getPriceRange() {
    const search = new URLSearchParams(history.location.search);
    const initialPriceRange = [
      +search.get("_price_gte"),
      +search.get("_price_lte"),
    ];
    return initialPriceRange;
  }

  function getType() {
    const search = new URLSearchParams(history.location.search);
    return search.get("type");
  }

  const handleChangeType = (e) => {
    if (e.target.value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("type");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getServices();
      setType(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("type", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setType(e.target.value);
  };

  const handleChangePrice = (value) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_price_gte", value[0]);
    search.set("_price_lte", value[1]);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setPriceRange(value);
  };

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search);
    search.delete("_price_gte");
    search.delete("_price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setPriceRange(getPriceRange());
  };

  return (
    <Grid item md={3}>
      <Paper elevation={2} className={classes.paper}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Categories</FormLabel>
          <RadioGroup value={type} onChange={handleChangeType}>
            {SERVICE_CATEGORIES.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Grid>
          <SliderRange
            min_max={priceMinMax}
            value={priceRange}
            onChange={handleChangePrice}
          />
          <Button onClick={resetPrice} variant="outlined" color="primary">
            Reset price
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ServicesFilterbar;
