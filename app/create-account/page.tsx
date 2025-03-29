"use client"

import Inputs from "@/components/input"

import { createAccount } from "./actions"
import Button from "@/components/button"
import { useFormState } from "react-dom"


export default function Create_account() {
    const[state,dispatch] = useFormState(createAccount,null)

    return(
        <form action={dispatch} className="text-black">
            <Inputs
                name="username"
                type="text"
                placeholder="username"
                required
                errors={state?.fieldErrors.username}
            />
            <Inputs
                name="email"
                type="email"
                placeholder="email"
                required
                errors={state?.fieldErrors.email}
            />
            <Inputs
                name="password"
                type="password"
                placeholder="password"
                required
                errors={state?.fieldErrors.password}
            />
            <Inputs
                name="confirm_password"
                type="password"
                placeholder="confirm password"
                required
                errors={state?.fieldErrors.confirm_password}
            />
            <Button text="create account"/>
        </form>
    )
}