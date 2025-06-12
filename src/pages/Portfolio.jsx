import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './Portfolio.css'
import logoShalom from '../img/logo-shalom.png' // Añade esta línea

gsap.registerPlugin(ScrollTrigger)

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('todos')
  const portfolioRef = useRef(null)
  const heroRef = useRef(null)
  const filtersRef = useRef(null)

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline()
    tl.fromTo(heroRef.current.querySelector('.page-title'), 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(heroRef.current.querySelector('.page-subtitle'), 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6"
    )

    // Filters animation
    gsap.fromTo(filtersRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top 90%"
        }
      }
    )
  }, [])

  useEffect(() => {
    // Portfolio items animation
    const items = gsap.utils.toArray('.portfolio-item')
    
    items.forEach((item, index) => {
      gsap.fromTo(item, 
        { 
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Hover animations
      const overlay = item.querySelector('.portfolio-overlay')
      const image = item.querySelector('.portfolio-image img')
      const details = item.querySelector('.project-details')

      item.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.05, duration: 0.6, ease: "power2.out" })
        gsap.to(overlay, { opacity: 1, duration: 0.4 })
        gsap.to(details, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 })
      })

      item.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" })
        gsap.to(overlay, { opacity: 0, duration: 0.4 })
        gsap.to(details, { y: 20, opacity: 0, duration: 0.3 })
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [filter])

  const projects = [
    {
      id: 1,
      title: "Crecimiento Digital",
      category: "redes-sociales",
      image: logoShalom, // Cambia esta línea
      description: "Estrategia integral que incrementó engagement 300%",
      client: "Restaurante Gourmet",
      metric: "+300% Engagement"
    },
    {
      id: 2,
      title: "Identidad de Marca",
      category: "branding",
      image: "https://via.placeholder.com/600x400/0f0f0f/ffffff?text=02",
      description: "Identidad visual completa para startup tecnológica",
      client: "Tech Startup",
      metric: "+150% Conversiones"
    },
    {
      id: 3,
      title: "Plataforma E-commerce",
      category: "desarrollo-web",
      image: "https://via.placeholder.com/600x400/0f0f0f/ffffff?text=03",
      description: "Plataforma completa con gestión integral",
      client: "Marca de Moda",
      metric: "+500% Ventas"
    },
    {
      id: 4,
      title: "Campaña Viral",
      category: "video",
      image: "https://via.placeholder.com/600x400/0f0f0f/ffffff?text=04",
      description: "Contenido viral con 2M visualizaciones",
      client: "Marca Fitness",
      metric: "2M Visualizaciones"
    }
  ]

  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'redes-sociales', label: 'Redes' },
    { key: 'branding', label: 'Marca' },
    { key: 'desarrollo-web', label: 'Web' },
        { key: 'Fotografia', label: 'Fotografia' },
    { key: 'video', label: 'Video' }

     

  ]

  const filteredProjects = filter === 'todos' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
    
    // Modal entrance animation
    gsap.fromTo('.modal-overlay', 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    )
    gsap.fromTo('.modal-content', 
      { scale: 0.8, y: 50 },
      { scale: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
    )
  }

  const closeModal = () => {
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setSelectedProject(null)
        document.body.style.overflow = 'auto'
      }
    })
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero" ref={heroRef}>
        <div className="container">
          <h1 className="page-title">Nuestro Trabajo</h1>
          <p className="page-subtitle">Proyectos seleccionados que entregan resultados</p>
        </div>
      </div>

      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-filters" ref={filtersRef}>
            {categories.map(category => (
              <button
                key={category.key}
                className={`filter-btn ${filter === category.key ? 'active' : ''}`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="portfolio-grid" ref={portfolioRef}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="portfolio-item"
                onClick={() => openModal(project)}
              >
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-overlay">
                    <div className="project-details">
                      <span className="project-number">0{project.id}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-metric">{project.metric}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Minimalista */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <span className="modal-number">0{selectedProject.id}</span>
              <h2>{selectedProject.title}</h2>
              <p className="modal-client">{selectedProject.client}</p>
            </div>

            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="modal-info">
              <p>{selectedProject.description}</p>
              <div className="modal-metric">
                <span>Resultado</span>
                <strong>{selectedProject.metric}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio