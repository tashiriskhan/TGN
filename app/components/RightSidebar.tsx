"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { truncateText } from "./utils";
import NewsletterForm from "./NewsletterForm";

interface RightSidebarProps {
  hideMostRead?: boolean;
  breaking?: any[];
  trending?: any[];
}

export default function RightSidebar({ hideMostRead = false, breaking = [], trending = [] }: RightSidebarProps) {
  const [currentBreakingIndex, setCurrentBreakingIndex] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (breaking.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBreakingIndex((prev) => (prev + 1) % breaking.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [breaking.length]);

  const handleSwipe = useCallback(() => {
    if (touchStartRef.current === null || touchEndRef.current === null) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && breaking.length > 0) {
      setCurrentBreakingIndex((prev) => (prev + 1) % breaking.length);
    } else if (isRightSwipe && breaking.length > 0) {
      setCurrentBreakingIndex((prev) => (prev - 1 + breaking.length) % breaking.length);
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [breaking.length]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onTouchStart = (e: TouchEvent) => {
      touchEndRef.current = null;
      touchStartRef.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      touchEndRef.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      handleSwipe();
    };

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true });
    wrapper.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener('touchstart', onTouchStart);
      wrapper.removeEventListener('touchmove', onTouchMove);
      wrapper.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleSwipe]);

  return (
    <aside className="global-right-sidebar">
      <div className="global-sidebar-widget">
        <div
          ref={wrapperRef}
          className="breaking-ticker-wrapper"
        >
          <span className="breaking-label">BREAKING NEWS</span>
          <div className="breaking-ticker-content">
            <div className="breaking-ticker-track">
              <ul className="breaking-list-compact">
                {breaking?.map((post: any, index: number) => (
                  <li
                    key={post.slug}
                    className={index === currentBreakingIndex ? 'breaking-active' : ''}
                  >
                    <Link href={`/story/${post.slug}`}>
                      <span className="breaking-link">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Dot indicators - mobile only */}
            {breaking.length > 0 && (
              <div className="breaking-dots">
                {breaking.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`breaking-dot ${index === currentBreakingIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            )}
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
