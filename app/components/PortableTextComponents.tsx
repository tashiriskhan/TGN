"use client";

import Image from "next/image";
import { PortableText, PortableTextComponents, PortableTextMarkComponentProps } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// Helper function to generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// PortableText types configuration
const portableTextTypes: PortableTextComponents["types"] = {
  image: ({ value }: { value: any }) => {
    const { asset, alt, caption } = value;
    return (
      <figure className="article-image">
        <Image
          src={urlFor(asset).width(800).height(450).url()}
          alt={alt || ""}
          width={800}
          height={450}
        />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  },
};

// PortableText marks configuration
const portableTextMarks: PortableTextComponents["marks"] = {
  link: ({ value, children }: PortableTextMarkComponentProps) => {
    const href = value?.href || "";
    const isExternal = href.startsWith("http") || href.startsWith("https");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-link"
      >
        {children}
      </a>
    );
  },
};

// PortableText blocks configuration
const portableTextBlocks: PortableTextComponents["block"] = {
  h1: ({ value }: { value: any }) => {
    const text = value.children.map((child: any) => child.text).join(" ");
    const id = generateSlug(text);
    return (
      <h1 id={id}>
        {value.children.map((child: any, index: number) => (
          <span key={index}>{child.text}</span>
        ))}
      </h1>
    );
  },
  h2: ({ value }: { value: any }) => {
    const text = value.children.map((child: any) => child.text).join(" ");
    const id = generateSlug(text);
    return (
      <h2 id={id}>
        {value.children.map((child: any, index: number) => (
          <span key={index}>{child.text}</span>
        ))}
      </h2>
    );
  },
  h3: ({ value }: { value: any }) => {
    const text = value.children.map((child: any) => child.text).join(" ");
    const id = generateSlug(text);
    return (
      <h3 id={id}>
        {value.children.map((child: any, index: number) => (
          <span key={index}>{child.text}</span>
        ))}
      </h3>
    );
  },
  h4: ({ value }: { value: any }) => {
    const text = value.children.map((child: any) => child.text).join(" ");
    const id = generateSlug(text);
    return (
      <h4 id={id}>
        {value.children.map((child: any, index: number) => (
          <span key={index}>{child.text}</span>
        ))}
      </h4>
    );
  },
};

// Combined PortableText components object
const portableTextComponents: PortableTextComponents = {
  types: portableTextTypes,
  marks: portableTextMarks,
  block: portableTextBlocks,
};

// Reusable ArticlePortableText component
interface ArticlePortableTextProps {
  value: any[];
}

export default function ArticlePortableText({ value }: ArticlePortableTextProps) {
  return <PortableText value={value} components={portableTextComponents} />;
}
