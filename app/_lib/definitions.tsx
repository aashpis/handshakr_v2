/**
 * Contains all custom defined types 
 * 
 */


import { z } from 'zod'

// API endpoints
//TODO: replace placerholders
export const API = {
  BASE: 'https://handshakr.duckdns.org',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login', 
  LOGOUT: '/auth/logout',
  CHECK_EMAIL: '/auth/check-email-for-account',
  PROFILE: {
    GET: '/auth/user-profile',
    UPDATE: '/auth/edit-user'
  },
  HANDSHAKE: {
    CREATE: '/users/create-handshake',
    DELETE: '/users/delete-handshake',
    ACCEPT: '/users/accept-handshake',
    REJECT: '/users/reject-handshake',
    CONNECT_AGREERER: '/users/connect-user',
    ACTIVE: '/users/active-handshake',
    HISTORY: '/users/history-handshake',
    PENDING: '/users/pending-handshake',
  },
  GET_PRICE_STATS: '/get-price-stats',
  GRAPH: {
    ITEM_PRICE: '/graph-item-sales',
    ITEM_PRICE_HISTOGRAM: '/graph-item-price-histogram',
    WEEKLY_MEDIAN_PRICE: '/graph-item-weekly-median-price',
  }
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
    .min(5, { message: 'Name must be at least 5 characters long.' })
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
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long.' })
    .trim(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .trim(),
  agreererEmail: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
})

/********** TYPE DEFINTIONS  *******************
* custom type defintions  
*/

// collects error messages to be displayed
// if no errors messages, it is set as undefined 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


