import { Button } from "@material-ui/core";
import React from "react";
import "./style.scss";

export default function DividendToken({ tokenData, contract }) {
  const [isClaimable, setIsClaimable] = React.useState(false);

  console.log(setIsClaimable);
  const onClaim = () =>
    contract
      .withdraw()
      .send()
      .then(() => {
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      })
      .catch((err) => console.log(err));

  return (
    <span className="dividendTokenContainer">
      <span className="token">
        <span className="tokenIcon">
          <img src={tokenData.icon} alt={tokenData.tokenName} />
        </span>
        <span className="tokenName">{tokenData.tokenName}</span>
      </span>

      <span className="compoundAsset">
        {tokenData.compoundAsset} {tokenData.tokenName}
      </span>

      <span className="claimableAt">
        {tokenData.claimableAt <= 0 ? "0" : (tokenData.claimableAt * 60).toFixed(3)} mins left
      </span>

      <Button
        disabled={tokenData.claimableAt <= 0 ? isClaimable : !isClaimable}
        onClick={onClaim}
      >
        Claim
      </Button>
    </span>
  );
}
