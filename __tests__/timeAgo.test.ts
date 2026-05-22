import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { timeAgo } from '@/sanity/lib/timeAgo';

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Set fixed time to January 12, 2026 at 12:00:00
    vi.setSystemTime(new Date('2026-01-12T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Just now" for current time', () => {
    const now = new Date().toISOString();
    expect(timeAgo(now)).toBe('Just now');
  });

  it('returns "1 second ago" for 1 second ago', () => {
    const oneSecondAgo = new Date(Date.now() - 1000).toISOString();
    expect(timeAgo(oneSecondAgo)).toBe('Just now');
  });

  it('returns "1 minute ago" for 1 minute ago', () => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString();
    expect(timeAgo(oneMinuteAgo)).toBe('1 minute ago');
  });

  it('returns "5 minutes ago" for 5 minutes ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(timeAgo(fiveMinutesAgo)).toBe('5 minutes ago');
  });

  it('returns "1 hour ago" for 1 hour ago', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    expect(timeAgo(oneHourAgo)).toBe('1 hour ago');
  });

  it('returns "2 hours ago" for 2 hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(twoHoursAgo)).toBe('2 hours ago');
  });

  it('returns "1 day ago" for 1 day ago', () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(oneDayAgo)).toBe('1 day ago');
  });

  it('returns "3 days ago" for 3 days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(threeDaysAgo)).toBe('3 days ago');
  });

  it('returns "1 week ago" for 1 week ago', () => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(oneWeekAgo)).toBe('1 week ago');
  });

  it('returns "2 weeks ago" for 2 weeks ago', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(twoWeeksAgo)).toBe('2 weeks ago');
  });

  it('returns "1 month ago" for 1 month ago', () => {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(oneMonthAgo)).toBe('1 month ago');
  });

  it('returns "6 months ago" for 6 months ago', () => {
    const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(sixMonthsAgo)).toBe('6 months ago');
  });

  it('returns "1 year ago" for 1 year ago', () => {
    const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
    expect(timeAgo(oneYearAgo)).toBe('1 year ago');
  });

  it('handles invalid date strings gracefully', () => {
    expect(timeAgo('invalid-date')).toBe('Just now');
  });
});
