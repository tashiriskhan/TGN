import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: `The editorial standards, journalistic integrity policies, and sourcing guidelines of ${siteConfig.name}.`,
}

export default function EditorialPolicyPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)', fontFamily: 'var(--font-playfair)' }}>
          Editorial Policy
        </h1>
        
        <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-lg)', fontStyle: 'italic' }}>
          Effective Date: May 22, 2026
        </p>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            1. Our Commitment to Integrity
          </h2>
          <p>
            At <strong>{siteConfig.name}</strong>, we are committed to providing independent, accurate, and comprehensive journalism. Our goal is to bring deep context and a human perspective to international conflicts, geopolitics, global politics, culture, and social developments. We hold ourselves to the highest ethical and professional standards of digital publishing.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            2. Editorial Independence
          </h2>
          <p>
            Our editorial team operates with complete independence. We do not accept payment, sponsorship, or gifts in exchange for coverage, nor do we permit advertisers, corporate entities, or political organizations to influence our reporting or visual storytelling. Any sponsored content, partnership, or cooperative project is clearly labeled as such to ensure full transparency.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            3. Fact-Checking and Verification
          </h2>
          <p>
            Accuracy is the foundation of our work. Every story, documentary, photo essay, and podcast episode undergoes a strict verification and editing process before publication. Our journalists verify all information from primary sources, official documents, and expert analyses. We do not publish unsubstantiated rumors or unverified social media claims as verified facts.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            4. Sources and Sourcing
          </h2>
          <p>
            We strive to identify our sources of information whenever possible. Transparent sourcing allows readers to evaluate the credibility of our coverage. When anonymous sources must be used—typically to protect the safety of journalists or whistleblowers in conflict zones—the decision is made under strict editorial supervision, and the reasons for anonymity are explained in the story.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-playfair)' }}>
            5. Content Diversity and Representation
          </h2>
          <p>
            As a global digital journalism platform, we actively seek out and include diverse voices and perspectives, particularly those from marginalized communities or areas experiencing complex conflicts. We are dedicated to providing fair and balanced coverage that treats all individuals with dignity and respect.
          </p>
        </section>
      </article>
    </main>
  )
}
