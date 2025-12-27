import { notFound } from "next/navigation"
import Link from "next/link"
import { getPhotoStoryBySlug } from "@/sanity/lib/getPhotoStoryBySlug"
import { timeAgo } from "@/sanity/lib/timeAgo"
import SocialIcons from "@/app/components/SocialIcons"
import PhotoLightbox from "@/app/components/PhotoLightbox"
import { urlFor } from "@/sanity/lib/image"
import "@/app/styles/photos.css"

export default async function PhotoStoryPage({ params }: any) {
  const p = await params
  const slug = p.slug

  const photoStory = await getPhotoStoryBySlug(slug)

  if (!photoStory) {
    notFound()
  }

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
                <h2>Photo <span className="blue">Story</span></h2>
                <p>Visual narratives and photography from our journalists around the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="photos-breadcrumb">
        <div className="container">
          <Link href="/photos" className="breadcrumb-link">
            ← Back to Photos
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-posts">
        <div className="container">
          <article className="story-article">
            <header className="story-header">
              <h1>{photoStory.title}</h1>
              <div className="story-meta">
                <span>By {photoStory.author?.name}</span>
                <span> • </span>
                <span>{timeAgo(photoStory.publishedAt)}</span>
                {photoStory.category && (
                  <>
                    <span> • </span>
                    <Link href={`/${photoStory.category.slug}`}>
                      {photoStory.category.title}
                    </Link>
                  </>
                )}
              </div>
            </header>

            {photoStory.description && (
              <div className="story-description">
                <p>{photoStory.description}</p>
              </div>
            )}

            <div className="photo-gallery">
              {/* Add image count badge if more than 4 images */}
              {(photoStory.images?.length > 4 || photoStory.gallery?.length > 4) && (
                <div className="photo-count-badge">
                  {(photoStory.images?.length || photoStory.gallery?.length || 0)} Photos
                </div>
              )}

              {/* Interactive Lightbox Gallery */}
              {/* Try images array first, then gallery, then mainImage as fallback */}
              <PhotoLightbox
                images={
                  photoStory.images?.length > 0
                    ? photoStory.images.map((img: any) => ({
                        url: urlFor(img).width(1200).height(900).url()
                      }))
                    : photoStory.gallery?.length > 0
                    ? photoStory.gallery.map((img: any) => ({
                        url: urlFor(img).width(1200).height(900).url()
                      }))
                    : photoStory.mainImage
                    ? [{
                        url: urlFor(photoStory.mainImage).width(1200).height(900).url()
                      }]
                    : []
                }
                title={photoStory.title}
              />
            </div>

            {photoStory.tags && photoStory.tags.length > 0 && (
              <div className="story-tags">
                <h4>Tags:</h4>
                <div className="tag-list">
                  {photoStory.tags.map((tag: any) => (
                    <Link
                      key={tag.slug}
                      href={`/tag/${tag.slug}`}
                      className="tag"
                    >
                      {tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
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
              <p className="photos-copyright">Copyright &copy; {new Date().getFullYear()} The Ground Narrative</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
