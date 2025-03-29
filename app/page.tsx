import Image from "next/image";
import see from "@/public/Our Diary.png"
import classes from "./main.module.css";
import Link from "next/link";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession()
  if(session.id) {
    const user = await db.user.findUnique({
      where:{
        id:session.id,
      },
    })
    if (user){
      return user
    }
  }
  // redirect("/login")
  notFound()
  
}



export default async function Home() {
  const user = await getUser()
  const logout = async() => {
    "use server"
    const session = await getSession()
    await session.destroy()
    redirect("/login")
  }
  return (
    
    <div className=" flex flex-col items-center font-serif m-auto ">
      <Image src={see} className={classes.img}  fill alt="backgrou'ng"></Image>
      <div>
        <div className="text-[20px]  items-center m-auto flex justify-center">WELCOME TO</div>
        <h1 className="text-[100px] ">{user.username}Our Diary</h1>
        <Link href="/create-account"><div className="justify-center flex bg-white text-black ">Lets Write</div></Link>
        
      </div>
      <form action={logout}>
        <button>LOG OUT</button>
      </form>
      </div>
  );
}
