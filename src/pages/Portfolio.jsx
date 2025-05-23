import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const portfolioRef = useRef(null)

  useEffect(() => {
    gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
      gsap.fromTo(item, 
        { opacity: 0, scale: 0.8, rotationY: 45 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [filter])

  const projects = [
    {
      id: 1,
      title: "Campaña Digital Restaurante Gourmet",
      category: "social-media",
      image: "https://via.placeholder.com/400x300/FFE465/000000?text=Restaurante+Gourmet",
      description: "Estrategia integral de redes sociales que incrementó el engagement en un 300% y las reservas en un 150%.",
      client: "Restaurante El Jardín",
      services: ["Community Management", "Fotografía", "Diseño Gráfico"],
      results: ["300% más engagement", "150% más reservas", "50K nuevos seguidores"]
    },
    {
      id: 2,
      title: "Identidad Visual Tech Startup",
      category: "branding",
      image: "https://via.placeholder.com/400x300/FEFBEA/000000?text=Tech+Startup",
      description: "Desarrollo completo de identidad visual para startup tecnológica, desde logo hasta aplicaciones digitales.",
      client: "InnovateTech",
      services: ["Diseño Gráfico", "Desarrollo Web", "Estrategia Digital"],
      results: ["Identidad cohesiva", "Website responsive", "20% más conversiones"]
    },
    {
      id: 3,
      title: "E-commerce Moda Sostenible",
      category: "web-development",
      image: "https://via.placeholder.com/400x300/000000/FFE465?text=Moda+Sostenible",
      description: "Plataforma e-commerce completa con sistema de gestión de inventario y pasarela de pagos integrada.",
      client: "EcoFashion",
      services: ["Desarrollo Web", "Fotografía de Producto", "SEO"],
      results: ["500% más ventas online", "Tiempo de carga optimizado", "Top 3 en Google"]
    },
    {
      id: 4,
      title: "Campaña Video Marketing",
      category: "video",
      image: "https://via.placeholder.com/400x300/FFE465/000000?text=Video+Marketing",
      description: "Serie de videos virales que alcanzaron 2M de visualizaciones y generaron buzz mediático.",
      client: "Fitness Revolution",
      services: ["Producción Audiovisual", "Community Management", "Estrategia Digital"],
      results: ["2M visualizaciones", "Viralización orgánica", "Cobertura mediática"]
    },
    {
      id: 5,
      title: "Fotografía Corporativa",
      category: "photography",
      image: "https://via.placeholder.com/400x300/FEFBEA/000000?text=Corporativa",
      description: "Sesión fotográfica profesional para renovar la imagen corporativa de empresa líder en consultoría.",
      client: "ConsultPro",
      services: ["Fotografía Profesional", "Retoque Digital", "Banco de Imágenes"],
      results: ["Imagen renovada", "100+ fotos profesionales", "Uso multiplataforma"]
    },
    {
      id: 6,
      title: "App Móvil Delivery",
      category: "web-development",
      image: "https://via.placeholder.com/400x300/000000/FEFBEA?text=App+Delivery",
      description: "Desarrollo de aplicación móvil para servicio de delivery con geolocalización y seguimiento en tiempo real.",
      client: "QuickDelivery",
      services: ["Desarrollo Web", "UX/UI Design", "Estrategia Digital"],
      results: ["10K descargas primer mes", "4.8 estrellas App Store", "30% repetición de pedidos"]
    }
  ]

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'social-media', label: 'Social Media' },
    { key: 'branding', label: 'Branding' },
    { key: 'web-development', label: 'Desarrollo Web' },
    { key: 'video', label: 'Video' },
    { key: 'photography', label: 'Fotografía' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <div className="container">
          <h1 className="page-title">
            <span className="sloop-font">Nuestros</span>
            <span className="montserrat">Trabajos</span>
          </h1>
          <p className="page-subtitle">
            Proyectos que transformaron marcas y generaron resultados extraordinarios
          </p>
        </div>
      </div>

      <ScrollingText />

      <section className="portfolio-section">
        <div className="container">
          <div className="portfolio-filters">
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
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="portfolio-item"
                onClick={() => openModal(project)}
              >
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.client}</p>
                    <span className="view-more">Ver Detalles</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-info">
              <h2>{selectedProject.title}</h2>
              <h3>Cliente: {selectedProject.client}</h3>
              <p>{selectedProject.description}</p>
              
              <div className="modal-services">
                <h4>Servicios Incluidos:</h4>
                <ul>
                  {selectedProject.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-results">
                <h4>Resultados Obtenidos:</h4>
                <ul>
                  {selectedProject.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <ScrollingText text="CREAMOS EXPERIENCIAS MEMORABLES" />
    </div>
  )
}

export default Portfolio