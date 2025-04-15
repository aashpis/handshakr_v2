'use server'

import 'server-only'
import { API } from './definitions'
import axiosServer from './axiosServer'
import { AxiosError } from 'axios' // Import AxiosError type

// Get user profile data
export async function getUserProfile() {
  try {
    const response = await axiosServer.get(`${API.PROFILE}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data?.message || "Failed to get profile" };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

// // Show which handshakes have not been completed
// export async function getPendingHandshakes() {
//   try {
//     const response = await axiosServer.get(`${API.HANDSHAKE.PENDING}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get your pending handshakes" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // Get encrypted handshake history data
// export async function getHandshakeHistory() {
//   try {
//     const response = await axiosServer.get(`${API.HANDSHAKE.HISTORY}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get handshakes history" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }


/*************** PRICE ANALYZER METHODS ****************/

// gets price object with properties: median, mean, min, max
// export async function getPriceStats(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GET_PRICE_STATS}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get price stats" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of final sales prices 
// export async function getPriceSalesGraph(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GRAPH.ITEM_PRICE}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get sales graph" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of price histogram 
// export async function getPriceHistogramGraph(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GRAPH.ITEM_PRICE_HISTOGRAM}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get price histogram" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// // gets .png graph of median prices 
// export async function getMedianPriceGraph(itemName: string) {
//   try {
//     const response = await axiosServer.get(`${API.GRAPH.ITEM_PRICE_HISTOGRAM}/${itemName}`);
//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to get median price graph" };
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }