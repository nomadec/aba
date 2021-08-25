import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { useHistory } from "react-router-dom";
import { SERVICE_CATEGORIES } from "../../helpers/consts";
import { useEffect } from "react";
import { Icon, IconButton } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginRight: "20px",
//     marginBottom: "20px",
//     minWidth: "170px",
//     maxWidth: "350px",
//   },
// }));

const ServicesFilterbarCategory = () => {
  // const classes = useStyles();
  const { getServices } = useData();
  const history = useHistory();
  const [category, setCategory] = useState(getCategory());

  function getCategory() {
    const search = new URLSearchParams(history.location.search);
    return search.get("_category") || "all";
  }

  const handleCategoryChange = (value) => {
    if (value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("_category");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getServices();
      setCategory(value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("_category", value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setCategory(value);
  };

  return (
    <div className="categories_container">
      {SERVICE_CATEGORIES.map((item) => (
        <div
          key={item.value}
          className={
            item.value === category
              ? "category_box shadow active"
              : "category_box shadow"
          }
          onClick={() => handleCategoryChange(item.value)}
        >
          <div className="category_icon">
            <IconButton>
              <Icon>{item.icon}</Icon>
            </IconButton>
          </div>
          <div className="category_icon_label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ServicesFilterbarCategory;
