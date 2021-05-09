import React from "react";
import DividendContainer from "../../components/DividendContainer";
import StakeForm from "../../components/StakeForm";
import "./style.scss";

import { initContract } from "../../utils/Utils";

export default function Stake() {
  const [contract, setContract] = React.useState(null);
  const [tokenContract, setTokenContract] = React.useState(null);
  const [address, setAddress] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [universalData, setUniversalData] = React.useState({
    totalInvestors: 0,
    totalStaked: 0,
  });

  React.useEffect(() => {
    document.title = "MrWebFinance - Stake";

    // initilize the contract
    initContract().then((contract) => {
      // @dev set wallet address
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        // @dev get token balance
        (async function getToken() {
          window.tronWeb
            .contract()
            .at("TVocZFCRZ6tg8MqKCKXzZ9H2qSg29T75tK")
            .then((data) => {
              data
                .balanceOf(window.tronWeb.defaultAddress.base58)
                .call()
                .then((data) =>
                  setBalance(window.tronWeb.toDecimal(data) / 1000000)
                );

              setTokenContract(data);
            });
        })();

        contract
          .getUniversalData()
          .call()
          .then((data) =>
            setUniversalData({
              totalInvestors: window.tronWeb.toDecimal(data[0]),
              totalStaked: window.tronWeb.toDecimal(data[1]),
            })
          );

        setAddress(window.tronWeb.defaultAddress.base58);
      }

      setContract(contract);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {/* {!isLoading ? ( */}
      {contract && !isLoading ? (
        <div>
          <div className="stakeContainer">
            {/* Address bar */}
            <div className="addressBar">
              <div className="address">
                <b>Address:</b> {address}
              </div>
              <div className="amaAmount">
                <b>Balance:</b> {balance} AMA
              </div>
            </div>
            {/* universal data */}
            <div className="universalDataContainer">
              <div className="totalRevenueContainer">
                <div className="title">Total Staked</div>
                <div className="content">
                  {universalData.totalStaked / 1000000}
                </div>
              </div>

              <div className="totalUsersContainer">
                <div className="title">Stakers</div>
                <div className="content">{universalData.totalInvestors}</div>
              </div>

              <div className="stakingStartsContainer">
                <div className="title">Start In</div>
                <div className="content">LIVE</div>
              </div>
            </div>
            {/* stake form stakeContainer */}
            <div className="stakeFormContainer">
              <StakeForm
                contract={contract}
                tokenContract={tokenContract}
                address={address}
              />

              <div className="dividendContainer">
                <DividendContainer
                  contract={contract}
                  tokenContract={tokenContract}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="connectWalletContainer"
            style={{ textAlign: "center", color: "#A5AFCD" }}
          >
            <h2>Loading!</h2>

            <img
              src="https://image.freepik.com/free-vector/wallet-money-cartoon_138676-2086.jpg"
              alt="Wallet"
              style={{
                width: "12vw",
                borderRadius: "50%",
                display: "block",
                margin: "40px auto",
              }}
            />
            <h2>Make Sure wallet is Logged In, If yes, refresh page!</h2>
          </div>
        </div>
      )}
    </>
  );
}
