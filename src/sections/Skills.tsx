import { Braces, Database, Network, Server } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { skillGroups } from '../data/profile'

const icons = { code: Braces, security: Network, database: Database, virtualization: Server }
export function Skills() {
  return (
    <section
      id="skills"
      className="section section-tinted section-anchor"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="My toolkit"
          title="Skills I’m putting"
          accent="into practice."
          description="A growing foundation, strengthened through coursework, exploration, and hands-on projects."
        />
        <h3 id="skills-title" className="sr-only">
          Technical skills
        </h3>
        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = icons[group.id]
            return (
              <article className={`skill-card skill-${group.id}`} key={group.id} data-reveal>
                <div className="skill-icon">
                  <Icon size={23} strokeWidth={1.5} />
                </div>
                <h3>{group.title}</h3>
                <p>{group.caption}</p>
                <div className="skill-badges">
                  {group.skills.map((skill) => (
                    <span key={skill}>
                      <span className="skill-bullet" />
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
