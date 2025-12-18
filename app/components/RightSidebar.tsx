"use client";

import Link from "next/link";
import { useState } from "react";
import { truncateText } from "./utils";
import NewsletterForm from "./NewsletterForm";

interface RightSidebarProps {
  hideMostRead?: boolean;
  breaking?: any[];
  trending?: any[];
}

export default function RightSidebar({ hideMostRead = false, breaking = [], trending = [] }: RightSidebarProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Pause/resume animation on swipe (works on mobile where stories scroll)
    if (isLeftSwipe || isRightSwipe) {
      const track = document.querySelector('.breaking-ticker-track') as HTMLElement;
      if (track) {
        track.style.animationPlayState = 'paused';
        // Resume after 3 seconds
        setTimeout(() => {
          track.style.animationPlayState = 'running';
        }, 3000);
      }
    }
  };

  return (
    <aside className="global-right-sidebar">
      <div className="global-sidebar-widget">
        <div
          className="breaking-ticker-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
        <NewsletterForm />
      </div>

    </aside>
  );
}
