"use client";

import { registerNewUser } from "@/_lib/auth";
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserRegistrationForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(registerNewUser, undefined);

  // Redirect when registration is successful
  useEffect(() => {
    if (state?.success) {
      const timeout = setTimeout(() => {
        router.push("/"); // redirect to login after 2 seconds
      }, 2000);

      return () => clearTimeout(timeout); // cleanup in case component unmounts
    }
  }, [state, router]);

  return (
    <div className="p-4">
      {/* registration success message appears after successful response from registerNewUser */}
      {state?.success && (
        <p className="text-primary font-bold text-sm mb-4">
          Registration successful! Redirecting to login...
        </p>
      )}
      {/* Registration form renders first since success is false by default */}
      {!state?.success && (
        <form action={action} className="bg-white px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full py-2 px-3 leading-tight shadow appearance-none border rounded border-neutral-dark focus:ring-primary focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              required
            />
            {state?.errors?.username && (
              <p className="text-warning italic mt-1">{state.errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full py-2 px-3 leading-tight shadow appearance-none border rounded border-neutral-dark focus:ring-primary focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              required
            />
            {state?.errors?.email && (
              <p className="text-warning italic mt-1">{state.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              required
            />
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

          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
            {state?.errors?.confirmPassword && (
              <p className="text-warning italic mt-1">{state.errors.confirmPassword}</p>
            )}
          </div>
            {/* display failed registration messasge */}
          <div className="flex justify-center">
            {state?.message && (
              <p className="text-warning font-bold text-sm mb-4">
                {state.message}
              </p>
            )}
          </div>

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
      )}
    </div>
  );
}