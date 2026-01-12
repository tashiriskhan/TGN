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
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        {...(fill && { style: { objectFit: 'cover' } })}
        {...(blurDataURL && { style: { background: `url(${blurDataURL})`, backgroundSize: 'cover' } })}
      />
    );
  },
}));

// Mock next/link
vi.mock('next/link', ({ children, href, className, ...props }: any) => (
  <a href={href} className={className} {...props}>{children}</a>
));

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
