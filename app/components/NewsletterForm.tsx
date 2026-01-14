"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 3000);
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
          required
        />
        <button type="submit" className="newsletter-btn">
          Subscribe
        </button>
      </form>
    </div>
  );
}
