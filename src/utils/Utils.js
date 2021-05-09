// function to check if the tron wallet is logged in or not
const waitTron = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0,
      maxAttempts = 1000;
    const checkTron = () => {
      if (window.tronWeb) {
        resolve(true);
        return;
      }
      attempts++;
      if (attempts >= maxAttempts) {
        reject(false);
        return;
      }
      setTimeout(checkTron, 100);
    };
    checkTron();
  });
};

// functon to initialize the contract accessor

export const initContract = async () => {
  let tronExists = await waitTron();
  if (!tronExists) {
    alert("Please login into Tronlink wallet extension!");
    return null;
  }

  const contractAddress = `TScf5biHJC29EJNGc8MsSwLBQKDcxsmMQH`;
  let contract = await window.tronWeb.contract().at(contractAddress);
  return contract;
};
