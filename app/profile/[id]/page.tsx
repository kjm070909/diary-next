import ListDiaru from "@/components/list-diary";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import sun from "@/public/dadaepo-beach-2826171_1920.jpg";
import Image from "next/image";

async function getUser(id: number) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (e) {
    return null;
  }
}

async function getUserDiary(id: number) {
  try {
    const diarys = await db.diary.findMany({
      where: {
        userId: id,
      },
      select: {
        title: true,
        user:true,
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
    return diarys;
  } catch (e) {
    return null;
  }
}

export default async function UsersProfile({ params }: { params: { id: string } }) {
  const ids = Number(params.id);
  if (isNaN(ids)) return notFound();

  const user = await getUser(ids);
  if (!user) return notFound(); // ❗ 먼저 null 체크

  const userDiary = await getUserDiary(user.id); // ✅ 이 시점에 user는 안전하게 사용 가능

  return (
    <div className="relative h-screen text-white overflow-y-auto">
      {/* 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        <Image src={sun} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-pink-900/30 to-orange-100/20" />
      </div>

      {/* 사용자 정보 */}
      <div className="flex items-center px-8 pt-20 pb-10">
        <div className="h-24 w-24 rounded-full bg-white/30 border-2 border-white backdrop-blur-md shadow-lg flex items-center justify-center text-2xl font-bold text-white">
          {user.username?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-5xl ml-6 font-extrabold drop-shadow-lg">{user.username}</h1>
      </div>

      {/* 일기 제목 */}
      <div className="text-center text-3xl font-serif mb-8 drop-shadow">User's Diaries</div>

      {/* 일기 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20">
        {userDiary?.map((diarys) => (
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

