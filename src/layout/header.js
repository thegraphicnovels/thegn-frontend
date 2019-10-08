import React from "react";
import { Link } from "react-router-dom";

const Header = function() {
  return (
    <header id="header">
      <div className="headerIn">
        <h1 className="logo">
          <Link to="locallhost:3000">
            <img src={"resources/images/logo.png"} alt={"the graphic novels"} />
          </Link>
        </h1>
        <div className="util">
          <label className="topSrchBox">
            <span className="placeholder">Search</span>
            <input className="text" />
          </label>
          <Link to="#" className="btnInsta">
            <img src={"resources/images/icon_insta.svg"} alt={"instagram"} />
          </Link>
          <Link to="/upload" className="btnBe">
            <img src={"resources/images/icon_Be.svg"} alt={"instagram"} />
          </Link>
        </div>
        <button className="btnHamberg">
          <span className="blind">메뉴 열기</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
