import { UserRegisterFormSchema, FormState, API, LoginFormSchema } from './definitions'
import { redirect } from 'next/navigation'
import axiosClient from "./axiosClient"
import { useRouter } from 'next/router'
// import axiosServer from "./axiosServer"


// export async function checkEmailAvailability(email: string) {
//   try {
//     const response = await axiosServer.get(API.CHECK_EMAIL, {
//       params: { email },
//     });
//     return { success: true, data: response.data.available }; //TODO: Match available to backend response
//   } catch (error) {
//     return { success: false, error: "Failed to check email availability" };
//   }
// }

//********** REGISTRATION FUNCTIONS *********************/

// creates new user
export async function createUser(
  email: string,
  username: string,
  password: string
) {
  try {
    //for testing
    console.log(`email: ${email}`)
    console.log(`username: ${username}`)
    console.log(`password: ${password}`)

    const response = await axiosClient.post(API.REGISTER, {
      email,
      username, 
      password
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: "Account creation failed" };
  }
}



// new user sign up flow 
// validates new user input and posts to the server
// redirect to user dashboard
export async function registerNewUser(state: FormState, formData: FormData) {
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
  
  const result = await createUser(email, username, password);
  
  if (!result.success) {
    return { message: result.error };
  }

  console.log("User successfully created"); // FOR TESTING ONLY

  return { success: true }; 
}

//********** LOGIN FUNCTIONS *********************/

// auth user login. 
export async function authLoginData(username: string, password: string) {
  try {
    const response = await axiosClient.post(API.LOGIN, {username, password});
    console.log("authLoginData response:");
    console.log(response);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || "Failed to login" }; 
  }
}

export async function authLoginDataWithFetch(username: string, password: string) {
  try {
    const response = await fetch("https://handshakr.duckdns.org/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Set Content-Type as JSON
      },
      body: JSON.stringify({ username, password }),  // Send data as JSON
      credentials: "include",  // Include credentials (cookies, JWT tokens)
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Failed to login" };
    }

    // Parse the response JSON if the request was successful
    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    // Handle any network errors or other exceptions
    console.error("Error during login:", error);
    return { success: false, error: "Network or unexpected error occurred" };
  }
}

export async function loginUser(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });


  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, password } = validatedFields.data;

  const result = await authLoginData(username, password);


  if (!result.success) {
    return { message: result.error };
  }

  console.log("User successfully logged in"); //FOR TESTING ONLY

  return { success: true }; 
}


  

export function logout() {
  const router = useRouter();
  
  const logout = async () => {
    try {
      await axiosClient.post(API.LOGOUT);
      router.push('/');
    } catch (error) {
      console.error("Signout error:", error);
      router.push('/');
    }
  };
  
  return logout;
}