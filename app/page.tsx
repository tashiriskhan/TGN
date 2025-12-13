// 🔥 Always fetch fresh data (fixes the Vercel redeploy issue)
export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import "./globals.css";

import { getFeaturedPost } from "@/sanity/lib/getFeaturedPost";
import { getTrending } from "@/sanity/lib/getTrending";
import { getBreakingNews } from "@/sanity/lib/getBreakingNews";
import { getOpinion } from "@/sanity/lib/getOpinion";
import { getAllRightColumn } from "@/sanity/lib/getAllRightColumn";
import { getAllSpecial } from "@/sanity/lib/getAllSpecial";
import { getAllPhotoStories } from "@/sanity/lib/getAllPhotoStories";

import { urlFor } from "@/sanity/lib/image";
import { timeAgo } from "@/sanity/lib/timeAgo";
import RightSidebar from "./components/RightSidebar";

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

// Helper function to estimate reading time
function getReadingTime(text: string): number {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

type RelatedPost = {
  title: string;
  slug: string;
  mainImage?: any;
  publishedAt: string;
  author?: {
    name: string;
  };
};

async function getRelatedPosts(category: string): Promise<RelatedPost[]> {
  // In a real app, you'd query Sanity by category
  // For now, return trending posts as related
  const trending = await getTrending();
  return trending?.slice(0, 3) || [];
}

export default async function HomePage() {
  // Fetch all data in parallel → faster
  const [
    hero,
    trending,
    breaking,
    opinion,
    rightColumnList,
    specialList,
    photoStories
  ] = await Promise.all([
    getFeaturedPost(),
    getTrending(),
    getBreakingNews(),
    getOpinion(),
    getAllRightColumn(),
    getAllSpecial(),
    getAllPhotoStories()
  ]);

  if (!hero) {
    return <div>No featured post found</div>;
  }

  // Extract category from categories array
  const categoryName = hero.categories?.[0]?.title || 'News';
  const relatedPosts = await getRelatedPosts(categoryName);

  return (
    <>
      {/* TOP GRID - TRENDING | FEATURE | SIDEBAR */}
      <section className="top-grid-section">
        <div className="container">
          <div className="top-grid-3col">
            {/* LEFT: TRENDING */}
            <div className="top-grid-left">
              <h2 className="top-grid-title">Trending</h2>
              <div className="top-trending-list">
                {trending?.slice(0, 5).map((post: any, index: number) => (
                  <article key={post.slug} className="top-trending-item">
                    <Link href={`/story/${post.slug}`}>
                      <span className="top-trending-rank">{index + 1}</span>
                      <div className="top-trending-content">
                        <h3 className="top-trending-title">{truncateText(post.title, 80)}</h3>
                        <p className="top-trending-meta">{timeAgo(post.publishedAt)}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* CENTER: FEATURE */}
            <div className="top-grid-center">
              <article className="top-feature-card">
                <Link href={`/story/${hero.slug}`}>
                  {hero.mainImage && (
                    <div className="top-feature-image">
                      <Image
                        src={urlFor(hero.mainImage).width(800).height(500).url()}
                        alt={hero.title}
                        width={800}
                        height={500}
                        priority
                      />
                      <div className="top-feature-category">{categoryName}</div>
                    </div>
                  )}
                  <div className="top-feature-content">
                    <h1 className="top-feature-title">{hero.title}</h1>
                    {hero.excerpt && (
                      <p className="top-feature-excerpt">
                        {truncateText(hero.excerpt, 120)}
                      </p>
                    )}
                    <p className="top-feature-meta">
                      <span className="top-feature-author">{hero.author?.name}</span> • {timeAgo(hero.publishedAt)}
                    </p>
                  </div>
                </Link>
              </article>
            </div>

            {/* RIGHT: SIDEBAR */}
            <RightSidebar />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - NO SIDEBAR */}
      <section className="main-content-full">
        <div className="container">
          <div className="main-content">
            {/* MORE STORIES - SMALLER */}
            <section className="content-section-compact">
              <h2 className="section-title-compact">More Stories</h2>
              <div className="stories-grid-smaller">
                {rightColumnList?.filter((post: any) => post.mainImage).map((post: any) => (
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

            {/* SPECIAL REPORTS - SMALLER */}
            <section className="content-section-compact">
              <h2 className="section-title-compact">Special Reports</h2>
              <div className="special-grid-smaller">
                {specialList?.filter((post: any) => post.mainImage).map((post: any) => (
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

      {/* WATCH & LISTEN - MOVED TO BOTTOM, COMPACT */}
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
