import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const videoReviews = [
  { id: 1, src: "/videos/customer-review-1.mp4", title: "Evening comfort routine", tag: "Home use" },
  { id: 2, src: "/videos/customer-review-2.mp4", title: "After-walk wind down", tag: "Daily routine" },
  { id: 3, src: "/videos/customer-review-3.mp4", title: "Simple touch controls", tag: "Product demo" },
  { id: 4, src: "/videos/customer-review-4.mp4", title: "Wireless use at home", tag: "Real routine" },
  { id: 5, src: "/videos/customer-review-5.mp4", title: "Short comfort session", tag: "UGC" },
];

export const VideoReviews = () => {
  return (
    <section className="bg-slate-950 py-18 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Real routines</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
              See FlexiKnee in everyday use.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Short vertical videos sit directly under the product area, so shoppers see the device in motion before the deeper feature sections.
          </p>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:thin]">
          {videoReviews.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoCard = ({ video }: { video: typeof videoReviews[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <article className="w-[235px] flex-none md:w-[270px]">
      <button
        type="button"
        onClick={handleVideoClick}
        className="group relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30"
      >
        <video
          ref={videoRef}
          src={video.src}
          className="h-full w-full object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            e.currentTarget.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          }}
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-left">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            {video.tag}
          </span>
          <h3 className="mt-3 text-base font-semibold leading-tight text-white">{video.title}</h3>
        </div>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-xl">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </div>
        )}

        <span
          onClick={toggleMute}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 opacity-100 shadow-lg transition md:opacity-0 md:group-hover:opacity-100"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </span>
      </button>
    </article>
  );
};
