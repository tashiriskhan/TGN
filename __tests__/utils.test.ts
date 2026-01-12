import { describe, it, expect } from 'vitest';
import { truncateText } from '@/app/components/utils';

describe('truncateText', () => {
  it('returns empty string for null input', () => {
    expect(truncateText(null as any, 50)).toBe('');
  });

  it('returns empty string for undefined input', () => {
    expect(truncateText(undefined as any, 50)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(truncateText('', 50)).toBe('');
  });

  it('returns original text if shorter than maxLength', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('returns original text if equal to maxLength', () => {
    expect(truncateText('Hello', 5)).toBe('Hello');
  });

  it('truncates text and adds ellipsis', () => {
    expect(truncateText('Hello world test', 11)).toBe('Hello world...');
  });

  it('truncates at last space to avoid cutting words', () => {
    expect(truncateText('Hello world test', 14)).toBe('Hello world...');
  });

  it('handles text with no spaces', () => {
    expect(truncateText('Helloworldtest', 8)).toBe('Hellowo...');
  });

  it('handles long text with multiple sentences', () => {
    const longText = 'This is a very long sentence that should be truncated at some point.';
    const result = truncateText(longText, 30);
    expect(result.length).toBeLessThan(longText.length);
    expect(result.endsWith('...')).toBe(true);
  });
});

describe('getOptimizedImageUrl', () => {
  it('returns empty string for null image', () => {
    const { getOptimizedImageUrl } = await import('@/app/components/utils');
    expect(getOptimizedImageUrl(null, 800)).toBe('');
  });

  it('returns empty string for undefined image', () => {
    const { getOptimizedImageUrl } = await import('@/app/components/utils');
    expect(getOptimizedImageUrl(undefined, 800)).toBe('');
  });
});
