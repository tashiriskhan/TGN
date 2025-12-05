// 🔥 Always fetch fresh data (fixes the Vercel redeploy issue)
export const dynamic = "force-dynamic";

import Link from "next/link";
import "./globals.css";

import { getFeaturedPost } from "@/sanity/lib/getFeaturedPost";
import { getBreakingNews } from "@/sanity/lib/getBreakingNews";
import { getTrending } from "@/sanity/lib/getTrending";
import { getOpinion } from "@/sanity/lib/getOpinion";
import { getAllRightColumn } from "@/sanity/lib/getAllRightColumn";
import { getAllSpecial } from "@/sanity/lib/getAllSpecial";

import { urlFor } from "@/sanity/lib/image";
import { timeAgo } from "@/sanity/lib/timeAgo";

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
                <img
                  className="bbc-hero-img"
                  src={urlFor(hero.image).width(900).url()}
                  alt={hero.title}
                />
                <div className="bbc-hero-content">
                  <h1>{hero.title}</h1>
                  {hero.content && (
                    <p className="summary">
                      {hero.content.slice(0, 120)}...
                    </p>
                  )}
                  <p className="meta">
                    {timeAgo(hero.publishedAt)} • {hero.author?.name}
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
                      <img
                        className="trending-img-small"
                        src={urlFor(post.image).width(200).url()}
                        alt={post.title}
                      />
                    </div>
                  )}
                  <div className="trending-content">
                    <h3>{post.title}</h3>
                    {post.subtitle && (
                      <p className="summary">{post.subtitle}</p>
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
                    <img
                      className="bbc-card-img"
                      src={urlFor(post.image).width(400).url()}
                      alt={post.title}
                    />
                  )}
                  <div className="bbc-card-content">
                    <h4>{post.title}</h4>
                    {post.subtitle && (
                      <p className="summary">{post.subtitle}</p>
                    )}
                    <p className="meta">{timeAgo(post.publishedAt)}</p>
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
                  <img
                    src={urlFor(post.image).width(600).url()}
                    alt={post.title}
                  />
                  <div className="special-card-2-content">
                    <span className="special-tag">{post.specialTag || "SPECIAL"}</span>
                    <h3>{post.title}</h3>
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
                    <img
                      src={urlFor(post.image).width(80).height(80).url()}
                      alt={post.title}
                    />
                  )}
                  <div className="op-item-content">
                    <h4>{post.title}</h4>
                    {post.subtitle && (
                      <p className="summary">{post.subtitle}</p>
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
