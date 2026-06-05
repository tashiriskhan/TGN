import { Metadata } from 'next'
import { siteConfig, contactConfig, socialConfig } from '@/config/site'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${siteConfig.name} - ${siteConfig.description}`,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
}

export default function AboutPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
          About {siteConfig.name}
        </h1>

        <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: 'var(--font-size-lg)' }}>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Welcome to <strong>{siteConfig.name}</strong> – where independent journalism meets insightful storytelling. 
            {siteConfig.description} We believe in going beyond the headlines to bring you stories that matter, told with depth, context, and integrity.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Our Mission
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            In an era of information overload, {siteConfig.name} stands as a beacon of thoughtful journalism.
            We&apos;re not just another news outlet – we&apos;re a platform dedicated to uncovering the stories that shape our world,
            providing you with the context and insight you need to understand complex issues.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            What We Stand For
          </h2>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-sm)' }}>
              <strong>Independent Journalism:</strong> We maintain editorial independence, ensuring our reporting is free from bias and external influence.
            </li>
            <li style={{ marginBottom: 'var(--space-sm)' }}>
              <strong>Depth Over Speed:</strong> While others chase breaking news, we take the time to thoroughly investigate and provide comprehensive coverage.
            </li>
            <li style={{ marginBottom: 'var(--space-sm)' }}>
              <strong>Context is Key:</strong> Every story is presented with the historical, political, and social context it deserves.
            </li>
            <li style={{ marginBottom: 'var(--space-sm)' }}>
              <strong>Visual Storytelling:</strong> Through our dedicated photo stories and video journalism, we bring you closer to the ground reality.
            </li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Our Coverage
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We provide comprehensive coverage focusing on <strong>global events</strong>. 
            From on-the-ground reporting and political analysis to visual journalism and long-form features, 
            our team focuses on stories that have a real impact on people&apos;s lives and challenge established narratives.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Get in Touch
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We value your feedback and tips. Whether you want to pitch a story, report an issue, or just say hello, we are always listening.
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)', listStyleType: 'none', marginLeft: 0 }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>
              📧 <strong>General Inquiries:</strong> <a href={`mailto:${contactConfig.general}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{contactConfig.general}</a>
            </li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>
              📝 <strong>Editorial Pitches:</strong> <a href={`mailto:${contactConfig.editorial}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{contactConfig.editorial}</a>
            </li>
          </ul>

          <p style={{ marginTop: 'var(--space-2xl)', padding: 'var(--space-lg)', background: 'var(--color-surface)', borderLeft: '4px solid var(--color-primary)', borderRadius: '4px' }}>
            <strong>Our Commitment:</strong> We are committed to journalistic excellence, transparency, and serving the public interest.
            Every story we publish undergoes rigorous fact-checking and editorial review to ensure accuracy and integrity.
          </p>
        </div>
      </article>
    </main>
  )
}
