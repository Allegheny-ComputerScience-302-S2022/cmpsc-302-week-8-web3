const address = "0x81855562a4388B2c76A58B06884E834d67C03B06";
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

const web3Instance = async() => {

  if (window.ethereum) {

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({method: "eth_requestAccounts"});
    const wallet = window.ethereum.selectedAddress;
    const statusContract = new web3.eth.Contract(abi, address);
    const re = /((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/ig;


    getStatus.addEventListener("click", async() => {
      getStatusPromise = statusContract.methods.getStatus().call({
        from: wallet
      });
      let status = await getStatusPromise;
      status = status.replace(re, "<a href = '$1' target = '_blank'>$1</a>");
      currentStatus.innerHTML = status;
      return false;
    });

    setStatus.addEventListener("click", async() => {
      setStatusPromise = statusContract.methods.setStatus(statusText.value).send({
        from: wallet
      });
      return false;
    });
    getStatus.click();
 }
}

web3Instance();
