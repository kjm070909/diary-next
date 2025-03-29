"use client"


import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { LogIn } from "./actions";
import Link from "next/link";

export default function Login(){
    const [state,dispatch] = useFormState(LogIn,null)
    return(
        <div className="text-black">
            <form action={dispatch} className="text-black">
                <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                errors={state?.fieldErrors.email}
                />
                <Input 
                name="password"
                type="password"
                placeholder="password"
                required
                errors={state?.fieldErrors.password}
                />
                <Button text="Login"/>
            </form>
            <Link href={"/create-account"}><Button text="lets go create-account"/></Link>
            
        </div>
    )
}