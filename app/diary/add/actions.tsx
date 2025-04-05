"use server"
import db from "@/lib/db"
import getSession from "@/lib/session"
import fs from "fs/promises"
import { redirect } from "next/navigation"


import { z } from "zod"

const diaryschema = z.object({
    photo:z.string({
        required_error:"photo is required"
    }),
    title:z.string({
        required_error:"title is required"
    }),
    description: z.string({
        required_error: "Description is required",
      }),
})

export async function uploadtDiaru(_:any,formdata:FormData) {
    const data = {
        photo: formdata.get("photo"),
        title: formdata.get("title"),
        description: formdata.get("description"),
    }
    if(data.photo instanceof File) {
        const photoData = await data.photo.arrayBuffer()
        await fs.appendFile(`./public/${data.photo.name}`,Buffer.from(photoData))
        data.photo = `/${data.photo.name}`
    }
    const result = diaryschema.safeParse(data)
    console.log(result)
    if(!result.success) {
        console.log('NO')
        return result.error.flatten()
       
    } else{
        const session = await getSession()
        if(session.id) {
            console.log("success")
            const product = await db.diary.create({
                data:{
                    title:result.data.title,
                    description:result.data.description,
                    photo:result.data.photo,
                    user:{
                        connect:{
                            id:session.id,
                        }
                    }
                },
                select:{
                    id:true
                }
            })
            redirect("/diary")
        }
    }
}