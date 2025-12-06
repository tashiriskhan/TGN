import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for using The Ground Narrative website',
}

export default function TermsPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
          Terms & Conditions
        </h1>

        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', fontSize: 'var(--font-size-sm)' }}>
          Last updated: December 6, 2025
        </p>

        <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: 'var(--font-size-base)' }}>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Welcome to The Ground Narrative. These Terms and Conditions ("Terms") govern your use of our website located at groundnarrative.com (the "Service") operated by The Ground Narrative ("us", "we", or "our").
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            2. Use License
          </h2>
          <p style={{ marginBottom: 'var(--space-sm)' }}>
            Permission is granted to temporarily download one copy of the materials on The Ground Narrative's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Modify or copy the materials</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Use the materials for any commercial purpose or for any public display</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            3. Content and Copyright
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            All content on this website, including articles, images, videos, graphics, logos, and other materials, is the property of The Ground Narrative or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            4. User-Generated Content
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            When you submit comments, feedback, or other content to our website ("User Content"), you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and sub-licensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content.
          </p>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            You represent and warrant that you own or have the necessary rights to submit the User Content and that your User Content does not violate any law or regulation.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            5. Disclaimer
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, The Ground Narrative:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--spaceExcludes all representations-xs)' }}> and warranties relating to this website and its contents</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Does not warrant that the functions contained in the website will be uninterrupted or error-free</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Will not be liable for any loss or damage howsoever arising as a result of use of this website</li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            6. Accuracy of Information
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, reliability, completeness, or timeliness of the content on this website. Information may contain typographical errors or inaccuracies.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            7. Privacy
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Your privacy is important to us. Please review our <Link href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy</Link>, which also governs your use of the Service, to understand our practices.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            8. Prohibited Uses
          </h2>
          <p style={{ marginBottom: 'var(--space-sm)' }}>
            You may not use our website:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To submit false or misleading information</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To upload or transmit viruses or any other type of malicious code</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>For any obscene or immoral purpose</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To interfere with or circumvent the security features of the Service</li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            9. Limitation of Liability
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            In no event shall The Ground Narrative, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            10. Indemnification
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            You agree to defend, indemnify, and hold harmless The Ground Narrative and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            11. Termination
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            12. Changes to Terms
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            13. Governing Law
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            These Terms shall be interpreted and governed by the laws of the jurisdiction in which The Ground Narrative operates, without regard to its conflict of law provisions.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            14. Contact Information
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: '8px', marginBottom: 'var(--space-md)' }}>
            <p><strong>Email:</strong> legal@groundnarrative.com</p>
            <p><strong>Address:</strong> The Ground Narrative, Legal Department</p>
          </div>
        </div>
      </article>
    </main>
  )
}
