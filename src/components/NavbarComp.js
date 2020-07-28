import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarComp = (props) => {
  return (
    
      <nav className="navbar navbar-expand-lg navbar-light" >
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link
            className="navbar-brand"
            style={{ color: "#646464", fontWeight: "500" }}
            to="#"
          >
            Locations
          </Link>

          <Link
            className="btn ml-auto"
            style={{
              backgroundColor: "#28608F",
              color: "white",
              borderRadius: "50px 50px 50px 50px",
              fontWeight: "500",
            }}
            type="submit"
            to="/form"
          >
            + Add Location
          </Link>
        </div>
      </nav>
    
  );
};

export default NavbarComp;
