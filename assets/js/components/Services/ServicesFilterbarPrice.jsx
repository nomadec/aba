import React from "react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button, Slider } from "@material-ui/core";

const ServicesFilterbarPrice = ({ filterShown }) => {
  const { getServices, servicesFilters } = useData();
  const history = useHistory();
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

  function handleChangePrice(event, value) {
    const search = new URLSearchParams(history.location.search);
    search.set("_price_gte", value[0]);
    search.set("_price_lte", value[1]);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setPriceRange(value);
  }

  function resetPrice() {
    const search = new URLSearchParams(history.location.search);
    search.delete("_price_gte");
    search.delete("_price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setPriceRange(getPriceRange());
  }

  function calcValue() {
    return [
      priceRange[0] ? priceRange[0] : priceMinMax[0],
      priceRange[1] ? priceRange[1] : priceMinMax[1],
    ];
  }

  function valuetext(value) {
    return `${value} $`;
  }

  return filterShown ? (
    <div className="filter_price_range">
      <div className="filter_price_range_header">
        <div>Price range filter</div>
        <Button onClick={resetPrice} variant="text" color="primary">
          Reset price
        </Button>
      </div>
      <Slider
        min={priceMinMax[0]}
        max={priceMinMax[1]}
        value={calcValue()}
        onChange={handleChangePrice}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  ) : null;
};

export default ServicesFilterbarPrice;
