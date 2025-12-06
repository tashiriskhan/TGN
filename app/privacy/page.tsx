import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for The Ground Narrative',
}

export default function PrivacyPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 700, marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>
          Privacy Policy
        </h1>

        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)', fontSize: 'var(--font-size-sm)' }}>
          Last updated: December 6, 2025
        </p>

        <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: 'var(--font-size-base)' }}>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            At The Ground Narrative, we are committed to protecting your privacy and ensuring the security of your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            1. Information We Collect
          </h2>

          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)' }}>
            Personal Information
          </h3>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Subscribe to our newsletter</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Contact us via email or contact forms</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Comment on articles</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Create an account</li>
          </ul>

          <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)' }}>
            Automatically Collected Information
          </h3>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            When you visit our website, we automatically collect certain information, including:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>IP address</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Browser type and version</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Device information</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Pages visited</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Time and date of visit</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Referring website</li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: 'var(--space-sm)' }}>
            We use the collected information for the following purposes:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To provide and maintain our website</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To send newsletters and updates (with your consent)</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To respond to your inquiries and provide customer support</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To analyze website usage and improve our content</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To detect and prevent fraud or abuse</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>To comply with legal obligations</li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            3. Cookies and Tracking
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Our website uses cookies and similar tracking technologies to enhance your browsing experience.
            Cookies are small files stored on your device that help us:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Remember your preferences</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Understand how you use our website</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Provide personalized content</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Measure website performance</li>
          </ul>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            4. Third-Party Services
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We may use third-party services to enhance our website functionality and analyze usage:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Analytics services (e.g., Google Analytics)</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Email service providers</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Content delivery networks</li>
          </ul>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            These third parties have access to certain information only to perform tasks on our behalf and are obligated not to disclose or use the information for any other purpose.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            5. Data Security
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, or destruction.
            alteration, disclosure, However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            6. Your Rights
          </h2>
          <p style={{ marginBottom: 'var(--space-sm)' }}>
            Depending on your location, you may have the following rights:
          </p>
          <ul style={{ marginBottom: 'var(--space-md)', paddingLeft: 'var(--space-lg)' }}>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Access your personal information</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Correct inaccurate information</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Delete your personal information</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Restrict or object to processing</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Data portability</li>
            <li style={{ marginBottom: 'var(--space-xs)' }}>Withdraw consent</li>
          </ul>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            7. Children's Privacy
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
            If we become aware that we have collected such information, we will take steps to delete it promptly.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            8. Changes to This Policy
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            We encourage you to review this Privacy Policy periodically.
          </p>

          <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600, marginTop: 'var(--space-2xl)', marginBottom: 'var(--space-md)' }}>
            9. Contact Us
          </h2>
          <p style={{ marginBottom: 'var(--space-md)' }}>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-lg)', borderRadius: '8px', marginBottom: 'var(--space-md)' }}>
            <p><strong>Email:</strong> privacy@groundnarrative.com</p>
            <p><strong>Address:</strong> The Ground Narrative, Privacy Department</p>
          </div>
        </div>
      </article>
    </main>
  )
}
