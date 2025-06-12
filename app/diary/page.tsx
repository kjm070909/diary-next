import db from "@/lib/db"
import sun from "@/public/dadaepo-beach-2826171_1920.jpg"
import Image from "next/image"
import Link from "next/link"

async function getDiary() {
  const diary = await db.diary.findMany({
    select: {
      title: true,
      create_at: true,
      photo: true,
      id: true,
      views: true,
      _count: {
        select: {
          Likes: true,
        },
      },
    },
  })
  return diary
}

export default async function Diary() {
  const diarys = await getDiary();

  return (
    <div className="relative h-screen overflow-y-auto">
      {/* 전체 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={sun}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-pink-600/40 to-orange-300/20" />
      </div>

      {/* 상단 좌측 홈 이동 버튼 */}
      <div className="absolute top-4 left-4 z-50">
        <Link
          href="/"
          className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white/40 transition"
        >
          Home
        </Link>
      </div>

      {/* 상단 우측 프로필 이동 버튼 */}
      <div className="absolute top-4 right-4 z-50">
        <Link
          href="/profile"
          className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white/40 transition"
        >
          My Profile
        </Link>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 pb-32 px-4">
        <h1 className="text-4xl text-white font-bold text-center mt-10 drop-shadow-lg">Our Diaries</h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diarys.map((diary) => (
            <div
              key={diary.id}
              className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-6 hover:scale-105 transform transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={diary.photo || "/default-image.jpg"}
                  alt={diary.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-sm shadow-md">
                  ❤️ {diary._count.Likes}
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white truncate">{diary.title}</h2>
              <p className="text-sm text-white/70 mb-2">
                {new Date(diary.create_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-white/60">{diary.views} views</p>
              <Link
                href={`/diary/${diary.id}`}
                className="mt-3 inline-block text-pink-200 hover:text-pink-400 transition"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* + 버튼 */}
      <Link
        href="/diary/add"
        className="fixed pb-2 z-50 bottom-8 right-8 w-16 h-16 bg-black text-white text-4xl rounded-full flex items-center justify-center shadow-xl hover:bg-orange-500 transition duration-300 transform hover:scale-110"
      >
        +
      </Link>
    </div>
  );
}
