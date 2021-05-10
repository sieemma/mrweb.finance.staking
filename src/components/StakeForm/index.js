import React from "react";
import "./style.scss";

import { toast } from "react-toastify";

// ui icons
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { Button } from "@material-ui/core";

export default function StakeForm({ contract, tokenContract, address }) {
  const [isLocked, setIsLocked] = React.useState(false);
  const [stakedAmount, setStakedAmount] = React.useState(0);
  const [stakePeriodEndsAt, setStakePeriodStakeEndsAt] = React.useState(0);
  const [amount, setNewAmount] = React.useState("");
  const [apyModel, setApyModel] = React.useState("30");
  const [isPoolPacked, setIsPoolPacked] = React.useState(false);

  const submitStake = () => {
    if (amount < 100) return toast.error("Minimum Stake Amount is 100 AMA");
    if(amount > 250000) return toast.error('Maximum Stake Amount is 250K AMA');

    tokenContract
      .approve(
        window.tronWeb.address.fromHex(contract.address),
        (parseFloat(amount) * 1000).toString()
      )
      .send()
      .then(() => {
        contract
          .StakeTokens(apyModel, (parseFloat(amount) * 100).toString())
          .send()
          .then(() => {
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    setNewAmount("");
    setApyModel("30");
  };

  React.useEffect(() => {
    contract
      .users(address)
      .call()
      .then((data) => {
        window.tronWeb.toDecimal(data.finalCompoundAsset) !== 0 &&
          setIsLocked(true);

        setStakedAmount(
          window.tronWeb.toDecimal(data.initialInvestment / 100)
        );

        const timestamp = window.tronWeb.toDecimal(data.investmentPeriodEndsAt);

        setStakePeriodStakeEndsAt(
          (timestamp - Math.floor(new Date().getTime() / 1000.0)) / 86400
        );
      });

    contract
      .currentPoolAmount()
      .call()
      .then((data) => {
        console.log(window.tronWeb.toDecimal(data))
        if (window.tronWeb.toDecimal(data) >= 500000) {
          setIsPoolPacked(true);
        }
      });
  }, [address, contract]);
  return (
    <div className="stakeForm">
      {/* form title */}
      <div className="title">
        <div className="apyModelContainer">
          <AccountBalanceWalletIcon />
          <div className="content">
            APY: 30 Days = 7%, 60 Days = 17%, 90 Days = 36%
          </div>
        </div>

        <div className="stakedAmountContainer">Staked: {stakedAmount} AMA</div>
      </div>

      {/* form input */}
      {
        isPoolPacked && 
        <h2 style={{marginTop: "30px"}}>
          The Stake Pool is currently full!
        </h2>
      }
      {/* pool is not packed */}
      {!isPoolPacked && !isLocked && (
        <div className="inputContainer">
          <div className="input">
            <label>Amount: Minimum 100</label>
            <input
              type="text"
              placeholder="0"
              value={amount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
            <span>AMA</span>
          </div>

          <div className="apySelection" style={{ marginTop: "15px" }}>
            <span>Select APY Model&nbsp;</span>
            <select
              value={apyModel}
              onChange={(e) => setApyModel(e.target.value)}
            >
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>
          <Button onClick={submitStake}>Approve</Button>
        </div>
      )}

      {/* is staked already */}
      {isLocked && (
        <div className="stakePeriodExist">
          <p>Your stake period has not ended yet.</p>
          <p>
            {(stakePeriodEndsAt * 24 * 60).toFixed(3) < 0
              ? "0"
              : (stakePeriodEndsAt * 24 * 60).toFixed(3)}{" "}
            mins left
          </p>
        </div>
      )}
    </div>
  );
}
