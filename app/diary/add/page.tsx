"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { uploadtDiaru } from "./actions";
import Inputs from "@/components/input";
import Button from "@/components/button";






export default function AddDiary(){
    const [preview,setPreview] = useState("")
    const onImagechange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {
            target:{files},
        } = event;
        if (!files){
            return;
        }
        const file = files[0]
        const url = URL.createObjectURL(file)
        setPreview(url)

    }
    const [state,action] = useFormState(uploadtDiaru,null)
    return(
        <div className="text-black">
            <form action={action}>
                <label htmlFor="photo" className="h-60 border-2 aspect-square flex items-center justify-center flex-col  border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover" style={{backgroundImage:`url(${preview})`}}>
                    {preview === ""? (<>
                    <div>사진을 추가해주세요</div>
                    {state?.fieldErrors.photo}
                    </>):null}
                </label>
                <input
            onChange={onImagechange}
            id="photo"
            type="file"
            name="photo"
            accept="image/*"
            className="hidden"
            />
        <Inputs
          name="title"
          required
          placeholder="제목"
          type="text"
          errors={state?.fieldErrors.title}
        />

        <Inputs
          name="description"
          type="text"
          required
          placeholder="자세한 설명"
          errors={state?.fieldErrors.description}
        />
        <Button text="작성 완료" />
            </form>
           
        </div>
    )
}