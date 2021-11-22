import getConfig from "next/config";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/Sole.json";

import Layout from "@/components/Layout";

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  const [account, setCurrentAccount] = useState<any>("");
  const [contractAddress] = useState<string>(
    "0x7f4fEB46Da4D23B04E1d04527bC1899bA2FE77C2"
  );
  const [solePortalABI] = useState<any>(abi.abi);
  const [wagerCount, setWagerCount] = useState<number>(0);
  function checkIfWalletIsConnected() {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        console.log("Make sure you have metamask");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const wager = async () => {
    try {
      const { ethereum }: any = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = provider.getSigner();

        const solePortalContract = new ethers.Contract(
          contractAddress,
          solePortalABI,
          signer
        );
        let wagerCount = await solePortalContract.getTotalWages();

        console.log("Retrieve total wave count: ", wagerCount.toNumber());
        setWagerCount(wagerCount.toNumber());

        const wageTxn = await solePortalContract.wage();
        console.log("Mining.... ", wageTxn.hash);

        await wageTxn.wait();
        console.log("Mined --", wageTxn.hash);

        wagerCount = await solePortalContract.getTotalWages();
        console.log("Retrieve total wave count: ", wagerCount.toNumber());
        setWagerCount(wagerCount.toNumber());
      } else {
        console.log("Polygon object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Layout>
      <section className="w-full mx-auto">
        <h1 className="text-3xl">
          Sole: Wage againist your friends and family.
        </h1>
        So far we have {wagerCount} wages wagered.
        <br />
        <button onClick={wager}>Create a wager</button>
        <br />
        {account && (
          <button onClick={connectWallet}>Connect your wallet</button>
        )}
      </section>
    </Layout>
  );
};

export default Home;
