"use server"

import { z } from "zod";
import db from "@/lib/db"
import bcrypt from "bcrypt"
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkUniqueUsername = async(username:string) =>{
    const user = await db.user.findUnique({
        where:{
            username,
        },
        select:{
            id:true
        }
    })
    return !Boolean(user)
}

const checkPassword = ({
    password,
    confirm_password,
}:{
    password:string;
    confirm_password:string;
}) => password === confirm_password;

const checkUniqueEmail = async (email:string) => {
    const user = await db.user.findUnique({
        where:{
            email,
        },
        select:{
            id:true,
        }
    })
    return !Boolean(user)
}


const formshema = z.object({
    username:z.string({
        invalid_type_error:"username must be a string",
        required_error:"No username"
    })
    .toLowerCase()
    .trim()
    .refine(checkUniqueUsername,"this is username is aleady taken"),
    email:z.string()
    .email()
    .toLowerCase()
    .refine(checkUniqueEmail,"aleady email"),
    password:z.string().min(5),
    confirm_password:z.string().min(5),
}).refine(checkPassword,"NO password same")


export async function createAccount(prevState:any,formData:FormData) {
    const data = {
        username:formData.get("username"),
        email:formData.get("email"),
        password:formData.get("password"),
        confirm_password:formData.get("confirm_password"),
    }
    const result = await formshema.safeParseAsync(data)
    if (!result.success){
        return result.error.flatten()
    }else{
        const hashedPassword = await bcrypt.hash(result.data.password,12)
        const user = await db.user.create({
            data:{
                username:result.data.username,
                email:result.data.email,
                password:hashedPassword,
            }
        })
        const session = await getSession()
        session.id = user.id
        await session.save()
        redirect("/login")
    }
    
}