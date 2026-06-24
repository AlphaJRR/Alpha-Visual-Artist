import { StreamEmbed } from "@/components/StreamEmbed";

type BioStreamEmbedProps = {
  videoId: string;
  label: string;
};

export function BioStreamEmbed({ videoId, label }: BioStreamEmbedProps) {
  return <StreamEmbed videoId={videoId} label={label} />;
}
