import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PODCAST_COVERS, type PodcastCover } from "@/data/podcastCovers";

function CoverSlide({ cover }: { cover: PodcastCover }) {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
      <img
        src={cover.coverSrc}
        alt={`${cover.title} — ${cover.guest}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-primary font-mono text-[10px] uppercase tracking-widest mb-1">
          {cover.comingSoon ? "Coming Soon" : "Original Production"}
        </div>
        <h4 className="text-lg font-bold text-white leading-tight">{cover.title}</h4>
        <p className="text-white/60 text-sm">{cover.guest}</p>
      </div>
    </div>
  );
}

export function PodcastCoverCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-3">
        {PODCAST_COVERS.map((cover) => (
          <CarouselItem key={cover.slug} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
            <CoverSlide cover={cover} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-4 border-white/20 bg-black/80 text-white hover:bg-black" />
      <CarouselNext className="hidden sm:flex -right-4 border-white/20 bg-black/80 text-white hover:bg-black" />
    </Carousel>
  );
}
