"use client";

import { useState, FormEvent } from "react";

// Replace with your Google Apps Script Web App URL for newsletter
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwKxfrXXtwd2k9y1kdfXdS3rJ231dP7cXjMvzAGWcHIvWigTCvZk1w432jNz6L6DYq/exec";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const formBody = new URLSearchParams({
        email: email,
        timestamp: new Date().toISOString(),
      });

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });

      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="footer-newsletter">
        <p className="newsletter-label">Subscribe to our newsletter</p>
        <div className="newsletter-success">
          Thanks for subscribing!
        </div>
      </div>
    );
  }

  return (
    <div className="footer-newsletter">
      <p className="newsletter-label">Subscribe to our newsletter</p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          className="newsletter-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          required
        />
        <button
          type="submit"
          className="newsletter-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : "Subscribe"}
        </button>
      </form>
      {error && <p className="newsletter-error">{error}</p>}
    </div>
  );
}
