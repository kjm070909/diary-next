import Image from "next/image";
import Link from "next/link";


interface ListDiaryProps{
    title:string;
   
    create_at:Date;
    photo:string;
    id:number
}


export default function ListDiaru({title,create_at,photo,id}:ListDiaryProps) {
    return(
        <Link href={`/diary/${id}`}>
            <div>
                <Image src={photo} alt={title} width={20} height={20} />
            </div>
            <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {create_at.toString()}
        </span>
        <span className="text-lg font-semibold">{}</span>
      </div>
        </Link>
    )
}