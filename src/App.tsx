import { useEffect } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import GitHub from './components/GitHub'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import './App.css'

function App() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    revealEls.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
