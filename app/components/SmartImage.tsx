"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface SmartImageProps {
  image: any;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export default function SmartImage({
  image,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  sizes,
}: SmartImageProps) {
  // Get blur placeholder from image metadata
  const blurDataURL = image?.asset?.metadata?.lqip || null;

  // Build URL
  const imageUrl = image
    ? fill
      ? urlFor(image).width(1200).height(800).url()
      : urlFor(image).width(width || 800).height(height || 600).url()
    : null;

  if (!imageUrl) {
    // Return a placeholder if no image
    return (
      <div
        className={`smart-image-placeholder ${className || ""}`}
        style={{
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
          backgroundColor: "var(--color-border)",
        }}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      blurDataURL={blurDataURL || undefined}
      placeholder={blurDataURL ? "blur" : "empty"}
      style={{
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}
