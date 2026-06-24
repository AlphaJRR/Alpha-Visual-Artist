const STREAM_CUSTOMER_HOST =
  "customer-fyh68ijrcuys7ag8.cloudflarestream.com";

type BioStreamEmbedProps = {
  videoId: string;
  label: string;
};

export function BioStreamEmbed({ videoId, label }: BioStreamEmbedProps) {
  const src = `https://${STREAM_CUSTOMER_HOST}/${videoId}/iframe?muted=true&preload=true`;

  return (
    <div className="bio-video-block" aria-label={label}>
      <iframe
        src={src}
        title={label}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </div>
  );
}
