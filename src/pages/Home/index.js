import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./style.scss";

export default function Home() {
  React.useEffect(() => {
    document.title = "MrWebFinance - Home"
  }, [])
  return (
    <div className="homeContainer">
      {/* landing container */}
      <div className="landing">
        <img src={Logo} alt="mrwebfinance" />
        <h1>DeFi made easy for EVERYONE.</h1>
        <p>
          MrWeb Finance is a simplified and trusted Decentralized Financial
          system for people who are looking to earn from the crypto space.
        </p>

        <Link
          to={{
            pathname:
              "https://justswap.org/#/scan/detail/trx/TVocZFCRZ6tg8MqKCKXzZ9H2qSg29T75tK",
          }}
          target="_blank"
        >
          <Button>Buy AMA</Button>
        </Link>
      </div>

      {/* staking help container */}
      <div className="stakingHelp">
        <hr />
        <h1>How to Get Started on Staking?</h1>
        <div className="stakingHelpContainer">
          <div>
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn6.aptoide.com%2Fimgs%2F6%2F5%2F1%2F651de7f9f4894e6494776e80c301bfc2_icon.png%3Fw%3D160&f=1&nofb=1"
              alt="tronlink pro"
            />
            <span>Connect TRON Wallet</span>
          </div>
          <div>
            <img
              src="https://image.freepik.com/free-vector/bank-client-manager-discussing-interest-rate_74855-6854.jpg"
              alt="APY Model"
            />
            <span>Choose APY Model &amp; Amount</span>
          </div>

          <div>
            <img
              src="https://image.freepik.com/free-vector/unemployment-insurance-abstract-concept-vector-illustration-unemployment-benefits-lost-job-tired-stressed-businessman-claim-form-workers-compensation-paper-work-interview-abstract-metaphor_335657-1355.jpg"
              alt="Claim"
            />
            <span>Claim Dividend</span>
          </div>
        </div>
      </div>

      {/* video iframe */}
      <div className="videoIframeContainer">
        <hr />
        <iframe
          src="https://www.youtube.com/embed/ySoaNFgySkE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
