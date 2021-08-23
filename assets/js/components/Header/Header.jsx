import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { STATUS, URL_PATHS } from "../../helpers/consts";
import { supervise_rq } from "../../helpers/utils";
import Searchbar from "./Searchbar";

const Header = () => {
  const { user, signOut } = useAuth();
  const [users, setUsers] = useState([]);

  async function getData() {
    const resp = await supervise_rq(() =>
      axios("http://localhost:4000/api/v1/users")
    );
    console.log(resp);
    if (resp.status === STATUS.SUCCESS) {
      setUsers(resp.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Header here</h1>
      <p>
        <Link to={URL_PATHS.SERVICES}>Catalogue</Link>
      </p>
      <p>
        <Link to={URL_PATHS.APPOINTMENTS}>Appointments</Link>
      </p>
      {user ? (
        <>
          <p>{user.first_name}</p>
          <p>
            <button onClick={signOut}>Sign out</button>
          </p>
        </>
      ) : (
        <>
          <p>
            <Link to={URL_PATHS.SIGN_IN}>Sign in</Link>
          </p>
          <p>
            <Link to={URL_PATHS.SIGN_UP}>Sign up</Link>
          </p>
        </>
      )}

      <div>
        <hr />
        <h3>Users</h3>
        {users
          ? users.map((u) => {
              return (
                <div
                  key={u.id}
                >{`${u.email} - ${u.role} - ${u.first_name} ${u.last_name} - ${u.id}`}</div>
              );
            })
          : "Not Found"}
        <hr />
      </div>
      <Searchbar />
    </div>
  );
};

export default Header;
