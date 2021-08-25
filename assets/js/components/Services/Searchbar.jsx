import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { URL_PATHS } from "../../helpers/consts";
import { Icon, Tooltip } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { permittedRole } from "../../helpers/utils";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    minWidth: 200,
    width: "80vw",
    height: 48,
    margin: "0 auto",
    borderRadius: 16,

    // maxwidth: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Searchbar = () => {
  const classes = useStyles();
  const { getServices } = useData();
  const { user } = useAuth();
  const history = useHistory();

  const handleSearch = (e) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
  };

  return (
    <div className="search_bar">
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => handleSearch(e)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {permittedRole(user, "provider") ? (
        <div className="create_service_btn">
          <Tooltip title="Create New Service">
            <Link to={URL_PATHS.SERVICE_CREATE}>
              <Icon fontSize="large">
                <AddCircle fontSize="large" />
              </Icon>
            </Link>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};

export default Searchbar;
