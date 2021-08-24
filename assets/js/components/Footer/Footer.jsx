import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Chat, DateRange, Event, Home } from "@material-ui/icons";
import { Icon, IconButton } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { URL_PATHS } from "../../helpers/consts";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "flex",
    justifyContent: "space-around",
    border: "solid 1px #534658",
    borderRadius: "16px 16px 0 0",
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
  // const [value, setValue] = useState("homepage");
  // // const history = useHistory();

  // function handleNavigation(event, newValue) {
  //   console.log(newValue);
  //   switch (newValue) {
  //     case "homepage":
  //       history.push(URL_PATHS.HOME);
  //       break;
  //     case "appointments":
  //       history.push(URL_PATHS.APPOINTMENTS);
  //       break;
  //     case "chat":
  //       history.push(URL_PATHS.CHAT);
  //       break;
  //     case "favorites":
  //       history.push(URL_PATHS.FAVORITES);
  //       break;

  //     default:
  //       break;
  //   }
  //   setValue(newValue);
  // }

  return (
    // <BottomNavigation
    //   className={classes.stickToBottom}
    //   value={value}
    //   onChange={handleNavigation}
    //   // showLabels
    // >
    //   <BottomNavigationAction
    //     value={"homepage"}
    //     // label="Homepage"
    //     icon={<Home />}
    //   />
    //   <BottomNavigationAction
    //     value={"appointments"}
    //     // label="Schedule"
    //     icon={<DateRange />}
    //   />
    //   <BottomNavigationAction value={"chat"} icon={<Chat />} />
    //   <BottomNavigationAction
    //     value={"favorites"}
    //     // label="Favorites"
    //     icon={<FavoriteIcon />}
    //   />
    // </BottomNavigation>
    <div className={classes.stickToBottom}>
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
    </div>
  );
};

export default Footer;
