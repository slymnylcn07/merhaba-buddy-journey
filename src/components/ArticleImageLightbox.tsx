import { useEffect, useState } from "react";
import { RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";

type SelectedImage = {
  src: string;
  alt: string;
  caption: string;
};

interface ArticleImageLightboxProps {
  articleSlug: string;
  containerId?: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 3;
const SCALE_STEP = 0.5;

export function ArticleImageLightbox({
  articleSlug,
  containerId = "article-content",
}: ArticleImageLightboxProps) {
  const [selected, setSelected] = useState<SelectedImage | null>(null);
  const [scale, setScale] = useState(MIN_SCALE);

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;

    const cleanups: Array<() => void> = [];

    const enhanceImage = (image: HTMLImageElement) => {
      if (image.dataset.articleImageEnhanced === "true") return;
      image.dataset.articleImageEnhanced = "true";
      image.loading = "lazy";
      image.decoding = "async";
      image.classList.add("cursor-zoom-in");
      image.tabIndex = 0;
      image.setAttribute("role", "button");

      const getCaption = () =>
        image.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || "";

      const updateDimensions = () => {
        if (!image.hasAttribute("width") && image.naturalWidth > 0) {
          image.setAttribute("width", String(image.naturalWidth));
        }
        if (!image.hasAttribute("height") && image.naturalHeight > 0) {
          image.setAttribute("height", String(image.naturalHeight));
        }
      };

      const openImage = () => {
        setScale(MIN_SCALE);
        setSelected({
          src: image.currentSrc || image.src,
          alt: image.alt || "Article illustration",
          caption: getCaption(),
        });
      };

      const onClick = (event: MouseEvent) => {
        if (image.closest("a")) return;
        event.preventDefault();
        openImage();
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openImage();
        }
      };

      const label = image.alt || getCaption() || "article image";
      image.setAttribute("aria-label", `Open enlarged image: ${label}`);

      if (image.complete) updateDimensions();
      image.addEventListener("load", updateDimensions);
      image.addEventListener("click", onClick);
      image.addEventListener("keydown", onKeyDown);

      cleanups.push(() => {
        image.removeEventListener("load", updateDimensions);
        image.removeEventListener("click", onClick);
        image.removeEventListener("keydown", onKeyDown);
        delete image.dataset.articleImageEnhanced;
        image.classList.remove("cursor-zoom-in");
        image.removeAttribute("role");
        image.removeAttribute("tabindex");
        image.removeAttribute("aria-label");
      });
    };

    root.querySelectorAll<HTMLImageElement>("img").forEach(enhanceImage);

    const observer = new MutationObserver(() => {
      root.querySelectorAll<HTMLImageElement>("img").forEach(enhanceImage);
    });
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [articleSlug, containerId]);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "+" || event.key === "=") {
        setScale((value) => Math.min(MAX_SCALE, value + SCALE_STEP));
      }
      if (event.key === "-") {
        setScale((value) => Math.max(MIN_SCALE, value - SCALE_STEP));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={selected.alt}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) setSelected(null);
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 pb-3 text-white">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{selected.alt}</p>
          <p className="text-xs text-slate-300">Use the controls to zoom, then scroll to inspect details.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((value) => Math.max(MIN_SCALE, value - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 disabled:opacity-40"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setScale((value) => Math.min(MAX_SCALE, value + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 disabled:opacity-40"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setScale(MIN_SCALE)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10"
            aria-label="Reset zoom"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950"
            aria-label="Close enlarged image"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-2xl bg-white/5">
        <div className="flex min-h-full min-w-full items-center justify-center p-3 sm:p-6">
          <img
            src={selected.src}
            alt={selected.alt}
            className="block max-h-[82vh] max-w-[94vw] select-none object-contain transition-transform duration-150"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              touchAction: "pan-x pan-y pinch-zoom",
            }}
            draggable={false}
          />
        </div>
      </div>

      {selected.caption && (
        <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-6 text-slate-200">
          {selected.caption}
        </p>
      )}
    </div>
  );
}
