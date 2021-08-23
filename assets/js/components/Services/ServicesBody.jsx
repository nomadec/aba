import { fade, InputBase, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { PER_PAGE, URL_PATHS } from "../../helpers/consts";
import SearchIcon from "@material-ui/icons/Search";
import { Pagination } from "@material-ui/lab";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const ServicesBody = () => {
  const { getServices, deleteService, services, servicesTotalPages } =
    useData();
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const history = useHistory();

  const classes = useStyles();
  const handleValue = (e) => {
    const search = new URLSearchParams(history.location.search);
    search.set("_q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
  };

  useEffect(() => {
    getServices();
  }, []);

  function handleShow(id) {
    history.push(`${URL_PATHS.SERVICE_SHOW}/${id}`);
  }
  function handleEdit(id) {
    history.push(`${URL_PATHS.SERVICE_EDIT}/${id}`);
  }
  function handleDelete(id) {
    deleteService(id);
    getServices();
  }

  function handlePage(e, page) {
    const search = new URLSearchParams(window.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getServices();
    setCurrentPage(page);
  }

  function getCurrentPage() {
    const search = new URLSearchParams(window.location.search);

    if (!search.get("_page")) {
      return 1;
    }

    return search.get("_page");
  }

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => handleValue(e)}
        />
      </div>

      <h1>Catalogue</h1>
      {services.length === 0 ? (
        <p>No Records Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Provider</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.location}</td>
                <td>{item.duration}</td>
                <td>{item.description}</td>
                <td>{item.user_id}</td>
                <td>
                  <button onClick={() => handleShow(item.id)}>Show</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ margin: "20px auto" }}>
        <Pagination
          count={servicesTotalPages}
          color="primary"
          page={+currentPage}
          onChange={handlePage}
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default ServicesBody;
