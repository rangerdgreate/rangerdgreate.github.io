import { useEffect, useState } from 'react'
import { ArrowUp, ArrowUpRight, Github } from 'lucide-react'
import { Navigation } from './components/Navigation'
import { ProjectDialog } from './components/ProjectDialog'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Credentials } from './sections/Credentials'
import { Resume } from './sections/Resume'
import { Contact } from './sections/Contact'
import { profile } from './data/profile'
import type { Project } from './data/projects'

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
      },
      { threshold: 0.08 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects onOpen={setSelectedProject} />
        <Credentials />
        <Resume />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#home" className="brand">
            <span className="brand-mark">
              r<span>.</span>
            </span>
            <span>
              ranger<span className="text-muted">.dev</span>
            </span>
          </a>
          <p>
            © {new Date().getFullYear()} {profile.shortName}. Built with curiosity & care.
          </p>
          <div className="footer-links">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={17} />
              <ArrowUpRight size={13} />
            </a>
            <a href="#home" className="back-to-top">
              Back to top <ArrowUp size={15} />
            </a>
          </div>
        </div>
      </footer>
      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
