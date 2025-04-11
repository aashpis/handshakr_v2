import { UserRegisterFormSchema, FormState, API, LoginFormSchema } from './definitions'
import axiosClient from "./axiosClient"
import { AxiosError } from 'axios'


//********** REGISTRATION FUNCTIONS *********************/

// Creates new user
export async function createUser(
  email: string,
  username: string,
  password: string
) {
  try {
    await axiosClient.post(API.REGISTER, {
      email,
      username,
      password,
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.message || "Account creation failed. Please try again.",
      };
    }

    return { success: false, error: "An unknown error occurred." };
  }
}




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
    console.log("user registration failed");
    return { message: result.error };
  }

  console.log("User successfully created"); // FOR TESTING ONLY

  return { success: true }; 
}

//********** LOGIN FUNCTIONS *********************/

// auth user login. 
export async function authLoginData(username: string, password: string) {
  try {
    const response = await axiosClient.post(API.LOGIN, { username, password });

       console.log("authLoginData response:");
        console.log(response);
        // 1. Extract JWT from response body
        const jwtToken = response.data.data; // The JWT string
    
        // 2. Extract CSRF token from response headers
        const csrfToken = response.headers['x-csrf-token'];
        
        // 3. Store tokens 
        localStorage.setItem('jwt', jwtToken); 
        localStorage.setItem('csrf', csrfToken);
        
        console.log('Tokens stored:', { jwtToken, csrfToken });

  
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { success: false, error: error.response?.data?.message || "Failed to login" }; 
    }
    return { success: false, error: "An unknown error occurred" };
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


export async function logoutUser() {
  try {
    await axiosClient.post(API.LOGOUT);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Logout failed:", error.response?.data?.message || "Unknown error");
    } else {
      console.error("Logout failed: An unknown error occurred");
    }
  }
};