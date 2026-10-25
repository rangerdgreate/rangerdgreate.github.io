type Props = {
  number: string
  eyebrow: string
  title: string
  accent?: string
  description?: string
}

export function SectionHeading({ number, eyebrow, title, accent, description }: Props) {
  return (
    <div className="section-heading" data-reveal>
      <div className="eyebrow">
        <span>{number} /</span> {eyebrow}
      </div>
      <h2>
        {title}
        {accent && (
          <>
            {' '}
            <span className="text-accent">{accent}</span>
          </>
        )}
      </h2>
      {description && <p>{description}</p>}
    </div>
  )
}
