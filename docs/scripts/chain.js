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

    getStatus.addEventListener("click", async() => {
      getStatusPromise = statusContract.methods.getStatus().call({
        from: wallet
      });
      const status = await getStatusPromise;
      currentStatus.innerText = status;
      return false;
    });

    setStatus.addEventListener("click", async(data) => {
      setStatusPromise = statusContract.methods.setStatus(statusValue.value).send({
        from: wallet
      });
      evt.preventDefault();
      return false;
    });

 }
}
