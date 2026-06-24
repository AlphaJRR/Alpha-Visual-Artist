export type WorkVideo = {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
};

export type WorkPhoto = {
  src: string;
  alt: string;
  category: string;
};

export const workVideos: WorkVideo[] = [
  { id: "z8KhuI-PJ1A", title: "BIG DREAMS Take Time", category: "Featured Work", featured: true },
  { id: "SfcrH9vAKl4", title: "BET LIVE RECAP 2025", category: "Events" },
  { id: "UPbCsfAojts", title: "BET Anniversary Dinner Recap", category: "Events" },
  { id: "fj_QuQBB_EU", title: "A Winter Night Downtown Chicago", category: "Short-Form" },
  { id: "PH0hlbI9ML0", title: "Steezy Press Kit 2025", category: "Commercials" },
  { id: "pBN54Toj2Jg", title: "MBK Alliance Chicago 2025 Recap", category: "Events" },
  { id: "mlimVQOtW2I", title: "Triple Crown Ribbon Cutting Ceremony 2025", category: "Commercials" },
  { id: "mRrkokMD8Xc", title: "Waymaker Recap Video 2024", category: "Events" },
];

/** Full gallery — extend with new paths under public/wallpapers/ or src/assets */
export const workPhotos: WorkPhoto[] = [
  { src: "/wallpapers/JRR01295.JPG", alt: "Event portrait — Chicago", category: "Events" },
  { src: "/wallpapers/GP6A7446.jpg", alt: "Cinematic portrait", category: "Portrait" },
  { src: "/wallpapers/JRR04138.JPG", alt: "On-location production still", category: "BTS" },
  { src: "/wallpapers/IMG_3907.JPG", alt: "Editorial portrait session", category: "Portrait" },
  { src: "/wallpapers/JRR02918.JPG", alt: "Live event coverage", category: "Events" },
  { src: "/wallpapers/GP6A4305.JPG", alt: "Commercial still", category: "Commercial" },
  { src: "/wallpapers/JRR01181.JPG", alt: "Stage performance capture", category: "Events" },
  { src: "/wallpapers/IMG_6738.JPG", alt: "Portrait — natural light", category: "Portrait" },
  { src: "/wallpapers/JRR04373.JPG", alt: "Corporate event recap still", category: "Events" },
  { src: "/wallpapers/IMG_5327.JPG", alt: "Street editorial", category: "Editorial" },
  { src: "/wallpapers/JRR02717.JPG", alt: "Gala coverage", category: "Events" },
  { src: "/wallpapers/IMG_6808.JPG", alt: "Creative portrait", category: "Portrait" },
];

/** Homepage highlight subset */
export const workPhotoHighlights = workPhotos.slice(0, 4);
