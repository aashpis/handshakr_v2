// Data Access layer 
// Verifies Auth of requests from client isde
'use server' 

import 'server-only'
import {API} from './definitions'
import axiosServer from "./axiosServer"

// let data = { username: string; userID: string }

// get user profile data
export async function getUserProfile(userId: string ) {
  try {
    const response = await axiosServer.get(`${API.PROFILE.GET}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || "Failed to get profile" }; 
  }
}




// show which handshakes have not been completed
export async function getPendingHandshakes(userId: string ){
  try {
    const response = await axiosServer.get(`${API.HANDSHAKE.PENDING}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || "Failed to get your pending handshakes" }; 
  }
}


// get encrypted handshake history data
// each handshake must be decrypted by user to view
export async function getHandshakeHistory(userId: string ){
  try {
    const response = await axiosServer.get(`${API.HANDSHAKE.HISTORY}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || "Failed to get handshakes history" }; 
  }

}



// connect agreererer to new handshake
export async function connectAgreerer(userId: string){
  try {
      const response = await axiosServer.post(`${API.HANDSHAKE.CONNECT_AGREERER}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || "failed to reject handshake" }; 
    }

}