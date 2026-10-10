import { ExternalLink } from 'lucide-react'
import GitHubMark from './GitHubMark'
import { personalInfo, projectSamples } from '../data/site'

function Projects() {
  return (
    <section id="projects" className="content-section">
      <div className="container">
        <div className="section-intro reveal">
          <span className="section-label">03 / BUILDS</span>
          <h2>Things I&apos;ve Built</h2>
        </div>

        <div className="projects-grid">
          {projectSamples.map((project, index) => (
            <article key={project.name} className="project-card reveal">
              <div
                className={`project-thumb ${project.accent}`}
                style={
                  project.image
                    ? {
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : undefined
                }
              >
                <span className="project-label">{`0${index + 1}`}</span>
              </div>

              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <GitHubMark size={16} />
                      GitHub
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta reveal">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="primary-button">
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
