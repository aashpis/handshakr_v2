'use client';

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
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      router.push(redirect || '/dashboard');
    }
  }, [state, router]);

  return (

    <div className="w-full max-w-xs rounded-lg">

       {/* Form to collect login data */}
      <form action={action} className="px-8 pt-6">

        {/***** Username field *****/}
        <div className="mb-4">
          <label
            className="block text-neutral-dark text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="username"
            name="username"
            type="text"
            required
          />
        </div>


        {/***** Password field *****/}
        <div className="mb-6">
          <label className="block text-neutral-dark text-sm font-bold mb-2" 
          htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>

        {/*****  Submit Button *****/}
        <div className="flex justify-end">
          <button
            className="w-full bg-primary text-white py-4 px-4 font-bold text-sm rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-primary-dark"
            type="submit"
            disabled={pending}
          >
            {pending ? 'Signing in...' : 'Sign In'}
          </button>

        {/*****  Failed Login Error Message *****/}
        </div>
        {state?.message && (
          <p className="text-warning text-center font-semibold my-3">
            Login Failed
          </p>
        )}
      </form>
    </div>
  );
}
