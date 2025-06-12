import { InputHTMLAttributes } from "react";

interface InputProps {
    name: string;
    errors?: string[];
  }

export default function Inputs({
    name,
    errors=[],
    ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>){
    return(
        <div>
            <input 
            name={name}
            className="text-black"
            {...rest}
            />
            {errors.map((error,index)=>(
                <span className="" key={index}>{error}</span>
            ))}
        </div>
    )

}