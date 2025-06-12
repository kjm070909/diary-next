"use client"

import Inputs from "@/components/input"
import { createAccount } from "./actions"
import Button from "@/components/button"
import { useFormState } from "react-dom"

export default function Create_account() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[400px]">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Account</h2>
        <form action={dispatch} className="space-y-6">
          <Inputs
            name="username"
            type="text"
            placeholder="Username"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            required
            errors={state?.fieldErrors.username}
          />
          <Inputs
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            required
            errors={state?.fieldErrors.email}
          />
          <Inputs
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            required
            errors={state?.fieldErrors.password}
          />
          <Inputs
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            required
            errors={state?.fieldErrors.confirm_password}
          />
          <Button text="Create Account" className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition" />
        </form>
      </div>
    </div>
  );
}
