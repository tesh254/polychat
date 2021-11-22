import getConfig from "next/config";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  const [account, setCurrentAccount] = useState<any>("");
  function wager() {}

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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Layout>
      <section className="w-full mx-auto">
        <h1 className="text-3xl">
          Sole: Wage againist your friends and family.
        </h1>
        <button onClick={connectWallet}>Create a wager</button>
      </section>
    </Layout>
  );
};

export default Home;
