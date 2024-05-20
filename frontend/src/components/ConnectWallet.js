import { React, useState } from "react";
import { Button } from 'antd';
import { ethers } from "ethers";

export const ConnectWallet = () => {

  const [address, setAddress] = useState()
  const [balance, setBalance] = useState()
  

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);

        const balance = await window.ethereum.request({
          "method": "eth_getBalance",
          "params": [
            accounts[0],
            'latest'
          ]
        });
        setBalance(ethers.formatEther(balance));

        const chain = await window.ethereum.request({
          "method": "eth_chainId",
          "params": []
        });

        console.log(chain);


      }
      catch (error) {
        console.error('Error connecting to MetaMask:', error.message);
      }
    } else {
      alert('Please install MetaMask extension!');

    };
  }

  const changeChain = async() => {
    // await window.ethereum.request({
    //   "method": "wallet_addEthereumChain",
    //   "params": [
    //     {
    //       "chainId": "0xaa36a7",
    //       "chainName": "Sepolia",
    //       "rpcUrls": [
    //         "https://rpc.sepolia.ethpandaops.io"
    //       ],
          
    //       "nativeCurrency": {
    //         "name": "ETH",
    //         "symbol": "ETH",
    //         "decimals": 18
    //       },
    //       "blockExplorerUrls": [
    //         "https://sepolia.etherscan.io/"
    //       ]
    //     }
    //   ]
    // });
    await window.ethereum.request({
      "method": "wallet_switchEthereumChain",
      "params": [
        {
          "chainId": "0x13881"
        }
      ]
    });
  }
    const sendTransaction = async () => {
      // const val = ethers.parseEther("0.001")
      // const parseIn = parseInt(val);
      // const tose = parseIn.toString(16)
      // console.log(val)
      // console.log(parseIn)
      // console.log(tose)
      window.ethereum
      .request({
          method: "eth_sendTransaction",
          params: [
              {
                  from: address,
                  to: '0xc3AE932229a1bB8D520c4050fbDBcA59a918C05a',
                  value:`0x${(parseInt(ethers.parseEther("0.001"))).toString(16)}`,
                  maxPriorityFeePerGas: '0x3b9aca00',
                  maxFeePerGas: '0x2540be400',
              },
          ],
      })
      .then((txHash) => alert(`Transaction is Successfully send: ${txHash}`))
      .catch((error) => console.error(error));
    }

  return (
    <div className="App">
      <div className="App-header">
        <Button onClick = {connectToMetaMask}>Connect Wallet</Button>
        <p> Connected Account: {address}</p>
        <p> Balance: {balance}</p>
        <Button onClick = {changeChain}>Chain Changed </Button>
        <p>Click here for sending transaction:</p>
         <Button onClick={sendTransaction}>Send Transaction</Button>
      </div>
    </div>
  );
}




