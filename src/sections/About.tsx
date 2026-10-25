import { ArrowUpRight, BookOpen, GraduationCap, MapPin, Shield, Users } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

export function About() {
  return (
    <section id="about" className="section section-anchor" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow="A little about me"
          title="Curiosity is where"
          accent="it starts."
        />
        <div className="about-layout">
          <div className="about-copy" data-reveal>
            <h3 id="about-title">
              A student today.
              <br />A lifelong learner, always.
            </h3>
            <p>
              I’m a fourth-year BS Information Technology student majoring in Computer Security at{' '}
              <strong>{profile.university}</strong>. I’m drawn to how technology works—and how we
              can make it work more securely.
            </p>
            <p>
              My interests span cybersecurity, web application development, networking, Linux
              systems, security testing, and practical software solutions. I learn through
              independent projects, academic coursework, and hands-on seminars.
            </p>
            <p>
              I’ve independently built software using{' '}
              <strong>AI-assisted development workflows</strong>, using these projects to develop my
              understanding of application structure and development tools. As Project Manager for
              our group capstone, I also gained experience in planning, coordination, and
              documentation.
            </p>
            <p>
              I’m now looking for an OJT opportunity to apply what I’ve learned, gain professional
              experience, and contribute to real IT operations.
            </p>
            <a className="text-link" href="#contact">
              Let’s start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
          <aside className="education-card" data-reveal>
            <div className="education-top">
              <GraduationCap size={27} />
              <span className="eyebrow">My education</span>
            </div>
            <div className="education-monogram" aria-hidden="true">
              AU<span>PHINMA EDUCATION</span>
            </div>
            <h3>{profile.university}</h3>
            <p>{profile.degree}</p>
            <div className="education-details">
              <span>
                <Shield size={17} /> Major in Computer Security
              </span>
              <span>
                <BookOpen size={17} /> Fourth-Year Student
              </span>
              <span>
                <MapPin size={17} /> PHINMA AU
              </span>
            </div>
            <div className="education-bottom">
              <Users size={17} />
              <span>Capstone Project Manager</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
