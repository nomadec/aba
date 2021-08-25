import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { AccountCircle, Chat, DateRange, Home } from "@material-ui/icons";
import { Icon, IconButton } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { URL_PATHS } from "../../helpers/consts";

const useStyles = makeStyles({
  footer: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "flex",
    justifyContent: "space-around",
    borderRadius: "16px 16px 0 0",
    backgroundColor: "#fff",
    zIndex: 999,
  },
  link: {
    color: "#7c84a3",
  },
  active: {
    color: "#534658",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <NavLink
        exact
        to={URL_PATHS.HOME}
        className={classes.link}
        activeClassName={classes.active}
      >
        <IconButton color="inherit">
          <Icon color="inherit">
            <Home color="inherit" />
          </Icon>
        </IconButton>
      </NavLink>

      <NavLink
        exact
        to={URL_PATHS.FAVORITES}
        className={classes.link}
        activeClassName={classes.active}
      >
        <IconButton color="inherit">
          <Icon color="inherit">
            <FavoriteIcon color="inherit" />
          </Icon>
        </IconButton>
      </NavLink>

      <NavLink
        exact
        to={URL_PATHS.APPOINTMENTS}
        className={classes.link}
        activeClassName={classes.active}
      >
        <IconButton color="inherit">
          <Icon color="inherit">
            <DateRange color="inherit" />
          </Icon>
        </IconButton>
      </NavLink>

      <NavLink
        exact
        to={URL_PATHS.CHAT}
        className={classes.link}
        activeClassName={classes.active}
      >
        <IconButton color="inherit">
          <Icon color="inherit">
            <Chat color="inherit" />
          </Icon>
        </IconButton>
      </NavLink>

      <NavLink
        exact
        to={URL_PATHS.SIGN_IN}
        className={classes.link}
        activeClassName={classes.active}
      >
        <IconButton color="inherit">
          <Icon color="inherit">
            <AccountCircle color="inherit" />
          </Icon>
        </IconButton>
      </NavLink>
    </div>
  );
};

export default Footer;
