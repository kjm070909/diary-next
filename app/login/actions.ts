"use server"

import db from "@/lib/db"
import { z } from "zod"
import bcrypt from "bcrypt"
import getSession from "@/lib/session"
import { redirect } from "next/navigation"

const checkemail = async(email:string) => {
    const user = await db.user.findUnique({
        where:{
            email,
        },
        select:{
            id:true,
        }
    })
    return Boolean(user)
}

const formschema = z.object({
    email:z.string()
    .email().toLowerCase().refine(checkemail,"No email"),
    password:z.string({required_error:"password is required"}).min(4)
})


export async function LogIn(prevState:any,formData:FormData) {
    const data = {
        email:formData.get("email"),
        password:formData.get("password")
    }
    const result = await formschema.safeParseAsync(data)
    if (!result.success){
        return result.error.flatten()

    } else{
        const user = await db.user.findUnique({
            where:{
                email:result.data.email
            },
            select:{
                id:true,
                password:true,
            }
        })
        const ok = await bcrypt.compare(result.data.password,user.password)
        if(ok){
            const session = await getSession()
            session.id = user!.id
            await session.save()
            redirect("/")
        } else{
            return{
                fieldErrors:{
                    password: ["Wrong password"],
                    email: ["wrong email"]
                }
            }
        }
    }
}