import {
  ArrowUpRight,
  ArrowRight,
  Blocks,
  Globe2,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
} from 'lucide-react'
import type { Project } from '../data/projects'

export function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project
  featured?: boolean
  onOpen: (p: Project) => void
}) {
  const Icon =
    { cyberscan: ScanLine, shopora: Globe2, webguard: ShieldCheck, stellar: Blocks }[project.id] ??
    Blocks
  return (
    <article
      className={`project-card project-${project.id} ${featured ? 'project-featured' : ''}`}
      data-reveal
    >
      <div className="project-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="art-orbit art-orbit-one" />
        <div className="art-orbit art-orbit-two" />
        <div className="project-symbol">
          <Icon size={featured ? 54 : 42} strokeWidth={1.1} />
        </div>
        <span className="art-corner">
          {project.id === 'cyberscan'
            ? 'SECURITY × CURIOSITY'
            : project.id === 'shopora'
              ? 'COMMERCE × CONNECTION'
              : project.id === 'webguard'
                ? 'LEADERSHIP × SECURITY'
                : 'LEARN × EXPLORE'}
        </span>
        <span className="concept-label">Concept illustration</span>
        {featured && (
          <span className="featured-label">
            <span className="status-dot" /> In focus
          </span>
        )}
      </div>
      <div className="project-content">
        <div className="project-topline">
          <span className="eyebrow">{project.category}</span>
          <span className="visibility">
            {project.visibility === 'Private' && <LockKeyhole size={11} />} {project.visibility}{' '}
            repository
          </span>
        </div>
        <h3>
          {project.name}
          <span className="text-accent">.</span>
        </h3>
        <p className="project-role">{project.role}</p>
        <p className="project-summary">{project.summary}</p>
        <div className="tags">
          {project.technologies.slice(0, featured ? 5 : 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
          {project.technologies.length > (featured ? 5 : 4) && (
            <span aria-label="More technologies in project details">
              +{project.technologies.length - (featured ? 5 : 4)}
            </span>
          )}
        </div>
        <div className="project-actions">
          <button className="text-button" onClick={() => onOpen(project)}>
            Project overview <ArrowUpRight size={17} />
            <span className="sr-only">: {project.name}</span>
          </button>
          {project.website && (
            <a href={project.website} target="_blank" rel="noopener noreferrer">
              Visit Website <ArrowUpRight size={17} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.repository && (
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
