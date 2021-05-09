import React from "react";
import "./style.scss";

import Logo from "../../assets/logo.png";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <img src={Logo} alt="mrweb.finance" />
    </div>
  );
}
