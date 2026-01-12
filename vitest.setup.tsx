import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    priority,
    className,
    fill,
    sizes,
    placeholder,
    blurDataURL,
    onLoad,
  }: any) => {
    return {
      type: 'img',
      props: {
        src,
        alt,
        width,
        height,
        className,
        loading: priority ? 'eager' : 'lazy',
        style: fill ? { objectFit: 'cover' } : {},
      },
    };
  },
}));

// Mock next/link
vi.mock('next/link', ({ children, href, className, ...props }: any) => ({
  type: 'a',
  props: { href, className, ...props, children },
}));

// Mock Sanity client
vi.mock('@/sanity/lib/sanity', () => ({
  client: {
    fetch: vi.fn(),
  },
}));

// Mock urlFor
vi.mock('@/sanity/lib/image', () => ({
  urlFor: (source: any) => ({
    width: (w: number) => ({
      height: (h: number) => ({
        url: () => `https://cdn.sanity.io/images/test/test/${w}x${h}.jpg`,
      }),
    }),
  }),
  getBlurPlaceholder: () => null,
}));
