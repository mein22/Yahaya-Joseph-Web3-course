const gasLimitInput = document.getElementById("gasLimit");
const gasPriceInput = document.getElementById("gasPrice");

const feeElement = document.getElementById("fee");
const feeGweiElement = document.getElementById("feeGwei");

const displayGasLimit = document.getElementById("displayGasLimit");
const displayGasPrice = document.getElementById("displayGasPrice");

function calculateGasFee() {
  const gasLimit = Number(gasLimitInput.value);
  const gasPrice = Number(gasPriceInput.value);

  // Gas fee in Gwei
  const feeInGwei = gasLimit * gasPrice;

  // Convert Gwei to ETH
  const feeInEth = feeInGwei / 1_000_000_000;

  // Display the result
  feeElement.textContent = `${feeInEth.toFixed(8)} ETH`;

  feeGweiElement.textContent =
    `${feeInGwei.toLocaleString()} Gwei`;

  displayGasLimit.textContent =
    gasLimit.toLocaleString();

  displayGasPrice.textContent =
    `${gasPrice} Gwei`;
}

// Recalculate whenever the user changes either input
gasLimitInput.addEventListener("input", calculateGasFee);
gasPriceInput.addEventListener("input", calculateGasFee);

// Calculate the initial value
calculateGasFee();