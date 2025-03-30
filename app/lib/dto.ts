// Data Transfer Objects
'use server' 

import 'server-only';
import { API } from './definitions';
import axiosClient from './axiosClient'; // Client-side axios
import axiosServer from './axiosServer'; // Server-side axios

// Edit user profile (Server-side)
export async function editUser(userData: {}) {
    try {
        const response = await axiosServer.put(API.PROFILE.GET, userData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "Failed to edit user profile" }; 
    }
}

// Create a new handshake (Client-side)
export async function createHandshake(handshakeData: {}) {
    try {
        const response = await axiosClient.post(API.HANDSHAKE.CREATE, handshakeData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "Failed to create handshake" }; 
    }
}

// Accept a handshake (Server-side)
//TODO: include CSRF?
export async function acceptHandshake(handshakeId: string) {
    try {
        const response = await axiosServer.post(API.HANDSHAKE.ACCEPT, { handshakeId });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "Failed to accept handshake" }; 
    }
}

// Reject a handshake (Server-side)
export async function rejectHandshake(handshakeId: string) {
    try {
        const response = await axiosServer.post(API.HANDSHAKE.REJECT, { handshakeId });
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.response?.data?.message || "Failed to reject handshake" }; 
    }
}
