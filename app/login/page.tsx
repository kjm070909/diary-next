"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { LogIn } from "./actions";
import Link from "next/link";

export default function Login() {
  const [state, dispatch] = useFormState(LogIn, null);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[400px]">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        <form action={dispatch} className="space-y-6">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            required
            errors={state?.fieldErrors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            required
            errors={state?.fieldErrors.password}
          />
          <Button text="Login" className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition" />
        </form>
        <div className="text-center mt-4">
          <Link href="/create-account">
            <Button text="Create an Account" className="w-full py-3 text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
