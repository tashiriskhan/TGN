"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function BodyAttribute() {
  const pathname = usePathname();

  useEffect(() => {
    // Determine page type from pathname
    let pageType = 'default';

    if (pathname?.startsWith('/photos')) {
      pageType = 'photos';
    }

    // Set body attribute
    document.body.setAttribute('data-page', pageType);

    // Cleanup function to reset when component unmounts (though this shouldn't happen in this case)
    return () => {
      document.body.setAttribute('data-page', 'default');
    };
  }, [pathname]);

  return null;
}
