/**
 * Contains all custom defined types 
 * 
 */


import { z } from 'zod'

// API endpoints
export const API = {
  BASE: 'https://handshakr.duckdns.org/api',
  REGISTER: 'auth/register',
  LOGIN: 'auth/login', 
  LOGOUT: 'auth/logout',
  PROFILE: 'users/me',
  CREATE_HANDSHAKE:"users/create-handshake",
  GET_MY_INITIATED_HS: "handshake/get-handshakes-by-initiator",
  GET_MY_RECEIVED_HS: "handshake/get-handshakes-by-acceptor",
  GET_PRICE_STATS: 'scraper/get-price-stats',
  ITEM_PRICE_HISTOGRAM: 'scraper/graph-item-price-histogram',
  WEEKLY_MEDIAN_PRICE: 'graph-item-weekly-median-price',
}

/**********  SCHEMA DEFINTIONS  *******************
 * Schema are zod objects that validates user input into forms
 * Schema only validate inputs based on specifications and does NOT authenticate data 
*/

// validate user registration-form input 
// returns error messages to be displayed in form
export const UserRegisterFormSchema = z.object({
  
  username: z
    .string()
    .regex(/^\S*$/, { message: 'Username cannot contain whitespace' }) 
    .min(5, { message: 'Name must be at least 5 characters long.' })
    .max(30, )
    .trim(),
  
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),

    confirmPassword: z.string().trim()

  })
  //check if passwords match
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "The passwords did not match.",
      path: ["confirmPassword"],
  }
);

// validate login-form input
// makes sure values are strings and not null
// returns error messages to be displayed in form
export const LoginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" }), 
  password: z
    .string()
    .min(1, { message: "Password is required" }) 
});

// validate handshake-creation-form input
// returns error messages to be displayed in form
export const HandshakeFormSchema = z.object({
  handshakeName: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters long.' })
    .trim(),
  receiverUsername: z
    .string()
    .trim(),
  encryptedDetails: z
    .string()
    .min(10, {message: "Make sure handshake has enough details"})
    .trim()
})

/********** FormState Definitions  *******************/
//defines the state of forms


// collects error messages to be displayed
// if no errors messages, it is set as undefined 
export type UserAuthFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


  export type HandshakeFormState =
  | {
      errors?: {
        handshakeName?: string[];
        encryptedDetails?: string[];
        receiverUsername?: string[];
      };
      message?: string;
    }
  | undefined;


  
export type UserData =
| {
  id: string;
  username: string;
  email: string;
} 
| undefined;


export type Handshake = {
  handshakeName: string;
  encryptedDetails: string;
  signedDate: string;
  completedDate: string | null;
  handshakeStatus: string;
  initiatorUsername: string;
  acceptorUsername: string;
}

