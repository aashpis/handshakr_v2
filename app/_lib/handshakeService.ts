'use client'

// Contains functions related to Handshakes

import { API, HandshakeFormSchema, HandshakeFormState } from './definitions';
// import axiosClient from './axiosClient'; // Client-side axios
// import { AxiosError } from 'axios'; // Import AxiosError type
import axios  from 'axios'

//******* HANDSHAKE CREATION *********//

// fetch request
export async function createHandshakeFetchRequest(
  handshakeName: string,
  encryptedDetails: string,
  receiverUsername: string
) {

  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  try {
    const response: Response = await fetch(`${API.BASE}/${API.CREATE_HANDSHAKE}`, {

      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken ?? "NO X-XSRF-TOKEN", //send header value explicitly
      },
      body: JSON.stringify({
        handshakeName,
        encryptedDetails,
        receiverUsername
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Handshake creation failed:", errorData);
      return { success: false, error: errorData.message || "Handshake Creation failed" };
    }

    return { success: true };
  } catch (err) {
    console.error("Handshake creation error:", err);
    return { success: false, error: "An error occurred while creating handshake" };
  }
}


//axios version
export async function createHandshakeAxiosRequest(
  handshakeName: string,
  encryptedDetails: string,
  receiverUsername: string
) {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");
  console.log("[createHandshakeAxiosRequest] current X-XSRF-TOKEN: ", csrfToken);

  if (!csrfToken) {
    return { 
      success: false, 
      error: "Missing X-XSRF-token" 
    };
  }

  try {
    await axios.post(
      `${API.BASE}/${API.CREATE_HANDSHAKE}`,
      {
        handshakeName,
        encryptedDetails,
        receiverUsername
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": csrfToken ?? "NO X-XSRF-TOKEN",
        }
      }
    );

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Handshake creation failed:", error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || "Handshake Creation failed" 
      };
    }

    console.error("Handshake creation error:", error);
    return { 
      success: false, 
      error: "An error occurred while creating handshake" 
    };
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

  const result = await createHandshakeFetchRequest(
    handshakeName,
    encryptedDetails,
    receiverUsername
  );

  if (!result.success) {
    console.log("failed to create handshake. error: ", result.error);
    return { message: result.error || "Error creating new handshake" };
  }

  //FOR TESTING ONLY
  console.log("Handshake Creation Sucessful");
  console.log(validatedFields);

  return { success: true };

}

