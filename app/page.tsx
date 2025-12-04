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
import { getAllRightColumn } from "@/sanity/lib/getAllRightColumn"
import { getAllSpecial } from "@/sanity/lib/getAllSpecial"





export default async function HomePage() {
  const hero = await getFeaturedPost()
  const breaking = await getBreakingNews()
  const trending = await getTrending()
  const opinion = await getOpinion()
  const special = await getSpecial()
  const rightColumn = await getRightColumn()
  const rightColumnList = await getAllRightColumn()
const specialList = await getAllSpecial()





   if (!hero) {
    return <div>Loading or no featured post found</div>
  }

  return (
    <>
      

      {/* BBC HOMEPAGE START */}
<main className="container bbc-home">

  {/* ============================== */}
  {/* 1. TOP BBC LAYOUT: TRENDING | FEATURE | BREAKING */}
  {/* ============================== */}
  <section className="bbc-top">

  {/* LEFT COLUMN → TRENDING */}
  <div className="bbc-left-col">
    
    {trending.map((post:any) => (
      <article className="bbc-left-card" key={post.slug}>
        <Link href={`/story/${post.slug}`}>
          <img 
            src={urlFor(post.image).width(400).url()}
            alt={post.title}
          />
          <h3>{post.title}</h3>
          {post.subtitle && (
            <p className="summary">{post.subtitle}</p>
          )}
        </Link>
      </article>
    ))}
  </div>


  {/* CENTER COLUMN → BIG FEATURE */}
  <div className="bbc-center-col">
    <article className="bbc-hero">
      <Link href={`/story/${hero.slug}`}>
        <img 
          src={urlFor(hero.image).width(900).url()} 
          alt={hero.title}
        />
        <h1>{hero.title}</h1>

        <p className="summary">{hero.content?.slice(0,120)}...</p>

        <p className="muted">
          {timeAgo(hero.publishedAt)} • {hero.author?.name}
        </p>
      </Link>
    </article>
  </div>


  {/* RIGHT COLUMN → BREAKING */}
  <div className="bbc-right-col">
    <div className="breaking-header"><span>BREAKING NEWS</span> </div>
    {breaking.map((post:any) => (
      <article className="bbc-right-item" key={post.slug}>
        <Link href={`/story/${post.slug}`}>
          <h4>{post.title}</h4>
        </Link>
        <p className="muted">{timeAgo(post.publishedAt)}</p>
      </article>
    ))}
  </div>

</section>

  {/* END TOP ROW */}


  {/* ============================== */}
  {/* 2. TOP STORIES GRID */}
  {/* ============================== */}
  <section className="bbc-3col-section">
  <h2 className="section-title">More Stories</h2>

  <div className="bbc-3col-grid">
    {rightColumnList.map((post: any) => (
      <article key={post.slug} className="bbc-3col-card">
        <Link href={`/story/${post.slug}`}>
          {post.image && (
            <img
              src={urlFor(post.image).width(400).url()}
              alt={post.title}
            />
          )}

          <h4>{post.title}</h4>
          {post.subtitle && <p className="muted">{post.subtitle}</p>}
          <p className="muted">{timeAgo(post.publishedAt)}</p>
        </Link>
      </article>
    ))}
  </div>
</section>




  {/* ============================== */}
  {/* 3. SPECIAL REPORT */}
  {/* ============================== */}
 <section className="bbc-special-2">
  <h2 className="section-title">Special Reports</h2>

  <div className="bbc-special-grid">
    {specialList.map((post: any) => (
      <article key={post.slug} className="special-card-2">
        <Link href={`/story/${post.slug}`}>
          <img 
            src={urlFor(post.image).width(600).url()}
            alt={post.title}
          />
          <div className="tag">{post.specialTag || "SPECIAL"}</div>
          <h3>{post.title}</h3>
        </Link>
      </article>
    ))}
  </div>
</section>





  {/* ============================== */}
  {/* 4. OPINIONS GRID */}
  {/* ============================== */}
  <section className="bbc-opinions-row">
  <h2 className="section-title">Opinion</h2>

  <div className="bbc-opinion-grid">
    {opinion.map((post: any) => (
      <article key={post.slug} className="op-item-row">
        <Link href={`/story/${post.slug}`}>
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
