import { BookOpen, Lightbulb, MonitorSmartphone } from 'lucide-react'
import { useState } from 'react'
import { aboutCards, personalInfo } from '../data/site'

const iconMap = {
  book: BookOpen,
  spark: Lightbulb,
  monitor: MonitorSmartphone,
}

function About() {
  const [charactersError, setCharactersError] = useState(false)

  return (
    <section id="about" className="content-section">
      <div className="container">
        <div className="section-intro reveal">
          <span className="section-label">01 / ABOUT ME</span>
          <h2>Beyond the Blocks</h2>
        </div>

        <div className="about-layout reveal">
          <div className="about-story">
            <p>{personalInfo.shortBio}</p>

            <div className="about-image-panel" aria-label="Minecraft-inspired gaming artwork">
              {!charactersError ? (
                <img
                  src="/images/minecraft-characters.png"
                  alt="Minecraft-style characters displayed in a framed gaming panel"
                  onError={() => setCharactersError(true)}
                />
              ) : (
                <div className="image-fallback" aria-live="polite">
                  Character artwork unavailable
                </div>
              )}
            </div>
          </div>

          <div className="about-cards">
            {aboutCards.map((card) => {
              const Icon = iconMap[card.icon as keyof typeof iconMap]

              return (
                <article key={card.title} className="info-card reveal">
                  <div className="card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
