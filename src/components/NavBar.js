import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link to="/">Home</Link>
      </li>

      {/* Other navigation items */}
      
      {
        localStorage.getItem("lu_token") !== null ? (
          <li className="nav-item">
            <button
              className="nav-link fakeLink"
              onClick={() => {
                localStorage.removeItem("lu_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/uploadimage">Upload Image</Link>
            </li>
          </>
        )
      }
    </ul>
  );
};
