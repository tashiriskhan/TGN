import Image from "next/image"
import Link from "next/link"
import "./globals.css"
import { getFeaturedPost } from "@/sanity/lib/getFeaturedPost"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { getTrending } from "@/sanity/lib/getTrending"
import { getOpinion } from "@/sanity/lib/getOpinion"
import { getSpecial } from "@/sanity/lib/getSpecial"
import { getRightColumn } from "@/sanity/lib/getRightColumn"






export default async function HomePage() {
  const hero = await getFeaturedPost()
  const breaking = await getBreakingNews()
  const trending = await getTrending()
  const opinion = await getOpinion()
  const special = await getSpecial()
  const rightColumn = await getRightColumn()




   if (!hero) {
    return <div>Loading or no featured post found</div>
  }

  return (
    <>
      

      {/* BBC HOMEPAGE START */}
<main className="container bbc-home">

  {/* ============================== */}
  {/* 1. BIG TOP FEATURE (YOUR HERO) */}
  {/* ============================== */}
  <section className="bbc-hero">
    <Link href={`/story/${hero.slug}`} className="bbc-hero-link">
      {hero.image && (
        <img
          src={urlFor(hero.image).width(1200).url()}
          alt={hero.title}
          className="bbc-hero-img"
        />
      )}

      <div className="bbc-hero-overlay">
        <div className="kicker">FEATURE</div>
        <h1>{hero.title}</h1>
        <p className="meta">
  {timeAgo(hero.publishedAt)} • By {hero.author?.name}
</p>
      </div>
    </Link>
  </section>



  {/* ================================ */}
  {/* 2. BBC MAIN 3-COLUMN NEWS LAYOUT */}
  {/* ================================ */}
  <section className="bbc-grid">

    {/* LEFT COLUMN — BREAKING NEWS */}
    <aside className="bbc-left">
      <h2 className="section-title">Breaking</h2>

      <ul className="bbc-breaking-list">
        {breaking.map((post: any) => (
          <li key={post.slug}>
            <Link href={`/story/${post.slug}`} className="breaking-link">
              {post.title}
            </Link>
            <span className="time">{timeAgo(post.publishedAt)}</span>
          </li>
        ))}
      </ul>
    </aside>



    {/* MIDDLE COLUMN — TRENDING GRID */}
    <section className="bbc-middle">
      <h2 className="section-title">Top Stories</h2>

      <div className="bbc-grid-3">
        {trending.map((post: any) => (
          <article className="bbc-card" key={post.slug}>
            <Link href={`/story/${post.slug}`} className="bbc-card-link">
              {post.image && (
                <img
                  src={urlFor(post.image).width(350).url()}
                  alt={post.title}
                />
              )}
              <h4>{post.title}</h4>
              <p className="muted">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>



    {/* RIGHT COLUMN — YOUR EXISTING RIGHT SECTION */}
    <aside className="bbc-right">
      <h2 className="section-title">Latest</h2>

      <article className="side-card">
        <Link href={`/story/${rightColumn.slug}`} className="right-link">
          {rightColumn.image && (
            <img
              src={urlFor(rightColumn.image).width(300).url()}
              alt={rightColumn.title}
            />
          )}

          <h4>{rightColumn.title}</h4>

          {rightColumn.subtitle && (
            <p className="muted">{rightColumn.subtitle}</p>
          )}

          <p className="muted">{timeAgo(rightColumn.publishedAt)}</p>
        </Link>
      </article>
    </aside>

  </section>



  {/* SPECIAL STORY */}
  <section className="bbc-special">
    <h2 className="section-title">Special Report</h2>

    <article className="special-card">
      <Link href={`/story/${special.slug}`} className="special-link">
        <div className="special-image">
          {special.image && (
            <img
              src={urlFor(special.image).width(600).url()}
              alt={special.title}
            />
          )}
        </div>

        <div className="special-text">
          <div className="tag">{special.specialTag || "SPECIAL"}</div>
          <h3>{special.title}</h3>
          <p className="muted">{special.subtitle}</p>
        </div>
      </Link>
    </article>
  </section>



  {/* OPINIONS ROW */}
  <section className="bbc-opinions">
    <h3 className="section-title">Opinions</h3>

    <div className="bbc-opinion-row">
      {opinion.map((post: any) => (
        <article className="op-item" key={post.slug}>
          <Link href={`/story/${post.slug}`} className="opinion-link">
            {post.image && (
              <img
                src={urlFor(post.image).width(80).height(80).url()}
                alt={post.title}
              />
            )}

            <div>
              <h4>{post.title}</h4>
              <p className="muted">{post.subtitle}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  </section>

</main>
{/* BBC HOMEPAGE END */}


      {/* FOOTER */}
      
  
    </>
  )
}
