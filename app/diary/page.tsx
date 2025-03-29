import ListDiaru from "@/components/list-diary"
import db from "@/lib/db"





async function getDiary() {
    const diary = await db.diary.findMany({
        select:{
            title:true,
            create_at:true,
            photo:true,
            id:true,

        }
    })
    return diary
    
}




export default async function Diary() {
    const diarys = await getDiary()

    return(
        <div>
            {diarys.map((diary) => (<ListDiaru key={diary.id} {...diary} />))}
        </div>
    )
}