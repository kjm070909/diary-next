"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { uploadtDiaru } from "./actions";





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
        <div>
            <form action={action}>
                <label htmlFor="photo" style={{backgroundImage:`url(${preview})`}}>
                    {preview === ""? (<>
                    <div>사진을 추가해주세요</div>
                    {state!.fieldErrors.photo}
                    </>):null}
                </label>

            </form>
            <input
            onChange={onImagechange}
            type="file"
            name="photo"
            
            />
        </div>
    )
}