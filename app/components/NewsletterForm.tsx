'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form-compact">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="newsletter-input-compact"
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        className="newsletter-submit-compact"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? '...' : 'Subscribe'}
      </button>
      {message && (
        <p
          className={`newsletter-message ${
            status === 'success' ? 'newsletter-success' : 'newsletter-error'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
