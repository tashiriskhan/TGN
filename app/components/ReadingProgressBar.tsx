'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const articleElement = document.querySelector('.article-content');
      if (!articleElement) return;

      const articleTop = articleElement.getBoundingClientRect().top + window.scrollY;
      const articleHeight = articleElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const totalScrollable = articleHeight + windowHeight;
      const scrolled = scrollTop - articleTop + windowHeight;

      const calculatedProgress = Math.min(
        Math.max((scrolled / totalScrollable) * 100, 0),
        100
      );

      setProgress(calculatedProgress);
    };

    const throttledUpdate = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', throttledUpdate);
    window.addEventListener('resize', throttledUpdate);

    updateProgress();

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
    };
  }, []);

  return (
    <div className="reading-progress-container">
      <div
        className="reading-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
