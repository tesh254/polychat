const supportedChains = [
    {
        name: "Polygon Testnet",
        short_name: "matic",
        chain: "polygon",
        network: "testnet",
        chain_id: 80001,
        network_id: 80001,
        rpc_url: "https://rpc-mumbai.maticvigil.com/",
        native_currency: {
            symbol: "MATIC",
            name: "MATIC",
            decimals: 18,
            contractAddress: "",
            balance: ""
        },
        block_explorer: "https://mumbai.polygonscan.com"
    },
    {
        name: "Polygon Mainnet",
        short_name: "matic",
        chain: "polygon",
        network: "mainnet",
        chain_id: 137,
        network_id: 137,
        rpc_url: "https://rpc-mainnet.maticvigil.com",
        native_currency: {
            symbol: "MATIC",
            name: "MATIC",
            decimals: 18,
            contractAddress: "",
            balance: ""
        },
        block_explorer: "https://polygonscan.com"
    }
]

export default supportedChains;