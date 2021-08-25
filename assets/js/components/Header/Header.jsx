import { IconButton, makeStyles } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { STATUS, URL_PATHS } from "../../helpers/consts";
import { supervise_rq } from "../../helpers/utils";
import MenuIcon from "@material-ui/icons/Menu";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 10,
    height: 50,
    width: "100vw",
    // zIndex: 999,
    display: "grid",
    alignItems: "center",
  },
  headerNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    // padding: 10,
    width: 36,
    height: 36,
    backgroundColor: "#fff",
    paddingLeft: 15,
  },
  grow: {
    width: 36,
  },
  pageTitle: {
    color: "#534658",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { user, signOut } = useAuth();
  const [users, setUsers] = useState([]);
  const [showGoBack, setShowGoBack] = useState(false);
  const [pageTitle, setPageTitle] = useState(false);
  const history = useHistory();
  console.log(history);
  const { id } = useParams();

  useEffect(() => {
    // console.log(history.location.pathname, `${URL_PATHS.SERVICE_SHOW}/${id}`);
    if (history.location.pathname === `${URL_PATHS.SERVICE_SHOW}/${id}`) {
      setShowGoBack(true);
      setPageTitle("Service Details");
    } else if (history.location.pathname === URL_PATHS.APPOINTMENTS) {
      setShowGoBack(true);
      setPageTitle("Booked Appointments");
    } else if (history.location.pathname === URL_PATHS.SERVICE_CREATE) {
      setShowGoBack(true);
      setPageTitle("Create Service");
    } else if (
      history.location.pathname === `${URL_PATHS.SERVICE_EDIT}/${id}`
    ) {
      setShowGoBack(true);
      setPageTitle("Edit Service");
    } else {
      setShowGoBack(false);
    }
  }, []);

  // async function getData() {
  //   const resp = await supervise_rq(() =>
  //     axios("http://localhost:4000/api/v1/users")
  //   );
  //   console.log(resp);
  //   if (resp.status === STATUS.SUCCESS) {
  //     setUsers(resp.data);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className={classes.header}>
      <div className={classes.headerNav}>
        <div style={{ marginLeft: 15 }}>
          {showGoBack ? (
            <IconButton
              size="small"
              className="go_back_icon_button shadow"
              color="inherit"
              onClick={() => history.goBack()}
            >
              <ArrowBack className={classes.icon} fontSize="small" />
            </IconButton>
          ) : null}
        </div>
        <div className={classes.pageTitle}>
          <h3>{pageTitle}</h3>
        </div>
        <div className={classes.grow}></div>
      </div>
    </div>
    // <div>
    //   <h1>Header here</h1>
    //   <p>
    //     <Link to={URL_PATHS.SERVICES}>Catalogue</Link>
    //   </p>
    //   <p>
    //     <Link to={URL_PATHS.APPOINTMENTS}>Appointments</Link>
    //   </p>
    //   {user ? (
    //     <>
    //       <p>{user.first_name}</p>
    //       <p>
    //         <button onClick={signOut}>Sign out</button>
    //       </p>
    //     </>
    //   ) : (
    //     <>
    //       <p>
    //         <Link to={URL_PATHS.SIGN_IN}>Sign in</Link>
    //       </p>
    //       <p>
    //         <Link to={URL_PATHS.SIGN_UP}>Sign up</Link>
    //       </p>
    //     </>
    //   )}

    //   <div>
    //     <hr />
    //     <h3>Users</h3>
    //     {users
    //       ? users.map((u) => {
    //           return (
    //             <div
    //               key={u.id}
    //             >{`${u.email} - ${u.role} - ${u.first_name} ${u.last_name} - ${u.id}`}</div>
    //           );
    //         })
    //       : "Not Found"}
    //     <hr />
    //   </div>
    //   <Searchbar />
    // </div>
  );
};

export default Header;
