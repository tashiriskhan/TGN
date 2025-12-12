// 🔥 Always fetch fresh data (fixes the Vercel redeploy issue)
export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import "./globals.css";

import { getFeaturedPost } from "@/sanity/lib/getFeaturedPost";
import { getBreakingNews } from "@/sanity/lib/getBreakingNews";
import { getTrending } from "@/sanity/lib/getTrending";
import { getOpinion } from "@/sanity/lib/getOpinion";
import { getAllRightColumn } from "@/sanity/lib/getAllRightColumn";
import { getAllSpecial } from "@/sanity/lib/getAllSpecial";

import { urlFor } from "@/sanity/lib/image";
import { timeAgo } from "@/sanity/lib/timeAgo";

// Helper function to truncate text by word boundary
function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

export default async function HomePage() {
  // Fetch all data in parallel → faster
  const [
    hero,
    breaking,
    trending,
    opinion,
    rightColumnList,
    specialList
  ] = await Promise.all([
    getFeaturedPost(),
    getBreakingNews(),
    getTrending(),
    getOpinion(),
    getAllRightColumn(),
    getAllSpecial()
  ]);

  if (!hero) {
    return <div>No featured post found</div>;
  }

  return (
    <>
      {/* BBC HOMEPAGE */}
      <main className="container bbc-home">

        {/* 1. TOP: FEATURE | TRENDING | BREAKING */}
        <section className="bbc-top">

          {/* FEATURE - Featured story FIRST */}
          <div className="bbc-center-col">
            <article className="bbc-hero">
              <Link href={`/story/${hero.slug}`}>
                <Image
                  className="bbc-hero-img"
                  src={urlFor(hero.image).width(900).height(506).url()}
                  alt={hero.title}
                  width={900}
                  height={506}
                  priority
                />
                <div className="bbc-hero-content">
                  <h1>{hero.title}</h1>
                  {hero.content && (
                    <p className="summary">
                      {truncateText(hero.content, 150)}
                    </p>
                  )}
                  <p className="meta">
                    <span className="meta-time">{timeAgo(hero.publishedAt)}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-author">{hero.author?.name}</span>
                  </p>
                </div>
              </Link>
            </article>
          </div>

          {/* TRENDING - Below feature */}
          <div className="bbc-left-col">
            {trending?.map((post: any) => (
              <article className="trending-horizontal" key={post.slug}>
                <Link href={`/story/${post.slug}`}>
                  {post.image && (
                    <div className="trending-image-wrapper">
                      <Image
                        className="trending-img-small"
                        src={urlFor(post.image).width(200).height(160).url()}
                        alt={post.title}
                        width={200}
                        height={160}
                      />
                    </div>
                  )}
                  <div className="trending-content">
                    <h3>{truncateText(post.title, 80)}</h3>
                    {post.subtitle && (
                      <p className="summary">{truncateText(post.subtitle, 100)}</p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* BREAKING */}
          <div className="bbc-right-col">
            <div className="breaking-header">
              <span>BREAKING NEWS</span>
            </div>
            <ul className="breaking-list">
              {breaking?.map((post: any) => (
                <li key={post.slug}>
                  <Link href={`/story/${post.slug}`}>
                    <span className="breaking-link">{post.title}</span>
                  </Link>
                  <p className="time">{timeAgo(post.publishedAt)}</p>
                </li>
              ))}
            </ul>
          </div>

        </section>

        {/* 2. MORE STORIES */}
        <section>
          <h2 className="section-title">More Stories</h2>

          <div className="bbc-3col-grid">
            {rightColumnList?.map((post: any) => (
              <article key={post.slug} className="bbc-card">
                <Link href={`/story/${post.slug}`}>
                  {post.image && (
                    <div className="card-image-wrapper">
                      <Image
                        className="bbc-card-img"
                        src={urlFor(post.image).width(400).height(300).url()}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="bbc-card-content">
                    <h4 className="card-title">{truncateText(post.title, 70)}</h4>
                    {post.subtitle && (
                      <p className="summary">{truncateText(post.subtitle, 90)}</p>
                    )}
                    <p className="meta">
                      <span className="meta-time">{timeAgo(post.publishedAt)}</span>
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* 3. SPECIAL REPORTS */}
        <section className="bbc-special-2">
          <h2 className="section-title">Special Reports</h2>

          <div className="bbc-special-grid">
            {specialList?.map((post: any) => (
              <article key={post.slug} className="special-card-2">
                <Link href={`/story/${post.slug}`}>
                  <div className="special-image-wrapper">
                    <Image
                      src={urlFor(post.image).width(600).height(338).url()}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="special-card-2-content">
                    <span className="special-tag">{post.specialTag || "SPECIAL"}</span>
                    <h3 className="special-card-title">{truncateText(post.title, 65)}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* 4. OPINION SECTION */}
        <section>
          <h2 className="section-title">Opinion</h2>

          <div className="bbc-opinion-grid">
            {opinion?.map((post: any) => (
              <article key={post.slug} className="op-item-row">
                <Link href={`/story/${post.slug}`}>
                  {post.image && (
                    <div className="op-image-wrapper">
                      <Image
                        src={urlFor(post.image).width(100).height(100).url()}
                        alt={post.title}
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                  <div className="op-item-content">
                    <h4 className="op-item-title">{truncateText(post.title, 75)}</h4>
                    {post.subtitle && (
                      <p className="summary">{truncateText(post.subtitle, 85)}</p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}
