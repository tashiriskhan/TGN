import { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import SocialIcons from "@/app/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with The Ground Narrative team",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Have a story tip, feedback, or just want to say hello? We'd love to
            hear from you.
          </p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>
                Fill out the form below and we'll get back to you within 24-48
                hours.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <aside className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>info@groundnarrative.com</p>
              <span className="info-note">We respond within 24-48 hours</span>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Response Time</h3>
              <p>24-48 hours</p>
              <span className="info-note">Business days only</span>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>Global Reporting Desk</h3>
              <p>Independent & Decentralized</p>
              <span className="info-note">Covering Stories Worldwide</span>
            </div>

            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links-vertical">
                <SocialIcons showToggle={true} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
