import { ArrowDown, ArrowDownToLine, ArrowRight, Github, Mail } from 'lucide-react'
import { profile, interests } from '../data/profile'
import { TerminalIllustration } from '../components/TerminalIllustration'

export function Hero() {
  return (
    <section id="home" className="hero section-anchor" aria-labelledby="hero-heading">
      <div className="hero-grid-background" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <a className="availability" href="#contact">
            <span className="status-dot" /> Open to OJT opportunities <ArrowUpRightSmall />
          </a>
          <p className="hero-hello">HELLO WORLD, I’M</p>
          <h1 id="hero-heading">
            Ranger Aganon
            <br />{' '}
            <span>
              F. Wagayen<span className="name-dot">.</span>
            </span>
          </h1>
          <p className="hero-headline">
            Fourth-Year IT Student <span>|</span> Computer Security Major
          </p>
          <p className="hero-mantra">
            Building with purpose.
            <br />
            <span>Thinking security.</span>
          </p>
          <p className="hero-description">{profile.introduction}</p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#projects">
              Explore My Projects <ArrowRight size={17} />
            </a>
            <a
              className="button button-secondary"
              href={__RESUME_AVAILABLE__ ? profile.resumeUrl : '#resume'}
              download={__RESUME_AVAILABLE__ || undefined}
            >
              <ArrowDownToLine size={16} />
              {__RESUME_AVAILABLE__ ? 'Download Resume' : 'View Resume'}
            </a>
          </div>
          <div className="hero-social">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Ranger Wagayen on GitHub"
            >
              <Github size={20} />
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
            <span className="hero-social-divider" />
            <span>Curious mind. Practical solutions.</span>
          </div>
        </div>
        <TerminalIllustration />
      </div>
      <div className="container hero-footer">
        <div className="interest-list">
          {interests.map((interest, i) => (
            <span key={interest} style={{ animationDelay: `${i * 100}ms` }}>
              <span>+</span> {interest}
            </span>
          ))}
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to About">
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  )
}
function ArrowUpRightSmall() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
