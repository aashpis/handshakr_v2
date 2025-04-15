'use client'

// Contains functions related to Handshakes

import { API, HandshakeFormSchema, HandshakeFormState } from './definitions';
import axiosClient from './axiosClient'; // Client-side axios
import { AxiosError } from 'axios'; // Import AxiosError type


//******* HANDSHAKE CREATION *********//

// POST request to create new Handshake
export async function newHandshakeRequest(
    handshakeName: string,
    encryptedDetails: string,
    receiverUsername: string
) {
    try {
        const response = await axiosClient.post(API.CREATE_HANDSHAKE, {
            handshakeName,
            encryptedDetails,
            receiverUsername,
        });
        console.log("newHandshakeRequest() response: " + response);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return { success: false, error: error.response?.data?.message || "Failed to create handshake" };
        }
        return { success: false, error: "An unknown error occurred" };
    }
}

// New Handshake Creation flow
export async function createHandshake(state: HandshakeFormState, formData: FormData) {
  //validate handshake fields according to schema 
  const validatedFields = HandshakeFormSchema.safeParse({
    handshakeName: formData.get("handshakeName"),
    encryptedDetails: formData.get("encryptedDetails"),
    receiverUsername: formData.get("receiverUsername")
  });

  // return schema validation errors to display in form
  if (!validatedFields.success) {
    console.log("HandshakeFormSchema errors: ") // FOR TESTING
    console.log(validatedFields.error.flatten().fieldErrors); // FOR TESTING
    return { errors: validatedFields.error.flatten().fieldErrors };
  };

  const { handshakeName, receiverUsername, encryptedDetails } = validatedFields.data;

  const result = await newHandshakeRequest(
    handshakeName,
    encryptedDetails,
    receiverUsername
);

  if (!result.success) {
    console.log("failed to create handshake. error: ", result.error);
    return { message: result.error || "Error creating new handshake"};
  }

  //FOR TESTING ONLY
  console.log("Handshake Creation Sucessful");
  console.log(validatedFields);
  
  return { success: true }; 
    
}