// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { getFeaturedStories } from "@/sanity/lib/getFeaturedStories";
import { getTrending } from "@/sanity/lib/getTrending";
import { getBreakingNews } from "@/sanity/lib/getBreakingNews";
import { getOpinion } from "@/sanity/lib/getOpinion";
import { getAllInDepth } from "@/sanity/lib/getAllInDepth";
import { getAllSpecial } from "@/sanity/lib/getAllSpecial";
import { getAllPhotoStories } from "@/sanity/lib/getAllPhotoStories";

import { urlFor } from "@/sanity/lib/image";
import { timeAgo } from "@/sanity/lib/timeAgo";
import { truncateText } from "@/app/components/utils";

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    featuredStories,
    trending,
    breaking,
    opinion,
    inDepthList,
    specialList,
    photoStories
  ] = await Promise.all([
    getFeaturedStories(),
    getTrending(),
    getBreakingNews(),
    getOpinion(),
    getAllInDepth(),
    getAllSpecial(),
    getAllPhotoStories()
  ]);

  if (!featuredStories || featuredStories.length === 0) {
    return <div>No featured stories found</div>;
  }

  const mainStory = featuredStories[0];
  const recentStories = featuredStories.slice(1, 5);

  return (
    <>
      {/* BREAKING NEWS BANNER - Simple ticker */}
      {breaking && breaking.length > 0 && (
        <section className="breaking-banner-simple">
          <div className="breaking-ticker-simple">
            {/* First set */}
            {breaking.map((news: any, index: number) => (
              <React.Fragment key={`first-${news.slug || index}`}>
                {index > 0 && <span className="breaking-separator">|</span>}
                <Link
                  href={`/story/${news.slug}`}
                  className="breaking-item-simple"
                >
                  {news.title}
                </Link>
              </React.Fragment>
            ))}
            {/* Duplicate set for seamless loop */}
            {breaking.map((news: any, index: number) => (
              <React.Fragment key={`dup-${news.slug || index}`}>
                {index > 0 && <span className="breaking-separator">|</span>}
                <Link
                  href={`/story/${news.slug}`}
                  className="breaking-item-simple"
                >
                  {news.title}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* TOP SECTION - TRENDING | FEATURE | RECENT SIDEBAR */}
      <section className="top-grid-section">
        <div className="container">
          <div className="top-grid-3col">
            {/* LEFT: TRENDING - hidden on mobile, visible desktop */}
            <div className="top-grid-left desktop-only">
              <div className="top-trending-list">
                {trending?.slice(0, 3).map((post: any) => (
                  <article key={post.slug} className="top-trending-item">
                    <Link href={`/story/${post.slug}`} className="top-trending-link">
                      {post.mainImage && (
                        <div className="top-trending-thumb">
                          <Image
                            src={urlFor(post.mainImage).width(320).height(180).url()}
                            alt={post.title}
                            width={320}
                            height={180}
                          />
                        </div>
                      )}
                      <div className="top-trending-content">
                        <h3 className="top-trending-title">{truncateText(post.title, 70)}</h3>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* CENTER: MAIN FEATURE - visible on both */}
            <div className="top-grid-center">
              <article className="top-feature-card">
                <Link href={`/story/${mainStory.slug}`}>
                  {mainStory.mainImage && (
                    <div className="top-feature-image">
                      <Image
                        src={urlFor(mainStory.mainImage).width(800).height(500).url()}
                        alt={mainStory.title}
                        width={800}
                        height={500}
                        priority
                      />
                    </div>
                  )}
                  <div className="top-feature-content">
                    <h1 className="top-feature-title">{mainStory.title}</h1>
                    {mainStory.excerpt && (
                      <p className="top-feature-excerpt">
                        {truncateText(mainStory.excerpt, 150)}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            </div>

            {/* RIGHT: RECENT STORIES - visible on desktop, hidden on mobile */}
            <aside className="top-grid-right desktop-only">
              <h2 className="top-grid-title">Recent Stories</h2>
              <div className="top-recent-list">
                {recentStories.slice(0, 2).map((story: any) => (
                  <article key={story.slug} className="top-recent-item">
                    <Link href={`/story/${story.slug}`} className="top-recent-link">
                      {story.mainImage && (
                        <div className="top-recent-thumb">
                          <Image
                            src={urlFor(story.mainImage).width(320).height(180).url()}
                            alt={story.title}
                            width={320}
                            height={180}
                          />
                        </div>
                      )}
                      <div className="top-recent-content">
                        <h3 className="top-recent-title">{truncateText(story.title, 70)}</h3>
                        <p className="top-recent-subtitle">{story.excerpt ? truncateText(story.excerpt, 80) : story.author?.name}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* MOBILE ONLY SECTIONS - Recent then Trending */}
      <div className="mobile-only-section">
        {/* Mobile Recent Stories - after feature */}
        <section className="mobile-recent-section">
          <div className="container">
            <h2 className="mobile-section-title">Recent Stories</h2>
            <div className="mobile-recent-grid">
              {recentStories.map((story: any) => (
                <Link key={story.slug} href={`/story/${story.slug}`} className="mobile-recent-card">
                  {story.mainImage && (
                    <div className="mobile-recent-thumb">
                      <Image
                        src={urlFor(story.mainImage).width(150).height(100).url()}
                        alt={story.title}
                        width={150}
                        height={100}
                      />
                    </div>
                  )}
                  <h3 className="mobile-recent-title">{truncateText(story.title, 50)}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Trending - after Recent */}
        <section className="mobile-trending-section">
          <div className="container">
            <h2 className="mobile-section-title">Trending</h2>
            <div className="mobile-trending-list">
              {trending?.slice(0, 5).map((post: any, index: number) => (
                <Link key={post.slug} href={`/story/${post.slug}`} className="mobile-trending-item">
                  <span className="mobile-trending-rank">{index + 1}</span>
                  <span className="mobile-trending-title">{truncateText(post.title, 70)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* MAIN CONTENT SECTIONS */}
      <section className="main-content-full">
        <div className="container">
          <div className="main-content">
            {/* IN DEPTH */}
            <section className="content-section-compact">
              <h2 className="section-title-compact">In Depth</h2>
              <div className="stories-grid-smaller">
                {inDepthList?.filter((post: any) => post.mainImage).map((post: any) => (
                  <article key={post.slug} className="story-card-smaller">
                    <Link href={`/story/${post.slug}`}>
                      {post.mainImage && (
                        <div className="story-image-smaller">
                          <Image
                            src={urlFor(post.mainImage).width(280).height(160).url()}
                            alt={post.title}
                            width={280}
                            height={160}
                          />
                        </div>
                      )}
                      <div className="story-content-smaller">
                        <h3 className="story-title-smaller">{truncateText(post.title, 55)}</h3>
                        <p className="story-meta-smaller">{timeAgo(post.publishedAt)}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* SPECIAL REPORTS */}
            <section className="content-section-compact">
              <h2 className="section-title-compact">Special Reports</h2>
              <div className="special-grid-smaller">
                {specialList?.filter((post: any) => post.mainImage).slice(0, 4).map((post: any) => (
                  <article key={post.slug} className="special-card-smaller">
                    <Link href={`/story/${post.slug}`}>
                      <div className="special-image-smaller">
                        <Image
                          src={urlFor(post.mainImage).width(280).height(160).url()}
                          alt={post.title}
                          width={280}
                          height={160}
                        />
                        <span className="special-badge-compact">{post.specialTag || 'SPECIAL'}</span>
                      </div>
                      <div className="special-content-smaller">
                        <h3>{truncateText(post.title, 55)}</h3>
                        <p className="special-meta-smaller">{timeAgo(post.publishedAt)}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* OPINION */}
            <section className="content-section-compact">
              <h2 className="section-title-compact">Opinion</h2>
              <div className="opinion-grid-compact">
                {opinion?.filter((post: any) => post.mainImage).map((post: any) => (
                  <article key={post.slug} className="opinion-card-compact">
                    <Link href={`/story/${post.slug}`}>
                      {post.mainImage && (
                        <div className="opinion-image-compact">
                          <Image
                            src={urlFor(post.mainImage).width(60).height(60).url()}
                            alt={post.title}
                            width={60}
                            height={60}
                          />
                        </div>
                      )}
                      <div className="opinion-content-compact">
                        <h4>{truncateText(post.title, 65)}</h4>
                        <p className="opinion-author-compact">{post.author?.name}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* WATCH & LISTEN */}
      <section className="media-strip-compact">
        <div className="container">
          <h2 className="section-title-compact">Watch & Listen</h2>
          <div className="media-cards-compact">
            <Link href="/photos" className="media-card-compact">
              <div className="media-icon-compact">📷</div>
              <span>Photo Stories</span>
            </Link>
            <Link href="/videos" className="media-card-compact">
              <div className="media-icon-compact">🎥</div>
              <span>Videos</span>
            </Link>
            <Link href="/podcasts" className="media-card-compact">
              <div className="media-icon-compact">🎧</div>
              <span>Podcasts</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
