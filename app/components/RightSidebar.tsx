"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { truncateText } from "./utils";
import NewsletterForm from "./NewsletterForm";
import { urlFor } from "@/sanity/lib/image";

interface RightSidebarProps {
  hideMostRead?: boolean;
  breaking?: any[];
  trending?: any[];
  relatedPosts?: any[];
  category?: string;
  recentStories?: any[];
}

export default function RightSidebar({
  hideMostRead = false,
  breaking = [],
  trending = [],
  relatedPosts = [],
  category = '',
  recentStories = []
}: RightSidebarProps) {
  // Determine if we're on a story page (has category)
  const isStoryPage = !!category;

  return (
    <aside className="global-right-sidebar">
      {/* Recent Stories with Images - always show on story pages */}
      {recentStories.length > 0 && (
        <div className="global-sidebar-widget">
          <h3>Most Read</h3>
          <div className="recent-stories-sidebar">
            {recentStories.map((story: any) => (
              <Link
                key={story.slug}
                href={`/story/${story.slug}`}
                className="recent-story-sidebar-item"
              >
                {story.mainImage && (
                  <div className="recent-story-sidebar-thumb">
                    <Image
                      src={urlFor(story.mainImage).width(180).height(140).url()}
                      alt={story.title}
                      width={90}
                      height={70}
                    />
                  </div>
                )}
                <div className="recent-story-sidebar-content">
                  <span className="recent-story-sidebar-title">
                    {truncateText(story.title, 55)}
                  </span>
                  <span className="recent-story-sidebar-meta">
                    {story.publishedAt ? new Date(story.publishedAt).toLocaleDateString() : ''}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Most Read / Trending */}
      {!hideMostRead && (
        <div className="global-sidebar-widget">
          <h3>Trending</h3>
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
