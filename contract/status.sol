// Set contract language

pragma solidity ^0.8.1;

// Create contract

contract KingOfTheHill {
    // Create global to hold status object
    string status;

    // Contract functionality to set status equal to input
    function setStatus(string memory _status) public{
        status = _status;
    }

    // Contract functionality to return the value of status posted
    function getStatus() public view returns(string memory){
        return status;
    }
}
