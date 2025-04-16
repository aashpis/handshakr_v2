import { UserRegisterFormSchema, UserAuthFormState, API, LoginFormSchema } from './definitions'
// import { AxiosError } from 'axios'
// import axios from "axios";


// const axiosPublic = axios.create({
//   baseURL: API.BASE,
//   timeout: 10000,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true
// });


// // ***** REQUEST INTERCEPTOR ********
// axiosPublic.interceptors.request.use((config) => {
//   console.log(
//     `[Axios Public] Request: ${config.method?.toUpperCase()} ${config.url}`
//   );
//   console.log("[Axios Public] Headers:", config.headers);
//   console.log("[Axios Public] Data:", config.data);
//   return config;
// }, (error) => {
//   console.error("[Axios Public] Request Error:", error);
//   return Promise.reject(error);
// });

// // **** RESPONSE INTERCEPTOR ****
// axiosPublic.interceptors.response.use((response) => {
//   console.log(
//     `[Axios Public] Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`
//   );
//   console.log("[Axios Public] Response Data:", response.data);
//   console.log("[Axios Public] Response Headers:", response.headers);
//   return response;
// }, (error) => {
//   if (error.response) {
//     console.error(
//       `[Axios Public] Response Error: ${error.response.status} ${error.config.method?.toUpperCase()} ${error.config.url}`
//     );
//     console.error("[Axios Public] Error Data:", error.response.data);
//     console.error("[Axios Public] Error Headers:", error.response.headers);
//   } else {
//     console.error("[Axios Public] Network/Config Error:", error.message);
//   }
//   return Promise.reject(error);
// });


//********** REGISTRATION FUNCTIONS *********************/

// // Creates new user with axios
// export async function createUserRequest(
//   email: string,
//   username: string,
//   password: string
// ) {
//   try {
//     await axiosPublic.post(API.REGISTER, {
//       email,
//       username,
//       password,
//     });
//     console.log("createUserRequest() success ");
//     return { success: true };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return {
//         success: false,
//         error: error.response?.data?.message || "Account creation failed. Please try again.",
//       };
//     }
//     console.log("createUserRequest() fail ");
//     return { success: false, error: "An unknown error occurred." };
//   }
// }

export async function createUserFetchRequest(
  email: string,
  username: string,
  password: string
) {
  try {
    const response = await fetch(`${API.BASE}${API.REGISTER}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Account creation failed. Please try again.",
      };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("createUserRequest error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred." 
    };
  }
}




// validates new user input and posts to the server
// redirect to user dashboard
export async function registerNewUser(state: UserAuthFormState, formData: FormData) {
  const validatedFields = UserRegisterFormSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!validatedFields.success) {
    console.log("userFormSchema errors: ")
    console.log(validatedFields.error.flatten().fieldErrors);
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, email, password } = validatedFields.data;
  
  const result = await createUserFetchRequest(email, username, password);
  
  if (!result.success) {
    console.log("user registration failed");
    return { message: result.error };
  }

  console.log("User successfully created"); // FOR TESTING ONLY

  return { success: true }; 
}

//********** LOGIN FUNCTIONS *********************/

// //  user login request with axios 
// export async function loginRequest(username: string, password: string) {
//   try {
//     const response = await axiosPublic.post(API.LOGIN, { username, password });

//     //Extract CSRF Token and store it for headers 
//     const csrfToken = response.headers["x-csrf-token"];
//     console.log("csrfToken Stored: ", csrfToken);
//     if(csrfToken){
//       sessionStorage.setItem("X-XSRF-TOKEN", csrfToken);
//     }

//     return { success: true, data: response.data };
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       return { success: false, error: error.response?.data?.message || "Failed to login" }; 
//     }
//     return { success: false, error: "An unknown error occurred" };
//   }
// }

// Auth user login with fetch
export async function loginFetchRequest(username: string, password: string) {
  try {
    const response = await fetch(`${API.BASE}${API.LOGIN}`, {
      method: "POST",
      credentials: "include", // Include cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || "Failed to login" 
      };
    }

    // Extract CSRF Token from response headers
    const csrfToken = response.headers.get("x-csrf-token");
    if (csrfToken) {
      sessionStorage.setItem("X-XSRF-TOKEN", csrfToken);
      console.log("CSRF token stored:", csrfToken);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: unknown) {
    console.error("authLoginDataRequest error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}


export async function loginUser(state: UserAuthFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });


  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, password } = validatedFields.data;

  const result = await loginFetchRequest(username, password);


  if (!result.success) {
    return { message: result.error };
  }

  console.log("User successfully logged in"); //FOR TESTING ONLY

  return { success: true }; 
}


// export async function logoutUserRequest() {
//   try {
//     const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");
//     console.log("[LogoutUserRequest] getting X-XSRF-TOKEN:", csrfToken);

//     await axiosPublic.post(API.LOGOUT, {'X-XSRF-TOKEN': csrfToken }, {
//       headers: { 
//         'X-XSRF-TOKEN': csrfToken 
//       },
//       withCredentials: true
//     }
//   );

//     sessionStorage.removeItem("X-XSRF-TOKEN");
    

//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       console.error("Logout failed:", error.response?.data?.message || "Unknown error");
//       throw new Error(error.response?.data?.message || "Logout failed");
//     } else {
//       console.error("Logout failed: An unknown error occurred");
//       throw new Error("Logout failed: An unknown error occurred");
//     }
//   }
// }


//test a fetch request
export async function logoutUserRequest() {
  const csrfToken = sessionStorage.getItem("X-XSRF-TOKEN");

  try {
    const response = await fetch("https://handshakr.duckdns.org/api/auth/logout", {
      method: "POST",
      credentials: "include", //send cookies like jwtCookie, XSRF-TOKEN
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken ?? "", //send header value explicitly
      },
    });

    
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Logout failed:", errorData);
      return { success: false, error: errorData.message || "Logout failed" };
    }

    sessionStorage.clear();
    
    return { success: true };
  } catch (err) {
    console.error("Logout error:", err);
    return { success: false, error: "An error occurred while logging out" };
  }
}