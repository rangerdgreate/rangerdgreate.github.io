import { ArrowUpRight, Copy, Check, Github, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

export function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('Email copied')
    } catch {
      setCopyStatus('Could not copy. Select the email address to copy it.')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyStatus(''), 5000)
  }
  return (
    <section
      id="contact"
      className="section contact-section section-anchor"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact-panel" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <div className="eyebrow">
            <span>06 /</span> Let’s connect
          </div>
          <span className="availability contact-availability">
            <span className="status-dot" /> Open to OJT opportunities
          </span>
          <h2 id="contact-title">
            Good things start with
            <br />
            <span className="text-accent">a conversation.</span>
          </h2>
          <p>
            I’m currently seeking On-the-Job Training opportunities where I can apply my technical
            knowledge, learn from experienced IT professionals, and contribute to meaningful
            projects.
          </p>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href={`mailto:${profile.email}?subject=OJT%20Opportunity`}
            >
              <Mail size={18} /> Say Hello <ArrowUpRight size={17} />
            </a>
            <a
              className="button button-secondary"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} /> Connect on GitHub <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="contact-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button className="icon-button" onClick={copyEmail} aria-label="Copy email address">
              {copyStatus === 'Email copied' ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
          <span className="copy-status" role="status">
            {copyStatus}
          </span>
        </div>
      </div>
    </section>
  )
}
