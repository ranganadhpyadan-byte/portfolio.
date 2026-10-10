import { ArrowUpRight } from 'lucide-react'
import GitHubMark from './GitHubMark'
import { personalInfo } from '../data/site'

function GitHub() {
  return (
    <section id="github" className="github-section">
      <div className="container github-shell reveal">
        <div className="github-copy">
          <span className="section-label">CODE VAULT</span>
          <h2>Explore My Code</h2>
          <p>Discover my projects, experiments, and development journey.</p>
        </div>

        <div className="github-actions">
          <div className="code-badges" aria-hidden="true">
            <span>{'{'}</span>
            <span>{'}'}</span>
            <span>{'<'}</span>
            <span>{'/>'}</span>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            <GitHubMark size={18} />
            Visit My GitHub
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default GitHub
