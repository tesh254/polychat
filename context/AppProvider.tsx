import { ethers } from "ethers";
import Web3 from "web3";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import abi from "../contracts/artifacts/contracts/Polychat.sol/Polychat.json";

const AppContext = createContext<{
  polychatContract: any;
  account: any;
  message: string;
  setMessage: (message: string) => void;
  connectWallet: () => Promise<void>;
}>({
  polychatContract: null,
  account: null,
  message: "",
  setMessage: () => {},
  connectWallet: async () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setCurrentAccount] = useState<any>(null);
  const [contractAddress] = useState<string>(
    "0xE1410b0C3c827D82474D4b4cB591DAC32DC662d8"
  );
  const [polychatABI] = useState<any>(abi.abi);
  const [wagerCount, setWagerCount] = useState<number>(0);
  const [polychatContract, setPolychatContract] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [web3, setWeb3] = useState<any>(null);

  function decToHex(dec: any) {
    var hex = Number(dec).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  useEffect(() => {
    if (account) {
      setIsOpen(false);

      const { ethereum }: any = window;

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const _polychatContract = new ethers.Contract(
        contractAddress,
        polychatABI,
        signer
      );

      setPolychatContract(_polychatContract);
    }
  }, [account]);

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
        connectWallet();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    console.log("called");
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            { chainId: `0x${decToHex(process.env.NEXT_PUBLIC_CHAIN_ID)}` },
          ],
        });
      } catch (error) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${decToHex(process.env.NEXT_PUBLIC_CHAIN_ID)}`,
              rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
              blockExplorerUrls: [process.env.NEXT_PUBLIC_EXPLORER_URL],
              nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
              },
            },
          ],
        });
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // @ts-ignore
    window.ethereum
      ? // @ts-ignore
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            console.log(accounts);
            setCurrentAccount(() => accounts[0]);
            // @ts-ignore
            let w3 = new Web3(window.ethereum);
            setWeb3(w3);
            let _contract = new w3.eth.Contract(polychatABI, polychatContract);
            setContract(_contract);
          })
          .catch((err) => console.log(err))
      : console.log("Please install MetaMask");
  }, []);

  function onChatMessageChange(message: string) {
    if (!account) {
      connectWallet();
    } else {
      setMessage(message);
    }
  }

  return (
    <AppContext.Provider
      value={{
        polychatContract,
        account,
        message,
        setMessage: onChatMessageChange,
        connectWallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
