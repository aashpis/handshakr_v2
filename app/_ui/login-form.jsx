'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/_lib/auth';

export default function LoginForm() {
  const router = useRouter(); 
  const [state, action, pending] = useActionState(loginUser, undefined);

  // Redirect after successful login
  useEffect(() => {
    if (state?.success) {
      router.push('/dashboard');
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs rounded-lg">
        <div className="relative">
          <h1 className="absolute text-5xl font-teko bottom-0 left-1/2 -translate-x-1/2">
            Handshākr
          </h1>
          <Image
            src="/handshake.jpg"
            width={1250}
            height={625}
            alt="handshake"
            className="w-full"
          />
        </div>
        <form action={action} className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label 
              className="block text-sm font-bold mb-2" 
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full py-2 px-3 leading-tight shadow appearance-none border rounded border-neutral-dark focus:ring-primary focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          {state?.errors?.username && (
            <p className="text-red-500 mb-4">{state.errors.username}</p>
          )}

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
            />
          </div>
          {state?.errors?.password && (
            <p className="text-red-500 mb-4">{state.errors.password}</p>
          )}

          <div className="flex items-center justify-between">
            <Link
              className="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-dark"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={pending}
            >
              {pending ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-5 bg-primary text-white py-4 px-4 font-bold text-sm rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-primary-dark">
          <Link href="/register">Create New Account</Link>
        </div>
      </div>
    </div>
  );
}
