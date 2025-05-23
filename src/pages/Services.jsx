import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const servicesRef = useRef(null)

  useEffect(() => {
    gsap.utils.toArray('.service-card').forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 100, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  const services = [
    {
      title: "Community Management",
      description: "Gestión integral de redes sociales con estrategias personalizadas para cada plataforma.",
      features: ["Creación de contenido", "Gestión de comunidades", "Análisis de métricas", "Estrategia de engagement"],
      icon: "📱"
    },
    {
      title: "Fotografía Profesional",
      description: "Sesiones fotográficas que capturan la esencia de tu marca con calidad profesional.",
      features: ["Fotografía de producto", "Sesiones corporativas", "Fotografía de eventos", "Retoque digital"],
      icon: "📸"
    },
    {
      title: "Diseño Gráfico",
      description: "Diseños creativos que comunican tu mensaje de manera visual e impactante.",
      features: ["Identidad visual", "Material publicitario", "Diseño web", "Packaging"],
      icon: "🎨"
    },
    {
      title: "Desarrollo Web",
      description: "Sitios web modernos, responsivos y optimizados para convertir visitantes en clientes.",
      features: ["Desarrollo frontend", "Desarrollo backend", "E-commerce", "Optimización SEO"],
      icon: "💻"
    },
    {
      title: "Estrategia Digital",
      description: "Planificación estratégica para maximizar tu presencia digital y ROI.",
      features: ["Análisis de mercado", "Planificación de campañas", "Optimización de conversiones", "Consultoría digital"],
      icon: "📊"
    },
    {
      title: "Producción Audiovisual",
      description: "Videos profesionales que cuentan tu historia de manera memorable.",
      features: ["Video corporativo", "Spots publicitarios", "Contenido para redes", "Animación 2D/3D"],
      icon: "🎬"
    }
  ]

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <h1 className="page-title">
            <span className="sloop-font">Nuestros</span>
            <span className="montserrat">Servicios</span>
          </h1>
          <p className="page-subtitle">
            Soluciones integrales para potenciar tu presencia digital
          </p>
        </div>
      </div>

      <ScrollingText />

      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid" ref={servicesRef}>
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
                <div className="service-overlay">
                  <button className="service-cta">Solicitar Cotización</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollingText text="TRANSFORMAMOS IDEAS EN REALIDAD" />

      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Nuestro Proceso</h2>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>Análisis</h4>
                <p>Estudiamos tu marca, competencia y objetivos para desarrollar una estrategia personalizada.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>Estrategia</h4>
                <p>Creamos un plan detallado con cronogramas, métricas y objetivos específicos.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>Ejecución</h4>
                <p>Implementamos la estrategia con nuestro equipo de especialistas en cada área.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h4>Optimización</h4>
                <p>Monitoreamos resultados y optimizamos continuamente para maximizar el ROI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services