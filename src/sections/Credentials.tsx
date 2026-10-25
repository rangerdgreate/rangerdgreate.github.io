import { ArrowUpRight, Award, BadgeCheck } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { credentialDates, credentials } from '../data/credentials'

export function Credentials() {
  return (
    <section
      id="certifications"
      className="section section-tinted section-anchor"
      aria-labelledby="credentials-title"
    >
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="Continuing to learn"
          title="Knowledge, backed by"
          accent="credentials."
          description="Oracle certifications that complement my academic and project-based learning."
        />
        <h3 id="credentials-title" className="sr-only">
          Certifications & Credentials
        </h3>
        <div className="credentials-grid">
          {credentials.map((credential) => (
            <article key={credential.code} className="credential-card" data-reveal>
              <div className="credential-card-top">
                <span className="issuer-label">ORACLE</span>
                <span className="credential-index">/{credential.code}</span>
              </div>
              <div className="credential-art">
                {credential.image ? (
                  <img
                    src={credential.image}
                    alt={`Official ${credential.subject} certification badge`}
                    loading="lazy"
                    width="76"
                    height="76"
                  />
                ) : (
                  <div className="credential-icon">
                    <Award size={33} strokeWidth={1.3} />
                  </div>
                )}
                <div>
                  <span className="eyebrow">Foundations Associate</span>
                  <span className="credential-subject">{credential.subject}</span>
                </div>
              </div>
              <h3>{credential.title}</h3>
              <dl className="credential-dates">
                <div>
                  <dt>Issued</dt>
                  <dd>
                    <time dateTime="2025-09-11">{credentialDates.issued}</time>
                  </dd>
                </div>
                <div>
                  <dt>Valid until</dt>
                  <dd>
                    <time dateTime="2027-09-11">{credentialDates.expires}</time>
                  </dd>
                </div>
              </dl>
              <a
                href={credential.url}
                target="_blank"
                rel="noopener noreferrer"
                className="credential-link"
              >
                <BadgeCheck size={16} /> Verify Credential <ArrowUpRight size={16} />
                <span className="sr-only">: {credential.subject}</span>
              </a>
            </article>
          ))}
        </div>
        <p className="credential-footnote">
          <BadgeCheck size={15} /> Credentials are issued to “Ranger Wagayen.” Use the Oracle links
          to view the original issued credentials.
        </p>
      </div>
    </section>
  )
}
