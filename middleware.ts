import { NextRequest, NextResponse } from "next/server"
import getSession from "./lib/session"
import { redirect } from "next/navigation";

interface Routes{
    [key:string] :boolean
}
const publiconlyUrls:Routes = {
    "/login":true,
    "/create-account":true,
    "/":true

}

export async function middleware(request:NextRequest) {
    // const session = await getSession()
    // const exissts = publiconlyUrls[request.nextUrl.pathname]
    // if(!session.id) {
    //     if(!exissts){
    //         return NextResponse.redirect(new URL("/",request.url))
    //     }
    // }else{
    //     if(exissts){
    //         return NextResponse.redirect(new URL("/diary",request.url))
    //     }
    // }
    
}