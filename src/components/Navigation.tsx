import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../data/profile'

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = navigation
      .map(([id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    let frame = 0
    const update = () => {
      frame = 0
      let current = 'home'
      for (const section of sections)
        if (section.getBoundingClientRect().top <= 150) current = section.id
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4)
        current = 'contact'
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    const close = (event: KeyboardEvent) => {
      const toggle = document.getElementById('menu-toggle')
      if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
        setOpen(false)
        toggle.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 1000px)')
    const resize = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener('change', resize)
    window.addEventListener('keydown', close)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('keydown', close)
      desktop.removeEventListener('change', resize)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="nav-container">
        <a
          href="#home"
          className="brand"
          onClick={() => {
            setOpen(false)
            setActive('home')
          }}
        >
          <span className="brand-mark" aria-hidden="true">
            r<span>.</span>
          </span>
          <span>
            ranger<span className="text-muted">.dev</span>
          </span>
          <span className="sr-only"> — home</span>
        </a>
        <button
          id="menu-toggle"
          className="icon-button menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          {navigation.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              className={active === id ? 'active' : ''}
              onClick={() => {
                setOpen(false)
                setActive(id)
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nav-cta">
          Let’s connect <ArrowUpRight size={15} />
        </a>
      </div>
    </header>
  )
}
