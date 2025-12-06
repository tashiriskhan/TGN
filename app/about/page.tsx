import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Ground Narrative - Stories That See Beyond Headlines',
}

export default function AboutPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
          About The Ground Narrative
        </h1>

        <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: 'var(--font-size-lg)' }}>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Welcome to <strong>The Ground Narrative</strong> – where independent journalism meets insightful storytelling.
            We believe in going beyond the headlines to bring you stories that matter, told with depth, context, and integrity.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Our Mission
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            In an era of information overload, The Ground Narrative stands as a beacon of thoughtful journalism.
            We're not just another news outlet – we're a platform dedicated to uncovering the stories that shape our world,
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
              <strong>Multiple Perspectives:</strong> We believe in presenting diverse viewpoints to help you form your own informed opinions.
            </li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Our Coverage
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            From breaking news to in-depth features, from politics to technology, from local stories to global events –
            our team of experienced journalists and writers brings you coverage across a wide range of topics.
            We focus on stories that have real impact on people's lives.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Join Our Community
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            The Ground Narrative is more than a news website – it's a community of curious minds who value quality journalism.
            We encourage you to engage with our content, share your thoughts, and be part of the conversation.
          </p>

          <p style={{ marginTop: 'var(--space-2xl)', padding: 'var(--space-lg)', background: 'var(--color-surface)', borderLeft: '4px solid var(--color-primary)', borderRadius: '4px' }}>
            <strong>Our Commitment:</strong> We are committed to journalistic excellence, transparency, and serving the public interest.
            Every story we publish undergoes rigorous fact-checking and editorial review to ensure accuracy and integrity.
          </p>
        </div>
      </article>
    </main>
  )
}
