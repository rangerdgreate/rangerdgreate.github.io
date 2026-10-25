import { useRef, useState } from 'react'
import { usePortraitMotion } from '../hooks/usePortraitMotion'

export function Portrait() {
  const ref = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)
  usePortraitMotion(ref)

  return (
    <figure ref={ref} className="portrait-composition" data-loaded={loaded}>
      <div className="portrait-ambient" aria-hidden="true" />
      <span className="portrait-index" aria-hidden="true">
        01 / A CURIOUS MIND
      </span>
      <div className="portrait-parallax">
        <div className="portrait-tilt">
          <div className="portrait-reveal">
            <picture className="portrait-picture">
              <source
                type="image/webp"
                srcSet="/assets/ranger-portrait-640.webp 640w, /assets/ranger-portrait-1122.webp 1122w"
                sizes="(max-width: 700px) calc(100vw - 72px), (max-width: 999px) 40vw, 430px"
              />
              <img
                src="/assets/ranger-portrait.png"
                alt="Professional portrait of Ranger Aganon F. Wagayen wearing a black collared shirt."
                width={1122}
                height={1402}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onLoad={() => setLoaded(true)}
              />
            </picture>
          </div>
          <div className="portrait-frame-light" aria-hidden="true" />
        </div>
      </div>
      <figcaption className="portrait-caption">
        <span className="portrait-caption-rule" aria-hidden="true" />
        <span>
          COMPUTER SECURITY<span className="portrait-caption-dot"> / </span>PHINMA AU
        </span>
        <span className="portrait-caption-plus" aria-hidden="true">
          +
        </span>
      </figcaption>
    </figure>
  )
}
