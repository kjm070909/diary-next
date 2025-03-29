"use client"

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
  }
  

export default function Button({text}:ButtonProps){
    const {pending} = useFormStatus()
    return(
        <button disabled={pending} >{pending ? "로디중" : text}</button>
    )
}