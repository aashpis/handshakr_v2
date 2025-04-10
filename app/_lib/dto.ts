'use server'

import 'server-only';
import { API } from './definitions';
import axiosClient from './axiosClient'; // Client-side axios
import axiosServer from './axiosServer'; // Server-side axios
import { AxiosError } from 'axios'; // Import AxiosError type

// // Edit user profile (Server-side)
// export async function editUser(userData: {}) {
//     try {
//         const response = await axiosServer.put(API.PROFILE.GET, userData);
//         return { success: true, data: response.data };
//     } catch (error: unknown) {
//         if (error instanceof AxiosError) {
//             return { success: false, error: error.response?.data?.message || "Failed to edit user profile" }; 
//         }
//         return { success: false, error: "An unknown error occurred" }; 
//     }
// }

// Create a new handshake (Client-side)
export async function createHandshake(handshakeData: { name: string, details: string }) {
    try {
        const response = await axiosClient.post(API.HANDSHAKE.CREATE, handshakeData);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return { success: false, error: error.response?.data?.message || "Failed to create handshake" }; 
        }
        return { success: false, error: "An unknown error occurred" };
    }
}

// Accept a handshake (Server-side)
export async function acceptHandshake(handshakeId: string) {
    try {
        const response = await axiosServer.post(API.HANDSHAKE.ACCEPT, { handshakeId });
        return { success: true, data: response.data };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return { success: false, error: error.response?.data?.message || "Failed to accept handshake" }; 
        }
        return { success: false, error: "An unknown error occurred" };
    }
}

// Reject a handshake (Server-side)
export async function rejectHandshake(handshakeId: string) {
    try {
        const response = await axiosServer.post(API.HANDSHAKE.REJECT, { handshakeId });
        return { success: true, data: response.data };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return { success: false, error: error.response?.data?.message || "Failed to reject handshake" }; 
        }
        return { success: false, error: "An unknown error occurred" };
    }
}
