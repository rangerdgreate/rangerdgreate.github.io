import { useEffect } from 'react'
import type { RefObject } from 'react'

// Pointer and scroll motion share one on-demand RAF; no React renders per frame.
export function usePortraitMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const media = window.matchMedia(
      '(min-width: 1000px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    )
    let dispose = () => {}

    const configure = () => {
      dispose()
      if (!media.matches) return

      let frame = 0
      let bounds = element.getBoundingClientRect()
      let heroHeight = element.closest('section')?.offsetHeight ?? window.innerHeight
      const target = { x: 0, y: 0, scroll: 0 }
      const current = { ...target }
      const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

      const animate = () => {
        frame = 0
        let moving = false
        for (const key of ['x', 'y', 'scroll'] as const) {
          const difference = target[key] - current[key]
          current[key] += difference * 0.12
          if (Math.abs(difference) > 0.01) moving = true
          else current[key] = target[key]
        }
        element.style.setProperty('--portrait-rotate-x', `${-current.y * 5}deg`)
        element.style.setProperty('--portrait-rotate-y', `${current.x * 6}deg`)
        element.style.setProperty('--portrait-light-x', `${50 + current.x * 80}%`)
        element.style.setProperty('--portrait-light-y', `${50 + current.y * 80}%`)
        element.style.setProperty('--portrait-scroll', `${current.scroll}px`)
        if (moving) frame = window.requestAnimationFrame(animate)
      }
      const request = () => {
        if (!frame) frame = window.requestAnimationFrame(animate)
      }
      const enter = () => {
        bounds = element.getBoundingClientRect()
      }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        target.x = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5)
        target.y = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5)
        request()
      }
      const leave = () => {
        target.x = 0
        target.y = 0
        request()
      }
      const scroll = () => {
        const next = clamp(window.scrollY / heroHeight, 0, 1) * 16
        if (target.scroll !== next) {
          target.scroll = next
          request()
        }
      }
      const resize = () => {
        bounds = element.getBoundingClientRect()
        heroHeight = element.closest('section')?.offsetHeight ?? window.innerHeight
        scroll()
      }

      element.dataset.motion = 'enabled'
      element.addEventListener('pointerenter', enter)
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', leave)
      window.addEventListener('scroll', scroll, { passive: true })
      window.addEventListener('resize', resize)
      scroll()

      dispose = () => {
        window.cancelAnimationFrame(frame)
        element.removeEventListener('pointerenter', enter)
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', leave)
        window.removeEventListener('scroll', scroll)
        window.removeEventListener('resize', resize)
        delete element.dataset.motion
        for (const property of ['rotate-x', 'rotate-y', 'light-x', 'light-y', 'scroll']) {
          element.style.removeProperty(`--portrait-${property}`)
        }
      }
    }

    configure()
    media.addEventListener('change', configure)
    return () => {
      dispose()
      media.removeEventListener('change', configure)
    }
  }, [ref])
}
