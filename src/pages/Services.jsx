import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import ScrollingText from '../components/ScrollingText'
import './Services.css'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const Services = () => {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const blurTextRefs = useRef([])
  const lineRefs = useRef([])

  useEffect(() => {
    // Hero animations with text drawing effect
    const tl = gsap.timeline()
    
    // Main title animation
    tl.from('.hero-main-text', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power3.out"
    })
    .from('.hero-sub-text', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    }, "-=0.8")

    // Blur text animations
    blurTextRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(el, 
          { 
            filter: 'blur(20px)',
            opacity: 0,
            scale: 1.2
          },
          {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: index * 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    // Line drawing animations
    lineRefs.current.forEach((line, index) => {
      if (line) {
        gsap.fromTo(line, 
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    // Services cards with stagger
    gsap.utils.toArray('.service-minimal').forEach((card, index) => {
      gsap.fromTo(card, 
        { 
          y: 100,
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
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-number'), {
          scale: 1.2,
          rotation: 5,
          duration: 0.3
        })
        gsap.to(card.querySelector('.service-line'), {
          scaleX: 0.5,
          duration: 0.3
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.service-number'), {
          scale: 1,
          rotation: 0,
          duration: 0.3
        })
        gsap.to(card.querySelector('.service-line'), {
          scaleX: 1,
          duration: 0.3
        })
      })
    })

    // Process section with morphing text
    gsap.utils.toArray('.process-item').forEach((item, index) => {
      const morphText = item.querySelector('.morph-text')
      
      gsap.fromTo(item,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Text morphing effect
      if (morphText) {
        ScrollTrigger.create({
          trigger: morphText,
          start: "top 80%",
          onEnter: () => {
            gsap.to(morphText, {
              duration: 0.8,
              text: morphText.dataset.text,
              ease: "none"
            })
          }
        })
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const services = [
    {
      number: "01",
      title: "Community",
      subtitle: "Management",
      description: "Gestión integral de redes sociales con estrategias personalizadas",
      detail: "Creamos comunidades auténticas"
    },
    {
      number: "02",
      title: "Photography",
      subtitle: "& Content",
      description: "Fotografía profesional que captura la esencia de tu marca",
      detail: "Imágenes que cuentan historias"
    },
    {
      number: "03",
      title: "Diseño",
      subtitle: "Gráfico",
      description: "Diseños creativos que comunican tu mensaje visualmente",
      detail: "Identidad visual memorable"
    },
    {
      number: "04",
      title: "Web",
      subtitle: "Development",
      description: "Sitios web modernos, responsivos y optimizados",
      detail: "Experiencias digitales fluidas"
    },
    {
      number: "05",
      title: "Digital",
      subtitle: "Strategy",
      description: "Planificación estratégica para maximizar tu ROI",
      detail: "Crecimiento medible y sostenible"
    },
    {
      number: "06",
      title: "Video",
      subtitle: "Production",
      description: "Contenido audiovisual que conecta con tu audiencia",
      detail: "Narrativas que impactan"
    }
  ]

  const processSteps = [
    { title: "Descubrir", morph: "ANÁLISIS PROFUNDO" },
    { title: "Planificar", morph: "ESTRATEGIA DETALLADA" },
    { title: "Ejecutar", morph: "IMPLEMENTACIÓN PRECISA" },
    { title: "Optimizar", morph: "MEJORA CONTINUA" }
  ]

  return (
    <div className="services-page">
      <div className="services-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-main-text">
              Diseñamos
              <span className="hero-accent">Experiencias Únicas</span>
            </h1>
            <p className="hero-sub-text">
              Transformamos ideas en soluciones digitales que conectan con tu audiencia
            </p>
          </div>
          
          {/* Textos flotantes */}
          <div className="floating-texts">
            <span 
              className="blur-text blur-text-1" 
              ref={el => blurTextRefs.current[0] = el}
            >
              Innovación
            </span>
            <span 
              className="blur-text blur-text-2" 
              ref={el => blurTextRefs.current[1] = el}
            >
              Excelencia
            </span>
            <span 
              className="blur-text blur-text-3" 
              ref={el => blurTextRefs.current[2] = el}
            >
              Crecimiento
            </span>
          </div>
        </div>
      </div>

      <section className="services-minimal-section">
        <div className="container">
          {/* Section divider line */}
          <div 
            className="section-line" 
            ref={el => lineRefs.current[0] = el}
          ></div>
          
          <div className="services-minimal-grid" ref={servicesRef}>
            {services.map((service, index) => (
              <div key={index} className="service-minimal">
                <div className="service-header">
                  <span className="service-number">{service.number}</span>
                  <div 
                    className="service-line" 
                    ref={el => lineRefs.current[index + 1] = el}
                  ></div>
                </div>
                
                <div className="service-content">
                  <h3 className="service-title-main">{service.title}</h3>
                  <h4 className="service-title-sub">{service.subtitle}</h4>
                  <p className="service-desc">{service.description}</p>
                  <span className="service-detail">{service.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large typography section */}
      <section className="typography-section">
        <div className="container">
          <h2 
            className="large-text" 
            ref={el => blurTextRefs.current[3] = el}
          >
            Transformamos
          </h2>
          <h3 
            className="medium-text" 
            ref={el => blurTextRefs.current[4] = el}
          >
            Ideas en Realidad
          </h3>
        </div>
      </section>

      <section className="process-minimal-section" ref={processRef}>
        <div className="container">
          <div 
            className="section-line" 
            ref={el => lineRefs.current[7] = el}
          ></div>
          
          <h2 
            className="process-title" 
            ref={el => blurTextRefs.current[5] = el}
          >
            Nuestro Proceso
          </h2>
          
          <div className="process-minimal-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-item">
                <span className="process-number">0{index + 1}</span>
                <h4 className="process-step-title">{step.title}</h4>
                <p 
                  className="morph-text" 
                  data-text={step.morph}
                >
                  {step.title.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollingText text="TRANSFORMANDO MARCAS • CREANDO IMPACTO • IMPULSANDO CRECIMIENTO" />
    </div>
  )
}

export default Services