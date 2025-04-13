"use client";

import { registerNewUser } from "@/_lib/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function UserRegistrationForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(registerNewUser, undefined);

  // Redirect when registration is successful
  if (state && 
    !state.errors && 
    !state.message && 
    state.success === true) {
  const timeout = setTimeout(() => {
    router.push("/");
  }, 5000);//wait 5000 ms before redirect

  return () => clearTimeout(timeout);
}
}, [state, router]);
  return (
    <div className="p-4">
      {/* Registration success message
      appears after successful response from registerNewUser */}
      {state?.success && (
        <p className="text-primary font-bold text-sm mb-4">
          Registration successful! Redirecting to login...
        </p>
      )} 
      {/* Registration form appears first since success is false by default */}
      {!state?.success && (
        <div>
          <div className="justify-items-center">
            <h1 className="text-primary text-2xl font-bold ">Create new account:</h1>

            {/* prompt and redirect to login if already has account */}
            <p className="italic text-neutral text-xs">
              already have an account?{" "}
              <Link href="/"
                className="text-primary hover:text-primary-dark not-italic font-bold"
                aria-label="Log in to your account"
              >Log in
              </Link>
            </p>
          </div>


          {/* Form to collect user data */}
          
          <form action={action} className="bg-white px-8 pt-6 pb-8 mb-4">

            {/***** Username field *****/}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="username"
                name="username"
                required
              />
              {/*****  Username Error Messages *****/}
              {state?.errors?.username && (
                <p className="text-warning italic mt-1">{state.errors.username}</p>
              )}
            </div>

             {/***** Email field *****/}
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="email"
                name="email"
                required
              />
              {/*****  Email Error Messages *****/}
              {state?.errors?.email && (
                <p className="text-warning italic mt-1">{state.errors.email}</p>
              )}
            </div>

            {/***** Password field *****/}
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
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
              {/*****  Password Error Messages *****/}
              {state?.errors?.password && (
                <div className="mt-1">
                  <p className="text-warning italic">Password must:</p>
                  <ul className="text-sm italic">
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/***** Cofirm Password field *****/}
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
              {/***** Confirm Password Error Messages *****/}
              {state?.errors?.confirmPassword && (
                <p className="text-warning italic mt-1">{state.errors.confirmPassword}</p>
              )}
            </div>

            {/*****  Failed Registration Error Message *****/}
            <div className="flex justify-center">
              {state?.message && (
                <p className="text-warning font-bold text-sm mb-4">
                  {state.message}
                </p>
              )}
            </div>

            {/*****  Submit Button *****/}
            <div className="flex justify-end">
              <button
                className="w-full bg-primary text-white py-4 px-4 font-bold text-sm rounded cursor-pointer focus:outline-none focus:shadow-outline hover:bg-primary-dark"
                disabled={pending}
                type="submit"
              >
                {pending ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}