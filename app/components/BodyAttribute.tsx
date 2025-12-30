"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BodyAttribute() {
  const pathname = usePathname();

  useEffect(() => {
    // Determine page type from pathname
    let pageType = 'default';

    if (pathname?.startsWith('/photos/')) {
      // Photo story detail page - use dark theme with global header/footer
      pageType = 'photos';
      document.documentElement.setAttribute('data-theme', 'photos-dark');
    } else if (pathname === '/photos') {
      // Main photos listing page
      pageType = 'photos';
      document.documentElement.setAttribute('data-theme', 'photos-dark');
    } else if (pathname?.startsWith('/videos') || pathname?.startsWith('/video-stories')) {
      // Video pages get the dark video theme
      pageType = 'video';
      document.documentElement.setAttribute('data-theme', 'video-dark');
    } else {
      // Default pages - remove dark themes
      document.documentElement.removeAttribute('data-theme');
    }

    // Set body attribute
    document.body.setAttribute('data-page', pageType);

    // Cleanup function to reset when component unmounts
    return () => {
      document.body.setAttribute('data-page', 'default');
      document.documentElement.removeAttribute('data-theme');
    };
  }, [pathname]);

  return null;
}
