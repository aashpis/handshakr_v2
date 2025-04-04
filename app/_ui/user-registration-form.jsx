"use client";

import { registerNewUser } from "@/_lib/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function UserRegistrationForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(registerNewUser, undefined);

  // Redirect when registration is successful
  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
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
        <h1 className="font-bold text-primary text-3xl">Create New Account</h1>
        <form action={action} className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          {state?.errors?.username && (
            <p className="text-warning mb-4">{state.errors.username}</p>
          )}

          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          {state?.errors?.email && (
            <p className="text-warning mb-4">{state.errors.email}</p>
          )}

          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
          {state?.errors?.confirmPassword && (
            <p className="text-warning mb-4">{state.errors.confirmPassword}</p>
          )}
          {state?.errors?.password && (
            <div>
              <p className="text-warning">Password must:</p>
              <ul className="text-sm mb-4">
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={pending}
            type="submit"
          >
            {pending ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
