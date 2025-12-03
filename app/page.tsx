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
      

      {/* PAGE GRID START */}
      <main className="container page-grid">

        {/* HERO SECTION */}
       
  <section className="hero-col" id="hero">
  <article className="hero-card">
    <Link 
      href={`/story/${hero.slug}`} 
      className="hero-link-wrapper"
    >
      {hero.image && (
        <img 
          src={urlFor(hero.image).url()} 
          alt={hero.title || "Featured image"} 
        />
      )}

      <div className="hero-content">
        <div className="kicker">FEATURE</div>
        <h1>{hero.title}</h1>
        <p className="meta">
  {timeAgo(hero.publishedAt)} • By {hero.author}
</p>
      </div>
    </Link>
  </article>
</section>


        {/* BREAKING NEWS */}
        <aside className="mid-col">
          <div className="breaking">
  <div className="breaking-header"><span>BREAKING NEWS</span>
 
  </div>

  <ul className="breaking-list">
    {breaking.map((post: any) => (
      <li key={post.slug}>
        <Link 
          href={`/story/${post.slug}`} 
          className="breaking-link"
        >
          {post.title}
        </Link>

        <div className="time">{timeAgo(post.publishedAt)}</div>
      </li>
    ))}
  </ul>
</div>
                {/* BREAKING NEWS */}

                {/* Trending */}
          <div className="section-block trending-block">
  <h3 className="section-title">Trending</h3>

  <div className="list-cards">
    {trending.map((post: any) => (
      <article className="card" key={post.slug}>
        <Link 
          href={`/story/${post.slug}`}
          className="card-link"
        >
          {post.image && (
            <img 
              src={urlFor(post.image).width(400).url()} 
              alt={post.title}
            />
          )}

          <h4>{post.title}</h4>
          <p className="muted">{timeAgo(post.publishedAt)}</p>
        </Link>
      </article>
    ))}
  </div>
</div>

        </aside>

        {/* SPECIAL */}
        <div className="special">
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
        <div className="tag">
          {special.specialTag || "SPECIAL"}
        </div>

        <h3>{special.title}</h3>

        <p className="muted">{special.subtitle}</p>
      </div>

    </Link>
  </article>
</div>




        {/* OPINIONS */}
        <div className="section-block opinions">
  <h3 className="section-title">Opinions</h3>

  <div className="opinion-list">
    {opinion.map((post: any) => (
      <article className="op-item" key={post.slug}>
        <Link 
          href={`/story/${post.slug}`} 
          className="opinion-link"
        >
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
</div>


        {/* RIGHT COLUMN */}
        <aside className="right-col">
  <div className="side-top">
    <article className="side-card">
      <Link href={`/story/${rightColumn.slug}`} className="right-link">
        
        {rightColumn.image && (
          <img 
            src={urlFor(rightColumn.image).width(380).url()}
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
  </div>
</aside>

      </main>

      {/* FOOTER */}
      
  
    </>
  )
}
