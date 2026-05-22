import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from '@/sanity/lib/readingTime';

describe('calculateReadingTime', () => {
  it('returns "1 min read" for empty content', () => {
    expect(calculateReadingTime('')).toBe('1 min read');
  });

  it('returns "1 min read" for null content', () => {
    expect(calculateReadingTime(null as any)).toBe('1 min read');
  });

  it('calculates reading time for short content', () => {
    // ~50 words (assuming average 5 chars per word + space)
    const shortContent = 'This is a short article with about fifty words to test the reading time calculation feature.';
    expect(calculateReadingTime(shortContent)).toBe('1 min read');
  });

  it('calculates reading time for longer content', () => {
    // Generate ~400 words
    const longContent = Array(400).fill('word').join(' ');
    expect(calculateReadingTime(longContent)).toBe('2 min read');
  });

  it('calculates reading time with custom WPM', () => {
    // ~200 words
    const content = Array(200).fill('word').join(' ');
    // At 100 WPM, should take 2 minutes
    expect(calculateReadingTime(content, 100)).toBe('2 min read');
  });

  it('strips HTML tags before calculating', () => {
    const htmlContent = '<p>This is a <strong>test</strong> paragraph.</p>';
    expect(calculateReadingTime(htmlContent)).toBe('1 min read');
  });
});
