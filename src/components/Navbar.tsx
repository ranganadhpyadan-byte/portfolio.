import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import GitHubMark from './GitHubMark'
import { navItems, personalInfo } from '../data/site'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = navItems
      .map((item) => item.href.replace('#', ''))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.5, 0.75],
      },
    )

    sections.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Go to home section">
          <span className="brand-mark">LMN</span>
          <span className="brand-text">Moksha.dev</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`nav-panel ${menuOpen ? 'is-open' : ''}`}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === item.href.replace('#', '') ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="icon-link"
              aria-label="Open GitHub profile"
            >
              <GitHubMark size={18} />
            </a>
            <a href="#contact" className="primary-button nav-cta">
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
