import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache , revalidateTag  } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { useState } from "react";

// import { onDeletediary } from "./actions";
async function getDiary(id: number) {
  try {
    const diary = await db.diary.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            Product:true,
            id:true
          },
        },
        // _count: {
        //   select: {
        //     // Likes: true,
        //   },
        // },
      },
    });

    return diary;
  } catch (e) {
    return null;
  }
}

const cachedDiary = nextCache(getDiary,
  ["diary-detail"],
  {tags:["diary-detail"],revalidate:60})

async function getLikestatus(diaryId: number,userId:number) {
  
  const isliked = await db.likes.findUnique({
    where: {
      id: {
        diaryId,
        userId
        
      },
    },
  });
  const likeCount = await db.likes.count({
    where:{
      diaryId
    }
  })
 
 return{ likeCount, isliked: Boolean(isliked) }
}

function getCachedLikeStatus(postId:number,userId: number){
  const getresultlike = nextCache(getLikestatus,["diary-like-status"],{tags:[`like-status-${postId}`]})
  return getresultlike(postId,userId)
}





export default async function DiaryDetail({ params }: { params: {id:number} }) {
  const id = Number(params.id)
  
  if (isNaN(id)) return notFound();

  const diary = await cachedDiary(id);

  if (!diary) return(
    notFound()

  );

  
  const liked = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.likes.create({
        data: {
          diaryId: id,
          userId: session.id!,
        },
      });
      revalidateTag(`like-status-${id}`)
    } catch (e) {}
  };

  const onDeletediary = async () =>{
    "use server";
    // const session = await getSession()
    try{
      await db.diary.delete({
        where:{
          id
        }
      })
      redirect("/")
    } catch(e){}
  }

  const noliked = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.likes.delete({
        where: {
          id: {
            diaryId: id,
            userId: session.id!,
          },
        },
      });
    
      
    revalidateTag(`like-status-${id}`)
   
    } catch (e) {}
  };

  const session = await getSession();
  const userid = session.id!;
  const {likeCount,isliked} = await getCachedLikeStatus(id,userid);
// console.log(diary.user.Product)

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-b from-purple-900 via-pink-700 to-orange-500 text-white">
      <div className="relative w-full h-[400px]">
        <Image
          src={diary.photo}
          alt={diary.title}
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{diary.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-10 px-6">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
  {/* 작성자 정보 */}
  <Link href={`/profile/${diary.user.id}`}>
      <div className="flex items-center gap-2 text-white/80">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-pink-300"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 2a5 5 0 00-3.535 8.535A7.002 7.002 0 003 17h2a5 5 0 0110 0h2a7.002 7.002 0 00-3.465-6.465A5 5 0 0010 2z" />
    </svg>

    <span className="font-semibold"   >{diary.user.username}</span>

  </div>
  </Link>
        <div>
      {userid === diary.user.id ? (<form action={onDeletediary} >
        <button type="submit">Delete</button>
      </form>):(<p></p>)}
    </div>

  {/* 좋아요와 조회수 */}
  <div className="flex items-center gap-6">
<div className="flex gap-2 items-center">
  <form action={isliked ? noliked : liked}>
    <button
      type="submit"
      className={`text-2xl transition ${
        isliked ? "text-red-400 hover:text-red-600" : "text-gray-300 hover:text-white"
      }`}
    >
      {isliked ? "❤️" : "🤍"}
    </button>
  </form>
  <span>{likeCount} Likes</span>
</div>
    <span className="text-sm text-gray-300">{diary.views} views</span>
  </div>
</div>


        <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <pre className="whitespace-pre-line font-sans text-lg leading-relaxed">
  {diary.description}
</pre>
        </div>
      </div>
    </div>
  );
}
