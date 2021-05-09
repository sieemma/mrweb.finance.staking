import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

// ui icons
import HomeIcon from "@material-ui/icons/Home";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

export default function Navbar() {
  return (
    <div className="navbarContainer">
      <Link className="navItem" to="/">
        <HomeIcon /> Home
      </Link>
      <Link className="navItem" to="/stake">
        <HourglassEmptyIcon /> Staking
      </Link>
      <Link className="navItem" to="/faq">
        <HelpOutlineIcon /> FAQ
      </Link>
      <Link
        className="navItem"
        to={{
          pathname:
            "https://tronscan.io/#/token20/TVocZFCRZ6tg8MqKCKXzZ9H2qSg29T75tK",
        }}
        target="_blank"
      >
        <AssignmentIcon /> Tronscan
      </Link>
      <Link
        className="navItem"
        to={{ pathname: "https://mrweb.finance/WhitePaper.pdf" }}
        target="_blank"
      >
        <PictureAsPdfIcon /> Whitepaper
      </Link>
    </div>
  );
}
