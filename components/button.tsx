"use client"

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
    className:string;
  }
  

export default function Button({text,className="",...rest}:ButtonProps){
    const {pending} = useFormStatus()
    return(
        <button {...rest} className={` border-2 ${className} `} disabled={pending} >{pending ? "로디중" : text}</button>
    )
}