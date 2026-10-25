import { ArrowDownToLine, ArrowUpRight, FileText, Printer } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { profile } from '../data/profile'

export function Resume() {
  return (
    <section id="resume" className="section section-anchor" aria-labelledby="resume-title">
      <div className="container resume-layout">
        <div className="resume-intro">
          <SectionHeading
            number="05"
            eyebrow="The next chapter"
            title="Ready to learn."
            accent="Ready to contribute."
            description="Seeking hands-on experience in cybersecurity, IT support, networking, systems administration, or software development."
          />
          {__RESUME_AVAILABLE__ ? (
            <a className="button button-primary" href={profile.resumeUrl} download>
              <ArrowDownToLine size={17} /> Download My Resume
            </a>
          ) : (
            <>
              <button className="button button-secondary" onClick={() => window.print()}>
                <Printer size={17} /> Print Resume Summary
              </button>
              <p className="resume-availability">
                PDF coming soon. Read the summary here or{' '}
                <a href={`mailto:${profile.email}?subject=OJT%20Resume%20Request`}>
                  request my resume <ArrowUpRight size={13} />
                </a>
                .
              </p>
            </>
          )}
        </div>
        <article className="resume-paper" data-reveal>
          <div className="resume-paper-top">
            <span className="eyebrow">Resume summary</span>
            <FileText size={22} />
          </div>
          <h3 id="resume-title">{profile.name}</h3>
          <p className="resume-role">Fourth-Year IT Student · Computer Security Major</p>
          <p className="resume-print-contact">{profile.email} · github.com/rangerdgreate</p>
          <div className="resume-divider" />
          <h4>Career objective</h4>
          <p>{profile.objective}</p>
          <div className="resume-facts">
            <div>
              <span className="eyebrow">Education</span>
              <strong>BS Information Technology</strong>
              <span>{profile.university}</span>
              <span>Major in Computer Security · Fourth Year</span>
            </div>
            <div>
              <span className="eyebrow">Experience through</span>
              <strong>Independent & academic projects</strong>
              <span>AI-assisted development</span>
              <span>Group capstone project management</span>
              <span>Hands-on technical seminars</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
