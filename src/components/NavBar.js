import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('lu_token');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('lu_token') !== null;

  return (
    <ul className="navbar">
      {isLoggedIn ? (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/uploadimage">
              Upload Image
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link fakeLink" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
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
      )}
    </ul>
  );
};
