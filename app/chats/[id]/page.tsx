import ChatMessagesList from "@/components/chat-messages-list"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { Prisma } from "@prisma/client"
import { notFound } from "next/navigation"


async function getRoom(id:string) {
    const room = await db.chatroom.findUnique({
        where:{
            id
        },
        include:{
            users:{
                select:{id:true}
            }
        }
    })
    if (room) {
        const session = await getSession()
        const canSee = Boolean( room.users.find(user => user.id === session.id))
       if (!canSee) {
        return null
       }
    }
    
    return room
}

async function getMesssages(chatRoomId:string) {
    const messages = await db.message.findMany({
        where:{
            chatRoomId,
        },
        select:{
            id:true,
            payload:true,
            created_at:true,
            userId:true,
            user:{
                select:{
                    username:true
                }
            }
        }
    })
    return messages
}

export type initialchatMessages = Prisma.PromiseReturnType<typeof getMesssages>


export default async function Chatroom({params}: {params:{id:string}}) {
    const room = await getRoom(params.id)
    if (!room){
        return notFound()
    }
    const initiaMessages = await getMesssages(params.id)
    
    const session = await getSession()
    return <div className="bg-black">
<ChatMessagesList chatRoomId={params.id} userId={session.id!} initialMessages={initiaMessages} />

    </div>  
  
}