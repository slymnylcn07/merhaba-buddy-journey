import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trackEvent } from "@/hooks/use-google-analytics";
import { cn } from "@/lib/utils";

interface ArticleProductDemoProps {
  slug: string;
  productHandle: string;
  placement: "mid_article" | "article_end";
  ctaVariant: string;
  src: string;
  poster: string;
  title?: string;
  triggerLabel?: string;
  className?: string;
}

/** The supplied clip is never mounted or requested until its trigger is chosen. */
export function ArticleProductDemo({
  title = "FlexiKnee in use",
  triggerLabel = "Watch it in use",
  className,
  ...props
}: ArticleProductDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          data-article-product-demo="trigger"
          aria-label={`Watch product video: ${title}`}
          className={cn(
            "group absolute inset-0 z-10 h-full w-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-600",
            className,
          )}
        >
          <span className="absolute bottom-3 left-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/60 bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-slate-950 shadow-lg backdrop-blur-sm transition group-hover:bg-white motion-reduce:transition-none">
            <Play aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
            {triggerLabel}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        data-article-product-demo="dialog"
        className="w-[calc(100%-1.5rem)] max-w-[420px] gap-0 overflow-y-auto rounded-2xl border-slate-200 bg-white p-0 shadow-2xl [&>button]:right-2 [&>button]:top-2 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-slate-100 [&>button]:text-slate-700 [&>button]:opacity-100 [&>button:hover]:bg-slate-200 [&>button>svg]:h-5 [&>button>svg]:w-5"
        style={{
          maxHeight:
            "calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 2rem)",
        }}
      >
        <div className="min-h-[60px] py-5 pl-5 pr-16">
          <DialogTitle className="text-base font-semibold leading-5 text-slate-950">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Optional product video with playback and sound controls. Close it to
            return to the guide.
          </DialogDescription>
        </div>

        {open && <ProductDemoVideo {...props} title={title} />}

        <p className="px-4 py-3 text-center text-xs leading-5 text-slate-500">
          Pause any time. Turn sound on using the video controls.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function ProductDemoVideo({
  slug,
  productHandle,
  placement,
  ctaVariant,
  src,
  poster,
  title,
}: Omit<ArticleProductDemoProps, "className">) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStarted = useRef(false);
  const hasCompleted = useRef(false);
  const reachedMilestones = useRef(new Set<number>());
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    // This component only mounts after a click. Native controls remain usable
    // if the browser declines playback, including an iOS user-gesture policy.
    // Restoring src also makes the effect safe under StrictMode's setup cycle.
    if (video) {
      if (video.getAttribute("src") !== src) video.setAttribute("src", src);
      void video.play().catch(() => undefined);
    }
    return () => {
      // Explicitly stop playback and release the request even during the
      // dialog's closing animation or a route change.
      if (!video) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  function watchedFraction(video: HTMLVideoElement) {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;
    let playedSeconds = 0;
    for (let index = 0; index < video.played.length; index += 1) {
      playedSeconds += video.played.end(index) - video.played.start(index);
    }
    // Native played ranges exclude gaps skipped with the seek control and
    // merge repeated sections, unlike currentTime / duration.
    return Math.min(1, playedSeconds / video.duration);
  }

  function sendVideoEvent(
    name: "video_start" | "video_progress" | "video_complete",
    video: HTMLVideoElement,
    percent: number,
  ) {
    trackEvent(name, {
      content_slug: slug,
      product_handle: productHandle,
      placement,
      cta_variant: ctaVariant,
      interaction_type: "video",
      video_provider: "self_hosted",
      video_title: title,
      video_url: src,
      video_duration: Number.isFinite(video.duration)
        ? Math.round(video.duration)
        : undefined,
      video_current_time: Math.round(video.currentTime),
      video_percent: percent,
      video_progress_basis: "unique_played_ranges",
    });
  }

  function recordProgress(video: HTMLVideoElement) {
    if (!hasStarted.current || video.seeking) return;
    const percent = watchedFraction(video) * 100;
    for (const milestone of [25, 50, 75]) {
      if (percent >= milestone && !reachedMilestones.current.has(milestone)) {
        reachedMilestones.current.add(milestone);
        sendVideoEvent("video_progress", video, milestone);
      }
    }
  }

  return (
    <div className="relative bg-slate-950">
      <video
        ref={videoRef}
        data-article-product-demo="video"
        src={src}
        poster={poster}
        aria-label={title}
        className="block w-full object-contain"
        style={{ height: "min(72dvh, 680px)" }}
        controls
        playsInline
        autoPlay
        muted
        preload="none"
        onPlaying={(event) => {
          if (hasStarted.current) return;
          hasStarted.current = true;
          sendVideoEvent("video_start", event.currentTarget, 0);
        }}
        onTimeUpdate={(event) => recordProgress(event.currentTarget)}
        onEnded={(event) => {
          const video = event.currentTarget;
          recordProgress(video);
          if (
            hasStarted.current &&
            !hasCompleted.current &&
            watchedFraction(video) >= 0.98
          ) {
            hasCompleted.current = true;
            sendVideoEvent("video_complete", video, 100);
          }
        }}
        onError={() => setHasError(true)}
      >
        Your browser does not support this video.
      </video>
      {hasError && (
        <p
          role="alert"
          className="absolute inset-x-5 top-1/2 -translate-y-1/2 rounded-xl bg-slate-900 p-4 text-center text-sm leading-6 text-white"
        >
          This video could not load. Close it to continue reading the guide.
        </p>
      )}
    </div>
  );
}
