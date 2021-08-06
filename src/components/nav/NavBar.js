import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  //   const history = useHistory();

  return (
    <ul className="navbar">
      <li className="navbar__item">
        {/* <button onClick={() => history.push("/games")}>Games</button> */}
        {/* <Link to={"/games"}>Games</Link> */}
        Nav 1
      </li>
      <li className="navbar__item">
        {/* <button onClick={() => history.push("/events")}>Events</button> */}
        {/* <Link to={"/events"}>Events</Link> */}
        Nav 2
      </li>
      <li className="navbar__item">Profile</li>
      {localStorage.getItem("gr_token") !== null ? (
        <li className="nav-item">
          <button
            className="nav-link fakeLink"
            onClick={() => {
              localStorage.removeItem("gr_token");
              props.history.push({ pathname: "/" });
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </>
      )}{" "}
    </ul>
  );
};
