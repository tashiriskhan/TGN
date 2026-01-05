import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Ground Narrative team',
}

export default function ContactPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
          Contact Us
        </h1>

        <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: 'var(--font-size-lg)' }}>
          <p style={{ marginBottom: 'var(--space-2xl)' }}>
            We value your feedback, questions, and story tips. The Ground Narrative team is here to help.
            Reach out to us through any of the following channels: We value your feedback, questions, and story tips.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-xl)', marginBottom: 'var(--space-2xl)' }}>
            <div style={{ background: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-text)' }}>
                General Inquiries
              </h3>
              <p style={{ marginBottom: 'var(--space-sm)' }}>
                For general questions, feedback, or suggestions:
              </p>
              <a href="mailto:info@groundnarrative.com" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                info@groundnarrative.com
              </a>
            </div>

            <div style={{ background: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-text)' }}>
                Editorial Team
              </h3>
              <p style={{ marginBottom: 'var(--space-sm)' }}>
                For story tips, press releases, or editorial matters:
              </p>
              <a href="mailto:editorial@groundnarrative.com" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                editorial@groundnarrative.com
              </a>
            </div>

            <div style={{ background: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-text)' }}>
                Media &amp; Press
              </h3>
              <p style={{ marginBottom: 'var(--space-sm)' }}>
                For media inquiries and press related questions:
              </p>
              <a href="mailto:press@groundnarrative.com" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                press@groundnarrative.com
              </a>
            </div>

            <div style={{ background: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-text)' }}>
                Business &amp; Partnerships
              </h3>
              <p style={{ marginBottom: 'var(--space-sm)' }}>
                For advertising, partnerships, and business opportunities:
              </p>
              <a href="mailto:business@groundnarrative.com" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                business@groundnarrative.com
              </a>
            </div>
          </div>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            Follow Us
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Stay connected and get the latest updates:
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>Twitter</a>
            <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>Facebook</a>
            <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>
            <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>Instagram</a>
          </div>

          <div style={{ marginTop: 'var(--space-2xl)', padding: 'var(--space-lg)', background: 'rgba(0, 0, 0, 0.03)', borderRadius: '8px' }}>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>
              Response Time
            </h3>
            <p>
              We strive to respond to all inquiries within 24-48 hours during business days.
              For urgent matters, please indicate "URGENT" in your email subject line.
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
