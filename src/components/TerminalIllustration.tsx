import { Code2, Fingerprint, ShieldCheck, Terminal } from 'lucide-react'

export function TerminalIllustration() {
  return (
    <div
      className="hero-visual"
      aria-label="Illustration of a developer terminal and connected security concepts"
      role="img"
    >
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <svg className="network-lines" viewBox="0 0 520 480" fill="none" aria-hidden="true">
        <path d="M65 102h100l40 70h120l70-70h70M55 350h95l45-70h155l45 70h80M260 35v100M260 345v100" />
        <circle cx="65" cy="102" r="4" />
        <circle cx="465" cy="102" r="4" />
        <circle cx="55" cy="350" r="4" />
        <circle cx="475" cy="350" r="4" />
        <circle cx="260" cy="35" r="4" />
        <circle cx="260" cy="445" r="4" />
      </svg>
      <div className="floating-label floating-top">
        <ShieldCheck size={17} /> security-minded
      </div>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>
            <Terminal size={12} /> ranger@portfolio: ~
          </span>
          <span className="terminal-header-end">⌘</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-command">
            <span>~</span> whoami
          </div>
          <div className="terminal-name">
            Ranger Wagayen<span className="text-accent">.</span>
          </div>
          <div className="terminal-comment">// always learning. always building.</div>
          <div className="terminal-code">
            <span className="code-purple">const</span> developer = {'{'}
          </div>
          <div className="terminal-code indent">
            focus: <span className="code-cyan">"computer security"</span>,
          </div>
          <div className="terminal-code indent">
            mindset: <span className="code-cyan">"curious & hands-on"</span>,
          </div>
          <div className="terminal-code indent">
            status: <span className="code-green">"open to OJT"</span>
          </div>
          <div className="terminal-code">{'};'}</div>
          <div className="terminal-bottom">
            <span className="text-accent">❯</span> ready to learn
            <span className="cursor" />
          </div>
        </div>
        <div className="terminal-status">
          <span>
            <span className="status-dot" /> learning in progress
          </span>
          <span>UTF-8</span>
        </div>
      </div>
      <div className="fingerprint-node">
        <Fingerprint size={35} strokeWidth={1.3} />
      </div>
      <div className="floating-label floating-bottom">
        <Code2 size={17} /> built with curiosity
      </div>
      <span className="visual-caption">A mindset at the intersection of code & security</span>
    </div>
  )
}
