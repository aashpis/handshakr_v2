import { UserRegisterFormSchema, FormState, API, LoginFormSchema } from './definitions'
import { redirect } from 'next/navigation'
import axiosClient from "./axiosClient"
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



// auth user login. 
export async function authLoginData(username: string, password: string) {
  try {
    const response = await axiosClient.post(API.LOGIN, {username, password});
    console.log(response) // FOR TESTING
    console.log(response.data) // FOR TESTING
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message || "Failed to login" }; 
  }
}
// new user sign up flow 
// validates new user input and posts to the server
// redirect to user dashboard
export async function registerNewUser(state: FormState, formData: FormData) {
  const validatedFields = UserRegisterFormSchema.safeParse({
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, email, password } = validatedFields.data;

  const result = await createUser( email, username, password );

  if (!result.success) {
    return { message: result.error };
  }

  console.log("User successfully created"); //FOR TESTING ONLY

  return redirect('/dashboard');
}



export async function loginUser(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
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

  return redirect('/dashboard');
}



  

// Signout and redirect to login
export async function signout() {
  try {
    await axiosClient.post(API.SIGNOUT);
    redirect("/login");
  } catch (error) {
    console.error("Signout error:", error);
    redirect("/");
  }
}
