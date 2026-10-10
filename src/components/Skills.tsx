import { skillGroups } from '../data/site'

function Skills() {
  return (
    <section id="skills" className="content-section alt-section">
      <div className="container">
        <div className="section-intro reveal">
          <span className="section-label">02 / INVENTORY</span>
          <h2>My Developer Toolkit</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.title} className="skill-card reveal">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
