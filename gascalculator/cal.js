import { ethers } from "ethers";

// Connect to Alchemy

const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
);

// Get HTML elements

const gasLimitInput = document.getElementById("gasLimit");
const gasPriceInput = document.getElementById("gasPrice");

const feeElement = document.getElementById("fee");
const feeGweiElement = document.getElementById("feeGwei");

const displayGasLimit = document.getElementById("displayGasLimit");

const displayGasPrice = document.getElementById("displayGasPrice");

const gasStatus = document.getElementById("gasStatus");
const refreshButton = document.getElementById("refreshButton");

// Calculate gas fee

function calculateGasFee() {
  const gasLimit = Number(gasLimitInput.value);
  const gasPrice = Number(gasPriceInput.value);

  // Gas fee in Gwei
  const feeInGwei = gasLimit * gasPrice;

  // Convert Gwei to ETH
  const feeInEth = feeInGwei / 1_000_000_000;

  // Display the result
  feeElement.textContent = `${feeInEth.toFixed(8)} ETH`;

  feeGweiElement.textContent = `${feeInGwei.toLocaleString()} Gwei`;

  displayGasLimit.textContent = gasLimit.toLocaleString();

  displayGasPrice.textContent = `${gasPrice} Gwei`;
}

// Fetch live gas data

async function getGasData() {
  try {
    gasStatus.textContent = "Fetching live gas price...";
    refreshButton.disabled = true;

    const feeData = await provider.getFeeData();

    // Convert gas price from wei to Gwei
    const gasPriceGwei = ethers.formatUnits(feeData.gasPrice, "gwei");

    // Put live gas price into the input
    gasPriceInput.value = gasPriceGwei;

    // Recalculate the transaction fee
    calculateGasFee();

    gasStatus.textContent = `Updated at ${new Date().toLocaleTimeString()}`;

    console.log("Live Gas Price:", gasPriceGwei, "Gwei");
  } catch (error) {
    console.error("Failed to fetch gas data:", error);

    gasStatus.textContent = "Unable to fetch gas price.";
  } finally {
    refreshButton.disabled = false;
  }
}

// Recalculate when user changes


gasLimitInput.addEventListener("input", calculateGasFee);

gasPriceInput.addEventListener("input", calculateGasFee);

refreshButton.addEventListener("click", getGasData);


// Get live gas price on page load

getGasData();

setInterval(getGasData, 30000);

