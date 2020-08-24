import axios, { AxiosInstance } from "axios";
import { IAssetData, IGasPrices, IParsedTx } from "./types";

const api: AxiosInstance = axios.create({
  baseURL: "http://130.211.12.3/parse/functions",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Parse-Application-Id": "rwallet",
    "X-Parse-REST-API-KEY": "",
    "Rwallet-API-Key": "masterKey",
  },
});

export async function apiGetAccountAssets(address: string, chainId: number): Promise<IAssetData[]> {
  const response = await api.get(`/account-assets?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number,
): Promise<IParsedTx[]> {
  const response = await api.get(`/account-transactions?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}

export const apiGetAccountNonce = async (address: string, chainId: number): Promise<string> => {
  const response = await api.get(`/account-nonce?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
};

export const apiGetGasPrices = async (data: object): Promise<IGasPrices> => {
  const response = await api.post(`/getTransactionFees`, data);
  const { result } = response.data;
  return result;
};

export const createRawTransaction = async (data: object): Promise<any> => {
  const response = await api.post(`/createRawTransaction`, data);
  const { result } = response.data;
  return result;
};
