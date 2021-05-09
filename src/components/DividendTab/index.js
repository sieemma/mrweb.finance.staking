import React from "react";
import "./style.scss";

import DividendToken from "../DividendToken";

export default function DividendTab({ contract, tokenContract }) {
  const [tokenData, setTokenData] = React.useState({
    icon:
      "https://coin.top/production/upload/logo/TVocZFCRZ6tg8MqKCKXzZ9H2qSg29T75tK.png?t=1616970514937",
    tokenName: "AMA",
    compoundAsset: "235",
    claimableAt: "25",
  });

  React.useEffect(() => {
    contract
      .users(window.tronWeb.defaultAddress.base58)
      .call()
      .then((data) => {
        setTokenData((prev) => {
          return {
            icon: prev.icon,
            tokenName: prev.tokenName,
            compoundAsset:
              window.tronWeb.toDecimal(data.finalCompoundAsset) / 1000000,
            claimableAt: (
              (window.tronWeb.toDecimal(data.investmentPeriodEndsAt) -
                Math.floor(new Date().getTime() / 1000.0)) /
              3600
            ).toFixed(2),
          };
        });
      });
  }, [contract]);
  return (
    <span className="dividendTab">
      <span className="content">
        <DividendToken tokenData={tokenData} contract={contract} />
      </span>
    </span>
  );
}
