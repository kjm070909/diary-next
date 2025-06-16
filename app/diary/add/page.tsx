"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { uploadtDiaru } from "./actions";
import Inputs from "@/components/input";
import Button from "@/components/button";
import sun from "@/public/dadaepo-beach-2826171_1920.jpg";
import Image from "next/image";

export default function AddDiary() {
  const [preview, setPreview] = useState("");
  const [state, action] = useFormState(uploadtDiaru, null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) return;
    const url = URL.createObjectURL(files[0]);
    setPreview(url);
  };

  return (
    <div className="relative min-h-screen">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={sun}
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* 배경 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-pink-700/40 to-orange-100/30" />
      </div>

      {/* 폼 내용 */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <form
          action={action}
          className="w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 border border-white/30"
        >
          <h1 className="text-4xl font-bold text-rose-50 text-center drop-shadow-lg">🌅 Our Diary</h1>

          <Inputs
            className="border rounded-md bg-white/30 border-white/50 text-gray-900 placeholder-gray-600"
            name="title"
            required
            placeholder="제목"
            type="text"
            errors={state?.fieldErrors.title}
          />

          <textarea
            name="description"
            required
            placeholder="자세한 설명"
            className="w-full h-48 p-4 text-[16px] leading-relaxed text-gray-900 font-serif placeholder-gray-500 bg-white/30 border border-white/40 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />

          {/* 이미지 업로드 미리보기 */}
          <div className="flex justify-center">
            <label
              htmlFor="photo"
              className="w-60 h-60 border-2 border-dashed border-white/60 rounded-xl flex items-center justify-center bg-center bg-cover text-white text-sm cursor-pointer transition hover:scale-105 duration-300"
              style={{
                backgroundImage: preview ? `url(${preview})` : undefined,
              }}
            >
              {preview === "" ? (
                <div className="text-center text-white/80">
                  📷 사진을 추가해주세요
                  <div className="text-red-300 text-sm mt-1">{state?.fieldErrors.photo}</div>
                </div>
              ) : null}
            </label>
            <input
              onChange={onImageChange}
              id="photo"
              type="file"
              name="photo"
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="text-center">
            <Button  className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded-xl text-lg shadow-lg transition duration-300" text="작성 완료" />
          </div>
        </form>
      </div>
    </div>
  );
}
