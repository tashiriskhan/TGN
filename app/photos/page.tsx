// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import SocialIcons from "@/app/components/SocialIcons"
import "@/app/styles/photos.css"

const PAGE_SIZE = 12

export default async function PhotosPage({ searchParams }: any) {
  const s = await searchParams
  const page = Number(s.page) || 1
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const photoStories = await client.fetch(
    `*[_type == "photoStory"]
      | order(publishedAt desc)[$start...$end] {
        title,
        description,
        mainImage,
        gallery,
        publishedAt,
        "slug": slug.current,
        author->{ name }
      }`,
    { start, end }
  )

  const totalStories = await client.fetch(
    `count(*[_type == "photoStory"])`
  )

  const totalPages = Math.ceil(totalStories / PAGE_SIZE)

  return (
    <>
      {/* Site Top - Header and Banner */}
      <div className="site-top">
        {/* Site Header */}
        <div className="site-header">
          <div className="container">
            <Link href="/" className="site-brand">
              <strong>The Ground Narrative</strong>
            </Link>
            <div className="social-icons pull-right">
              <SocialIcons showToggle={true} />
            </div>
          </div>
        </div>

        {/* Site Banner */}
        <div className="site-banner">
          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-8 text-center">
                <h2>Photo <span className="blue">Stories</span></h2>
                <p>Visual narratives and photography from our journalists around the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gallery - exactly like template */}
      <div className="main-posts">
        <div className="container">
          <div className="row">
            <div className="blog-masonry masonry-true">
              {photoStories?.length > 0 ? (
                photoStories.map((story: any) => (
                  <div key={story.slug} className="post-masonry col-md-3 col-sm-6">
                    <div className="post-thumb">
                      <Link href={`/photos/${story.slug}`}>
                        {story.mainImage && (
                          <Image
                            src={urlFor(story.mainImage).width(280).height(210).url()}
                            alt={story.title}
                            width={280}
                            height={210}
                          />
                        )}
                      </Link>

                      {/* Always visible title */}
                      <div className="title-over">
                        <h4><Link href={`/photos/${story.slug}`}>{story.title}</Link></h4>
                      </div>

                      {/* Hover overlay */}
                      <div className="post-hover text-center">
                        <div className="inside">
                          <span>{new Date(story.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <h4><Link href={`/photos/${story.slug}`}>{story.title}</Link></h4>
                          {story.description && (
                            <p>{story.description.slice(0, 100)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-md-12">
                  <div className="photos-empty">
                    No photo stories available yet.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="photos-pagination">
              <div className="pagination-controls">
                {page > 1 && (
                  <Link href={`/photos?page=${page - 1}`} className="pagination-btn pagination-prev">
                    ← Previous
                  </Link>
                )}
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link href={`/photos?page=${page + 1}`} className="pagination-btn pagination-next">
                    Next →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Template style with unique class name */}
      <footer className="photos-page-footer">
        <div className="container">
          {/* Newsletter Section */}
          <div className="photos-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Stay updated with our latest photo stories and visual narratives from around the world.</p>
            <form className="photos-newsletter-form" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="row">
            <div className="col-md-12 text-center">
              <p className="photos-copyright">Copyright &copy; 2025 The Ground Narrative</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
