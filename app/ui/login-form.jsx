'use client'

import Image from 'next/image';
import Link from 'next/link'
import { useActionState } from 'react'
import { loginUser } from '@/lib/auth';

``
export default function LoginForm() {
  const [state, action, pending] = useActionState(loginUser, undefined)


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-xs">
        <div className='relative'>
          <h1 className="absolute text-md font-bold text-gray-700 bottom-0 left-1/2 -translate-x-1/2 ">
            HandShakr</h1>
          <Image
            src="/handshake.jpg"
            width={1250}
            height={625}
            alt="handshake"
            className="w-full"
          />
        </div>
        <form 
          action={action}
          className="bg-white px-8 pt-6 pb-8 mb-4" 
          >
          
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          {state?.errors?.username && <p className='text-red-500 mb-4'>{state.errors.username}</p>}

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
              >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              />
          </div>
          {state?.errors?.password && <p className='text-red-500 mb-4'>{state.errors.password}</p>}

          <div className="flex items-center justify-between">
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="google.com"
            >
              Forgot Password?
            </Link>
            <button
              className="bg-blue-500 hover:bg-primary-dark text-neutral font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={pending}
            >
              {pending ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
      
        </form>
        <div className="flex items-center justify-center mt-5  bg-gray-50 py-4 px-4 text-primary font-bold text-sm rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-blue-50  hover:text-blue-800">
            {/* create new account prompt register redirect */}
            <Link href='/regis  ter'> Create New Account </Link>
          </div>
      </div>

    </div>
  );
};
