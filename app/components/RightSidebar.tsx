import Link from "next/link";
import { getBreakingNews } from "@/sanity/lib/getBreakingNews";
import { getTrending } from "@/sanity/lib/getTrending";
import { timeAgo } from "@/sanity/lib/timeAgo";
import { truncateText } from "./utils";

interface RightSidebarProps {
  hideMostRead?: boolean;
}

export default async function RightSidebar({ hideMostRead = false }: RightSidebarProps) {
  const [breaking, trending] = await Promise.all([
    getBreakingNews(),
    getTrending()
  ]);

  return (
    <aside className="global-right-sidebar">
      <div className="global-sidebar-widget">
        <div className="breaking-ticker-wrapper">
          <span className="breaking-label">BREAKING NEWS</span>
          <div className="breaking-ticker-content">
            <div className="breaking-ticker-track">
              <ul className="breaking-list-compact">
                {breaking?.map((post: any) => (
                  <li key={post.slug}>
                    <Link href={`/story/${post.slug}`}>
                      <span className="breaking-link">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Only show Most Read when not hidden */}
      {!hideMostRead && (
        <div className="global-sidebar-widget">
          <h3>Most Read</h3>
          <div className="most-read-list-compact">
            {trending?.slice(0, 5).map((post: any, index: number) => (
              <div key={post.slug} className="most-read-item-compact">
                <Link href={`/story/${post.slug}`}>
                  <span className="most-read-rank">{index + 1}</span>
                  <span className="most-read-title">{truncateText(post.title, 50)}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="global-sidebar-widget">
        <h3>Newsletter</h3>
        <p>Get the latest news in your inbox</p>
        <form className="newsletter-form-compact" action="/api/newsletter" method="POST">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="newsletter-input-compact"
            required
          />
          <button type="submit" className="newsletter-submit-compact">Subscribe</button>
        </form>
      </div>

    </aside>
  );
}
