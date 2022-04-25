const address = "0xCc3DcDD4c08f51126f60937F15243C451a9aD19F";
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_tag",
        "type": "string"
      }
    ],
    "name": "setTag",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTag",
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
    const tagContract = new web3.eth.Contract(abi, address);

    getTag.addEventListener("click", async() => {
      getTagPromise = tagContract.methods.getTag().call({
        from: wallet
      });
      const tag = await getTagPromise;
      currentTag.innerText = tag;
      return false;
    });

    setTag.addEventListener("click", async() => {
      let file = tagText.files[0];
      let fileReader = new FileReader();
      const ipfsNode = new IpfsApi;
      reader.readAsBinaryString(file.slice(0, file.size - 1));
      const results = await ipfsNode.add(reader.result);
      setTagPromise = tagContract.methods.setTag(tagText.value).send({
        from: wallet
      });
      return false;
    });

 }
}
