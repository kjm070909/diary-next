import ListDiaru from "@/components/list-diary";
import db from "@/lib/db";
import getSession from "@/lib/session";
import sun from "@/public/dadaepo-beach-2826171_1920.jpg";
import Image from "next/image";

async function getmydiary() {
  const session = await getSession();
  try {
    const diary = await db.diary.findMany({
      where: { userId: session.id },
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
    });
    return diary;
  } catch (e) {
    return null;
  }
}

async function Getuser() {
  const session = await getSession();
  try {
    const person = await db.user.findUnique({
      where: { id: session.id },
    });
    return person;
  } catch (e) {
    return null;
  }
}

export default async function Profile() {
  const diary = await getmydiary();
  const user = await Getuser();

  return (
    <div className="relative h-screen text-white overflow-y-auto">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        <Image src={sun} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-pink-900/30 to-orange-100/20" />
      </div>

      {/* 상단 "/diary" 이동 버튼 */}
      <div className="absolute top-4 right-4 z-50">
        <a
          href="/diary"
          className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white/40 transition"
        >
          All Diaries
        </a>
      </div>

      {/* 사용자 정보 */}
      <div className="flex items-center px-8 pt-20 pb-10">
        <div className="h-24 w-24 rounded-full bg-white/30 border-2 border-white backdrop-blur-md shadow-lg flex items-center justify-center text-2xl font-bold text-white">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-5xl ml-6 font-extrabold drop-shadow-lg">{user?.username}</h1>
      </div>

      {/* 일기 제목 */}
      <div className="text-center text-3xl font-serif mb-8 drop-shadow">My Diaries</div>

      {/* 일기 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20">
        {diary?.map((diarys) => (
          <ListDiaru
            veiws={diarys.views}
            Likes={diarys._count.Likes}
            key={diarys.id}
            {...diarys}
          />
        ))}
      </div>
    </div>
  );
}

