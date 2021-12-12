import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: 'https://ethereum-api.xyz',
    timeout: 30000, // 30 secs
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export async function apiGetAccountAssets(
    address: string,
    chainId: number
): Promise<any> {
    const response = await api.get(
        `/account-assets?address=${address}&chainId=${chainId}`
    )
    const { result } = response.data
    return result
}