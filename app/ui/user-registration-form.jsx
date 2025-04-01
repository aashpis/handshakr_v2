'use client'

import { registerNewUser } from '../lib/auth'
import { useActionState } from 'react'

export default function UserRegistrationForm() {
  const [state, action, pending] = useActionState(registerNewUser, undefined)

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className='rounded-lg shadow-md'>
      <form
        action={action}
        className="bg-white px-8 pt-6 pb-8 mb-4"
        >
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username" 
            name="username"
            placeholder="Username" 
            />
        </div>
        {state?.errors?.username && <p className='text-red-500 mb-4'>{state.errors.name}</p>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" 
            name="email" 
            placeholder="Email" />
        </div>
        {state?.errors?.email && <p className='text-red-500 mb-4'>{state.errors.email}</p>}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p className='text-red-500'>Password must:</p>
            <ul className = "text-sm mb-4">
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
          <button
            className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={pending}
            type="submit">
            Sign Up
          </button>
      </form>
    </div>
  </div>
  )
}