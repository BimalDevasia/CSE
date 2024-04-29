import { React, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/cselogo.png"
import "./Navbar.scss";
import Logo from "/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleChecked = (isNavLink) => {
    setIsMenuOpen((value) => !value);
    const body = document.getElementById("root");
    if (!isNavLink) {
      body.classList.toggle("menu--open");
    } else {
      body.classList.remove("menu--open");
    }
  };

  return (
    <div className="nav--box">
      <div className="nav--container">
        <Link to="/">
          <div className="nav--logo">
            <img className="logo" src={Logo} alt="Daksha24 Logo" />
          </div>
        </Link>
        <nav className={`nav--links ${isMenuOpen && "active"}`}>
          <ul>
            <li className="nav--link">
              <NavLink onClick={() => toggleChecked(true)} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav--link">
              <NavLink onClick={() => toggleChecked(true)} to="/events">
                Competitions
              </NavLink>
            </li>
            <li className="nav--link">
              <NavLink onClick={() => toggleChecked(true)} to="/board">
                Leader Board
              </NavLink>
            </li>
          </ul>
        </nav>
        <img className="nav--cta"src={logo} alt="" />
        <div className="menu-icon">
          <input
            className="menu-icon__cheeckbox"
            checked={isMenuOpen}
            onChange={() => {}}
            onClick={() => toggleChecked(false)}
            type="checkbox"
          />
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
