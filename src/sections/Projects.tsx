import { ArrowUpRight, Github } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { profile } from '../data/profile'

export function Projects({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section id="projects" className="section section-anchor" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading
            number="03"
            eyebrow="Selected work"
            title="Learning by"
            accent="building."
            description="From security exploration to full-stack applications—each project is a step forward."
          />
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link">
            <Github size={17} /> My GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        <h3 className="subsection-label" id="projects-title">
          <span /> Featured Projects <span className="subsection-rule" /> 01—03
        </h3>
        <div className="projects-grid">
          {projects
            .filter((project) => !project.training)
            .map((project, i) => (
              <ProjectCard project={project} featured={i === 0} key={project.id} onOpen={onOpen} />
            ))}
        </div>
        <h3 className="subsection-label training-title">
          <span /> Training & Exploration <span className="subsection-rule" /> 04
        </h3>
        <div className="training-grid">
          {projects
            .filter((project) => project.training)
            .map((project) => (
              <ProjectCard project={project} key={project.id} onOpen={onOpen} />
            ))}
        </div>
      </div>
    </section>
  )
}
