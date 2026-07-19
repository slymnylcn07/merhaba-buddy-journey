import { forwardRef, type ImgHTMLAttributes } from "react";

export interface ResponsiveImageSource {
  srcSet: string;
  type?: "image/avif" | "image/webp" | string;
  media?: string;
  sizes?: string;
}

export interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "loading" | "decoding"> {
  src: string;
  sources?: ResponsiveImageSource[];
  avifSrc?: string;
  webpSrc?: string;
  pictureClassName?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

/**
 * Progressive image wrapper with AVIF/WebP support and safe loading defaults.
 * The regular `src` remains the universal fallback.
 */
export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  (
    {
      src,
      alt,
      sources = [],
      avifSrc,
      webpSrc,
      pictureClassName,
      priority = false,
      loading,
      sizes,
      className,
      ...imageProps
    },
    ref,
  ) => {
    const formatSources: ResponsiveImageSource[] = [
      ...(avifSrc ? [{ srcSet: avifSrc, type: "image/avif" }] : []),
      ...(webpSrc ? [{ srcSet: webpSrc, type: "image/webp" }] : []),
      ...sources,
    ];

    return (
      <picture className={pictureClassName}>
        {formatSources.map((source, index) => (
          <source
            key={`${source.type || "source"}-${source.media || "all"}-${index}`}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
            sizes={source.sizes || sizes}
          />
        ))}
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={className}
          sizes={sizes}
          loading={priority ? "eager" : loading || "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          {...imageProps}
        />
      </picture>
    );
  },
);

ResponsiveImage.displayName = "ResponsiveImage";
