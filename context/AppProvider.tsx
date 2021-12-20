import { ethers, providers } from "ethers";
import Web3 from "web3";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import Web3Modal from "web3modal";
import toast from "react-hot-toast";
import WalletLink from "walletlink";
import abi from "../contracts/artifacts/contracts/Polychat.sol/Polychat.json";
import { addChain, getChainData } from "utilities/get-chain";

const AppContext = createContext<{
  account: any;
  connectWallet: () => void;
  disconnectWallet: () => void;
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}>({
  account: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  message: "",
  setMessage: () => {},
  onSend: () => {},
});

const providerOptions: any = {
  connector: async (_, options) => {
    const { appName, networkUrl, chainId } = options;
    const walletLink = new WalletLink({
      appName,
    });
    const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
    await provider.enable();
    return provider;
  },
};

let web3Modal;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: process.env.NEXT_PUBLIC_APP_ENV,
    cacheProvider: true,
    providerOptions,
  });
}

type StateType = {
  provider?: any;
  web3Provider?: any;
  address?: string;
  chainId?: number;
  accountBalance?: any;
};

type ActionType =
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: StateType["provider"];
      web3Provider?: StateType["web3Provider"];
      address?: StateType["address"];
      chainId?: StateType["chainId"];
    }
  | {
      type: "SET_ADDRESS";
      address?: StateType["address"];
    }
  | {
      type: "SET_CHAIN_ID";
      chainId?: StateType["chainId"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    }
  | {
      type: "UPDATE_ACCOUNT_BALANCE";
      accountBalance?: StateType["accountBalance"];
    };

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  accountBalance: null,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address,
      };
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "RESET_WEB3_PROVIDER":
      return initialState;
    case "UPDATE_ACCOUNT_BALANCE":
      return {
        ...state,
        accountBalance: parseFloat(action.accountBalance),
      };
    default:
      throw new Error();
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<{
    username?: string;
    link?: string;
  }>({
    username: "",
    link: "",
  });

  function onSend() {}

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();

      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();

      const address = await signer.getAddress();

      const network = await web3Provider.getNetwork();

      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });

      // ethersProviderConnection();
    } catch (error) {
      console.log({
        error: `Error connecting wallet: ${error.message}`,
      });
    }
  }, []);

  useEffect(() => {
    addNetwork();
    const interval = setInterval(() => {
      addNetwork();
      // ethersProviderConnection();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function ethersProviderConnection() {
    const _provider = ethers.getDefaultProvider(
      process.env.NEXT_PUBLIC_APP_ENV,
      {
        alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      }
    );

    _provider.getBalance(address).then((balance) => {
      const balanceInEther = ethers.utils.formatEther(balance);

      dispatch({
        type: "UPDATE_ACCOUNT_BALANCE",
        accountBalance: balanceInEther,
      });
    });
  }

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider]
  );

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect]);

  function addNetwork() {
    if (typeof window !== "undefined") {
      getChainData(chainId, window.ethereum);
    }
  }

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          getChainData(parseInt(_hexChainId, 16), window.ethereum);
        }
        window.location.reload();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  function decToHex(dec: any) {
    var hex = Number(dec).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  return (
    <AppContext.Provider
      value={{
        connectWallet: connect,
        disconnectWallet: disconnect,
        account: state.address,
        onSend,
        message,
        setMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
