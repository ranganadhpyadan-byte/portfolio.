import { Mail } from 'lucide-react'
import GitHubMark from './GitHubMark'
import { navItems, personalInfo } from '../data/site'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="site-footer">
      <div className="container footer-shell">
        <div className="footer-brand-block">
          <h3>{personalInfo.name}</h3>
          <p>{personalInfo.tagline}</p>
        </div>

        <ul className="footer-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="footer-meta">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <GitHubMark size={18} />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email address">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} {personalInfo.name}. All rights reserved.</p>
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top
        </button>
      </div>
    </footer>
  )
}

export default Footer
