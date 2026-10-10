import { ArrowDown } from 'lucide-react'
import { useState } from 'react'
import GitHubMark from './GitHubMark'
import { personalInfo } from '../data/site'

function Hero() {
  const [heroImageError, setHeroImageError] = useState(false)

  return (
    <section id="home" className="hero-section">
      <div className="hero-background" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy reveal">
          <span className="pixel-badge">PLAYER 01 // DEVELOPER MODE</span>
          <p className="eyebrow">HELLO, I&apos;M</p>
          <h1>{personalInfo.name}</h1>
          <p className="subtitle">{personalInfo.subtitle}</p>
          <p className="lead">{personalInfo.intro}</p>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              Explore My Work
            </a>
            <a href="#contact" className="secondary-button">
              Contact Me
            </a>
          </div>

          <div className="hero-meta">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="Open GitHub profile"
            >
              <GitHubMark size={20} />
            </a>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="hero-figure" aria-label="Minecraft-themed hero illustration">
            {!heroImageError ? (
              <img
                src="/images/steve-alex.png"
                alt="Steve and Alex posed together in a stylized Minecraft-inspired scene"
                onError={() => setHeroImageError(true)}
              />
            ) : (
              <div className="image-fallback" aria-live="polite">
                Minecraft illustration unavailable
              </div>
            )}
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll to about section">
        <span>Scroll</span>
        <ArrowDown size={16} />
      </a>
    </section>
  )
}

export default Hero
