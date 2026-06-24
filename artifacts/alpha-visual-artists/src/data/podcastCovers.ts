export type PodcastCover = {
  slug: string;
  title: string;
  guest: string;
  /** Path under public/ — drop new covers into public/assets/podcasts/ */
  coverSrc: string;
  comingSoon?: boolean;
};

/**
 * Podcast cover art — add images to public/assets/podcasts/ and extend this list.
 */
export const PODCAST_COVERS: PodcastCover[] = [
  {
    slug: "dhc-live-kirk-franklin",
    title: "DHC LIVE",
    guest: "Kirk Franklin",
    coverSrc: "/assets/podcasts/dhc-live-kirk-franklin.jpg",
  },
  {
    slug: "second-half-arne-duncan",
    title: "Second Half Podcast",
    guest: "Arne Duncan",
    coverSrc: "/assets/podcasts/second-half-arne-duncan.jpg",
  },
  {
    slug: "business-breakthrough-renee-rose",
    title: "Business Breakthrough",
    guest: "Renee Rose",
    coverSrc: "/assets/podcasts/business-breakthrough-renee-rose.jpg",
    comingSoon: true,
  },
];
