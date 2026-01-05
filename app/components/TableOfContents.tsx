'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface PortableTextBlock {
  _type: string;
  style?: string;
  children?: Array<{ text: string }>;
}

interface TableOfContentsProps {
  body: PortableTextBlock[];
}

export default function TableOfContents({ body }: TableOfContentsProps) {
  const [tocItems, setTOCItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!body || !Array.isArray(body)) return;

    const headings: TOCItem[] = [];
    const idMap = new Map<string, number>();

    body.forEach((block) => {
      if (block._type === 'block' && block.style) {
        const level = block.style === 'h1' ? 1 :
                      block.style === 'h2' ? 2 :
                      block.style === 'h3' ? 3 :
                      block.style === 'h4' ? 4 : 0;

        if (level > 0 && block.children) {
          const text = block.children
            .map((child) => child.text)
            .join(' ')
            .trim();

          if (text) {
            let id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');

            if (idMap.has(id)) {
              const count = idMap.get(id)! + 1;
              idMap.set(id, count);
              id = `${id}-${count}`;
            } else {
              idMap.set(id, 1);
            }

            headings.push({ id, text, level });
          }
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTOCItems(headings);
  }, [body]);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      tocItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents">
      <h3 className="toc-title">Table of Contents</h3>
      <ul className="toc-list">
        {tocItems.map((item) => (
          <li
            key={item.id}
            className={`toc-item toc-level-${item.level} ${activeId === item.id ? 'active' : ''}`}
          >
            <button
              onClick={() => scrollToHeading(item.id)}
              className="toc-link"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
