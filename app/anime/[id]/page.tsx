import Image from "next/image";
import { fetchAnime } from "../../actions";
import { AnimeProp } from "@/components/AnimeCard";

async function AnimeDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // In a real app, we would fetch single anime details. 
  // For now, we'll use the API to get data or just assume we have the ID.
  const response = await fetch(`https://shikimori.one/api/animes/${id}`);
  const anime: AnimeProp = await response.json();

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10 items-center">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        <div className="relative w-full md:w-1/3 h-[50vh]">
          <Image
            src={`https://shikimori.one${anime.image.original}`}
            alt={anime.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 md:w-2/3">
          <h1 className="text-5xl text-white font-bold">{anime.name}</h1>
          <div className="flex gap-4 items-center">
             <div className="py-1 px-2 bg-[#161921] rounded-sm">
              <p className="text-white text-sm font-bold capitalize">
                {anime.kind}
              </p>
            </div>
            <p className="text-base text-white font-bold">
              Episodes: {anime.episodes || anime.episodes_aired}
            </p>
            <p className="text-base font-bold text-[#FFAD49]">Score: {anime.score}</p>
          </div>
          
          <div className="mt-5">
            <h2 className="text-2xl text-white font-bold mb-4">Watch Now</h2>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
              {/* Using vidsrc.to as an example embedding service */}
              <iframe
                src={`https://vidsrc.to/embed/anime/${id}`}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AnimeDetail;
