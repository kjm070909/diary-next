
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?: number;
  }

export default async function getSession(request: unknown) {
    return getIronSession<SessionContent>(await cookies(),{
        cookieName:"our-diary",
        password:process.env.COOKIE_PASSWORD!,
    })
    
}