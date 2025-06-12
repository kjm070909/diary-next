import Link from "next/link";

interface Props {
  id: string;
  title: string;
  create_at: Date;
  photo: string | null;
  veiws: number;
  Likes: number;
}

export default function ListDiaru({ id, title, create_at, photo, veiws, Likes }: Props) {
  return (
    <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* 사진 */}
      <div className="relative h-48 w-full">
        <img
          src={photo || "/default-image.jpg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded-md">
          ❤️ {Likes}
        </div>
      </div>

      {/* 내용 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
        <p className="text-sm text-white/80 mb-1">{new Date(create_at).toLocaleDateString()}</p>
        <p className="text-sm text-white/70">{veiws} views</p>

        <Link
          href={`/diary/${id}`}
          className="mt-3 inline-block text-pink-200 hover:text-pink-400 transition"
        >
          자세히 보기 →
        </Link>
      </div>
    </div>
  );
}
