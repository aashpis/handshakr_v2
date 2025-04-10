'use server'

import 'server-only'
import { API } from './definitions'
import axiosServer from './axiosServer'
import { AxiosError } from 'axios' // Import AxiosError type

// Get user profile data
export async function getUserProfile() {
  try {
    const response = await axiosServer.get(`${API.PROFILE.GET}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data?.message || "Failed to get profile" };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

// Show which handshakes have not been completed
export async function getPendingHandshakes() {
  try {
    const response = await axiosServer.get(`${API.HANDSHAKE.PENDING}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data?.message || "Failed to get your pending handshakes" };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

// Get encrypted handshake history data
export async function getHandshakeHistory() {
  try {
    const response = await axiosServer.get(`${API.HANDSHAKE.HISTORY}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data?.message || "Failed to get handshakes history" };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}

// Connect agreerer to new handshake
export async function connectAgreerer() {
  try {
    const response = await axiosServer.post(`${API.HANDSHAKE.CONNECT_AGREERER}`);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data?.message || "Failed to connect agreerer to handshake" };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}
