"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  category?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "editorial", label: "Story Tips & Editorial" },
    { value: "partnerships", label: "Partnerships & Business" },
    { value: "media", label: "Media & Press" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-success">
        <div className="success-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2>Message Sent Successfully!</h2>
        <p>
          Thank you for reaching out. We'll get back to you within 24-48 hours.
        </p>
        <button
          className="btn-reset"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              subject: "",
              category: "general",
              message: "",
            });
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className={`form-group ${focusedField === "name" ? "focused" : ""}`}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            placeholder="John Doe"
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className={`form-group ${focusedField === "email" ? "focused" : ""}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="john@example.com"
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div
          className={`form-group ${focusedField === "subject" ? "focused" : ""}`}
        >
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            placeholder="What's this about?"
            className={errors.subject ? "error" : ""}
          />
          {errors.subject && (
            <span className="error-message">{errors.subject}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="select-wrapper">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onFocus={() => setFocusedField("category")}
              onBlur={() => setFocusedField(null)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div
        className={`form-group full-width ${
          focusedField === "message" ? "focused" : ""
        }`}
      >
        <label htmlFor="message">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          placeholder="Tell us what's on your mind..."
          rows={6}
          className={errors.message ? "error" : ""}
        />
        {errors.message && (
          <span className="error-message">{errors.message}</span>
        )}
      </div>

      <button
        type="submit"
        className={`btn-submit ${isSubmitting ? "submitting" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
