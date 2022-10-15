import React from "react";
import logo from "./assets/kk-logo.png";

const TopNav = () => {
    return (
        <nav className="wrapper">
            <div id="topnav-title">세상에 있는 모든 화장실<img id="topnav-logo" src={logo}/></div>
        </nav>
    )
}

export default TopNav;