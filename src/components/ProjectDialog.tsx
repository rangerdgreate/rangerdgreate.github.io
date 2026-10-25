import { useEffect, useRef } from 'react'
import { ArrowUpRight, Check, LockKeyhole, X } from 'lucide-react'
import type { Project } from '../data/projects'

export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (project && dialog) {
      previousFocus.current = document.activeElement as HTMLElement
      dialog.showModal()
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        dialog.close()
        document.body.style.overflow = previousOverflow
        previousFocus.current?.focus()
      }
    }
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {project && (
        <div className="dialog-inner">
          <div className="dialog-top">
            <span className="eyebrow">Project overview</span>
            <button
              className="icon-button"
              aria-label="Close project overview"
              onClick={onClose}
              autoFocus
            >
              <X />
            </button>
          </div>
          <span className="pill">{project.category}</span>
          <h2 id="project-dialog-title">{project.fullName}</h2>
          <p className="project-role">{project.role}</p>
          <p>{project.summary}</p>
          <h3>
            {project.id === 'webguard'
              ? 'Contribution & project context'
              : 'What the project explores'}
          </h3>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <h3>Technologies & components</h3>
          <div className="tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <p className="project-note">{project.note}</p>
          {project.repository ? (
            <a
              className="button button-primary"
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub <ArrowUpRight size={17} />
            </a>
          ) : (
            <div className="private-note">
              <LockKeyhole size={16} />
              <span>Private repository · Public project overview only</span>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
