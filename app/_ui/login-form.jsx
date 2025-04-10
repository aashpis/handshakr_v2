'use client';

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

    <div className="w-full max-w-xs rounded-lg">
      <form action={action} className="bg-white px-8 pt-6">
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
        <div className="flex justify-end">
          <button
            className="w-full bg-primary text-white py-4 px-4 font-bold text-sm rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-primary-dark"
            type="submit"
            disabled={pending}
          >
            {pending ? 'Signing in...' : 'Sign In'}
          </button>
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
