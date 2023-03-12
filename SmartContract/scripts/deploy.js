// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  // deploy Main contract
  const Main = await ethers.getContractFactory("Main");
  const main = await Main.deploy();
  await main.deployed();

  console.log("Token address:", main.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(main);
  // We also save the contract's artifacts and address in the backend directory
  saveBackEndFile(main);
}

function saveFrontendFiles(main) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "..",
    "FrontEnd",
    "src",
    "contract"
  );
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "mainAddress.json"),
    JSON.stringify({ main: main.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Main");

  fs.writeFileSync(
    path.join(contractsDir, "Main.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

function saveBackEndFile(main) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "..",
    "BackEnd",
    "src",
    "contract"
  );
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "mainAddress.json"),
    JSON.stringify({ main: main.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Main");

  fs.writeFileSync(
    path.join(contractsDir, "mainContract.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
