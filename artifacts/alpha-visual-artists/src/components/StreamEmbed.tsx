import { useState } from "react";
import { Volume2 } from "lucide-react";
import { STREAM_CUSTOMER_HOST } from "@/config/streamVideos";

export type StreamEmbedProps = {
  videoId: string;
  label: string;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  showUnmuteButton?: boolean;
};

export function StreamEmbed({
  videoId,
  label,
  autoplay = false,
  muted = true,
  className = "",
  showUnmuteButton = true,
}: StreamEmbedProps) {
  const [userUnmuted, setUserUnmuted] = useState(false);
  const isMuted = muted && !userUnmuted;

  const params = new URLSearchParams({
    muted: String(isMuted),
    preload: "true",
    controls: "true",
  });
  if (autoplay) {
    params.set("autoplay", "true");
  }

  const src = `https://${STREAM_CUSTOMER_HOST}/${videoId}/iframe?${params.toString()}`;

  return (
    <div className={`stream-embed ${className}`.trim()} aria-label={label}>
      <iframe
        key={isMuted ? "muted" : "unmuted"}
        src={src}
        title={label}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
      {showUnmuteButton && isMuted && autoplay ? (
        <button
          type="button"
          onClick={() => setUserUnmuted(true)}
          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-black/90 hover:ring-primary/50"
          aria-label={`Unmute ${label}`}
        >
          <Volume2 className="h-4 w-4 text-primary" aria-hidden />
          Unmute
        </button>
      ) : null}
    </div>
  );
}
