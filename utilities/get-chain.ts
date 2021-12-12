import toast from "react-hot-toast";
import supportedChains from "./chain"

export function decToHex(dec: any) {
    var hex = Number(dec).toString(16);
    hex = "0x" + hex;
    return hex;
}
export const addChain = (ethereum: any, chainId: any) => {
    const preferedChain = supportedChains.find((chain: any) => chain.chain_id === chainId);

    ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: decToHex(preferedChain.chain_id),
            chainName: preferedChain.name,
            nativeCurrency: {
                name: preferedChain.native_currency.name,
                symbol: preferedChain.native_currency.symbol,
                decimals: 18,
            },
            rpcUrls: [preferedChain.rpc_url],
            blockExplorer: preferedChain.block_explorer
        }]
    })
        .then(() => {
            getChainData(chainId);
        })
        .catch(err => {
            toast.error("Error occured while adding chain")
        })
}

export const getChainData = (chainId: number, ethereum?: any) => {
    const chainData = supportedChains.find((chain: any) => chain.chain_id === chainId)

    const env = process.env.NEXT_PUBLIC_APP_ENV;

    if (!chainData) {
        const preferedChain = supportedChains.find((chain: any) => chain.network === env);

        console.log(decToHex(preferedChain.chain_id))

        ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: decToHex(preferedChain.chain_id),
                chainName: preferedChain.name,
                nativeCurrency: {
                    name: preferedChain.native_currency.name,
                    symbol: preferedChain.native_currency.symbol,
                    decimals: 18,
                },
                rpcUrls: [preferedChain.rpc_url],
                blockExplorerUrls: [preferedChain.block_explorer]
            }]
        })
            .then(() => {
                getChainData(chainId);
            })
            .catch(err => {
                toast.error("Error occured while adding chain")
            })
    }

    return chainData;
}