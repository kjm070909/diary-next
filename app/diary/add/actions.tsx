"use server"

import { z } from "zod"

const diaryschema = z.object({
    photo:z.string({
        required_error:"photo is required"
    }),
    title:z.string({
        required_error:"title is required"
    }),
    descri
})

export async function uploadtDiaru(_:any,formdata:FormData) {
    
}