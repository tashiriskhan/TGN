import { Metadata } from 'next'
import { siteConfig, contactConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Corrections Policy',
  description: `The corrections policy and error reporting procedures of ${siteConfig.name}.`,
}

export default function CorrectionsPolicyPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)', fontFamily: 'var(--font-playfair)' }}>
          Corrections Policy
        </h1>
        
        <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-lg)', fontStyle: 'italic' }}>
          Effective Date: May 22, 2026
        </p>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            1. Our Commitment to Accuracy
          </h2>
          <p>
            At <strong>{siteConfig.name}</strong>, we strive for complete accuracy in all our reports, articles, photography captions, and videos. Despite our rigorous editing and fact-checking processes, errors can occasionally occur. When they do, we are committed to correcting them promptly, transparently, and clearly.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            2. Reporting an Error
          </h2>
          <p>
            We welcome our readers and the public to report any factual inaccuracies in our reporting. If you believe a story contains a factual error or is in need of correction, please reach out to us at our editorial desk:
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            📧 <strong>Editorial Corrections:</strong> <a href={`mailto:${contactConfig.editorial}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{contactConfig.editorial}</a>
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            Please include the title of the article, the URL link, the specific sentence or fact in question, and any supporting evidence or documentation.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            3. Clarifications and Updates
          </h2>
          <p>
            When we publish a correction, we append a clear, timestamped note to the bottom of the article. This note details the original error, the corrected information, and the date the change was made.
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            * <strong>Corrections:</strong> Applied when there is a significant factual error (e.g., wrong name, date, statistic, or timeline).
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            * <strong>Clarifications:</strong> Applied when the original text was technically correct but phrased in a way that was misleading or lacked crucial context.
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            * <strong>Updates:</strong> Applied to ongoing breaking stories to reflect newly verified facts as they develop. These are marked clearly with an "Update" banner.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            4. Social Media and Syndication
          </h2>
          <p>
            If a factual error is shared on our official social media channels, we will post a correction or retraction on the same platform as soon as the correct information is verified, and delete or update the erroneous post where possible to prevent the spread of misinformation.
          </p>
        </section>
      </article>
    </main>
  )
}
