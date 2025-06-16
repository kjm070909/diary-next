"use server";

import { redirect } from "next/navigation";
import db from "@/lib/db";

export async function onDeletediary(id: number) {
  await db.diary.delete({
    where: { id },
  });
  redirect("/somewhere"); // ✅ 삭제 후 이동
}