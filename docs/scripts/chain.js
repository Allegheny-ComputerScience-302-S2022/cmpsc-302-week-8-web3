// Contract address
const address = "0x81855562a4388B2c76A58B06884E834d67C03B06";

// Contract ABI (essentially a profile of what contract contains)
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_status",
        "type": "string"
      }
    ],
    "name": "setStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getStatus",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// "async" function to hold the "events" of the contract
const web3Instance = async() => {

  // if there's an Ethereum wallet present (e.g. Metamask)
  if (window.ethereum) {
    // Create web3 instance/connection for contract
    const web3 = new Web3(window.ethereum);
    // Get the connected wallet address
    await window.ethereum.request({method: "eth_requestAccounts"});
    const wallet = window.ethereum.selectedAddress;
    // Create connection to contract
    const statusContract = new web3.eth.Contract(abi, address);
    // "regular expression" for finding and replacing links in status updates with anchor tags
    const re = /((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/ig;

    // click event for "Get Status" button
    getStatus.addEventListener("click", async() => {
      // Call the status from the contract -- no fee!
      getStatusPromise = statusContract.methods.getStatus().call({
        from: wallet
      });
      // Get data from contract
      let status = await getStatusPromise;
      // Replace links, if any
      status = status.replace(re, "<a href = '$1' target = '_blank'>$1</a>");
      // Post as innerHTML to currentStatus element
      currentStatus.innerHTML = status;
      return false;
    });

    // click event for "Set Status" button
    setStatus.addEventListener("click", async() => {
      // Send ETH from current wallet to address to update the status via contract
      setStatusPromise = statusContract.methods.setStatus(statusText.value).send({
        from: wallet
      });
      statusText.value = "";
      return false;
    });
    getStatus.click();
    if(!currentStatus.innerHTML.includes("youtube")){
      setInterval(() => {
        // Auto-click the status every ten seconds
        getStatus.click();
      }, 10000);
    }
 }
}
// Start the instance
web3Instance();
