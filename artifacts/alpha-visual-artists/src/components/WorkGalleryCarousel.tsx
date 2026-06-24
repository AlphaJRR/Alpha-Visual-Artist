import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WORK_GALLERY_SLIDES } from "@/data/workGallerySlides";

function GallerySlide({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  return (
    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-primary font-mono text-[10px] uppercase tracking-widest">
          {category}
        </span>
        <p className="text-white/80 text-sm mt-1 line-clamp-2">{alt}</p>
      </div>
    </div>
  );
}

export function WorkGalleryCarousel() {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full mb-10">
      <CarouselContent className="-ml-3">
        {WORK_GALLERY_SLIDES.map((slide) => (
          <CarouselItem key={slide.src} className="pl-3 basis-full">
            <GallerySlide
              src={slide.src}
              alt={slide.alt}
              category={slide.category}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-4 border-white/20 bg-black/80 text-white hover:bg-black" />
      <CarouselNext className="hidden sm:flex -right-4 border-white/20 bg-black/80 text-white hover:bg-black" />
    </Carousel>
  );
}
