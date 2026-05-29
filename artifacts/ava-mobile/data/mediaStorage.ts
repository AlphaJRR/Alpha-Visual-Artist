import {
  featuredPhotoStorageUri,
  wallpaperStorageUri,
} from "@/constants/site";

export type FeaturedPhotoItem = {
  id: string;
  uri: string;
  title: string;
};

export type WallpaperItem = {
  id: string;
  uri: string;
  name: string;
};

export const FEATURED_PHOTO_COUNT = 24;
export const WALLPAPER_COUNT = 52;

export const FEATURED_PHOTOS: FeaturedPhotoItem[] = Array.from(
  { length: FEATURED_PHOTO_COUNT },
  (_, i) => {
    const n = i + 1;
    const filename = `photo-${n}.jpg`;
    return {
      id: `photo-${n}`,
      uri: featuredPhotoStorageUri(filename),
      title: `Photo ${n}`,
    };
  },
);

export const WALLPAPERS: WallpaperItem[] = Array.from(
  { length: WALLPAPER_COUNT },
  (_, i) => {
    const n = i + 1;
    const filename = `wallpaper-${n}.jpg`;
    return {
      id: `wallpaper-${n}`,
      uri: wallpaperStorageUri(filename),
      name: `Wallpaper ${n}`,
    };
  },
);
