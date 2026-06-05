import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Ethics Statement',
  description: `The journalistic ethics, conflict reporting guidelines, and publishing standards of ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/ethics-statement`,
  },
}

export default function EthicsStatementPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)', fontFamily: 'var(--font-playfair)' }}>
          Ethics Statement
        </h1>
        
        <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-lg)', fontStyle: 'italic' }}>
          Effective Date: May 22, 2026
        </p>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            1. Core Principles
          </h2>
          <p>
            At <strong>{siteConfig.name}</strong>, we believe that responsible journalism is essential for a just and democratic society. Our reporters, editors, videographers, and photojournalists operate under four core principles: seeking truth and reporting it, minimizing harm, acting independently, and remaining accountable.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            2. Conflict Zone and Crisis Reporting
          </h2>
          <p>
            Reporting from war zones, crisis centers, and regions of active conflict requires exceptional ethical sensitivity. Our primary directive in these environments is the preservation of human life and the safety of our team and sources. 
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            * <strong>Minimizing Harm:</strong> We do not publish details that could put individuals, activists, or families at risk of retaliation or physical harm.
          </p>
          <p style={{ marginTop: 'var(--space-sm)' }}>
            * <strong>Graphic Content:</strong> We document the harsh realities of conflict, but we do not use sensationalized or gratuitous imagery. Graphic photos or videos are only used when they provide vital evidence of historical events, and are accompanied by appropriate warning labels.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            3. Fairness and Respect for Privacy
          </h2>
          <p>
            Our team treats all subjects of our reporting with respect. We avoid stereotypes, show compassion to victims of trauma or tragedy, and respect private individuals&apos; right to privacy, balancing it against the public interest. We make a sincere effort to contact any individual, group, or organization that is the subject of critical reporting to give them a fair opportunity to respond before publication.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            4. Plagiarism and Content Originality
          </h2>
          <p>
            We maintain zero tolerance for plagiarism, fabrication of information, or altered imagery. All quotes, data, and visual materials must be original, fully credited to their respective creators, or properly sourced. Photo essays and documentaries are never digitally altered or staged to manipulate the narrative.
          </p>
        </section>
      </article>
    </main>
  )
}
