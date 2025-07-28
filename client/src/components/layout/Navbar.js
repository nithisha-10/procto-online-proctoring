import React from "react";
import { Link } from "react-router-dom";

/**
 * Creates the navbar that sticks to the top and is present on
 * all pages
 */
export default function Navbar() {
  return (
    <div className="navbar-fixed" >
    <nav className="z-depth-0" >
      <div className="nav-wrapper white" >
        <Link
          to="/"
          style={{
            fontFamily: "monospace",

          }}
          className="col s5 brand-logo center black-text"
        >
          <img 
            src="/codework.png" 
            alt="Codework Logo" 
            style={{
              height: "60px",
              verticalAlign: "middle",
              marginRight: "8px",
              marginTop: "10px"
            }}
          />
        </Link>
      </div>
    </nav>
  </div>
  );
}
