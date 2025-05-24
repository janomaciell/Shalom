import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const approachItemsRef = useRef([])
  const clientCardsRef = useRef([])
  const decorativeElementsRef = useRef([])

  useEffect(() => {
    // Animación inicial del hero mejorada
    const tl = gsap.timeline({ delay: 0.3 })
    
    // Animación del tagline superior
    tl.fromTo(heroTaglineRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    
    // Animación del título principal con efecto de escritura
    .fromTo(titleRef.current.children,
      { opacity: 0, y: 100, rotationX: 90 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1.2, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    )
    
    // Animación del subtítulo
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )

    // Animación de elementos decorativos
    decorativeElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.set(element, { opacity: 0, scale: 0 })
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 1.5 + (index * 0.1),
          ease: "back.out(1.7)"
        })
        
        // Animación flotante continua
        gsap.to(element, {
          y: -20,
          duration: 2 + (index * 0.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        })
      }
    })

    // Animaciones con scroll
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animación de cards de enfoque con efectos 3D
    approachItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          { 
            opacity: 0, 
            y: 100, 
            rotationY: 45,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".approach-grid",
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Efectos de hover 3D
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -15,
            rotationY: 5,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          })
        })

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          })
        })
      }
    })

    // Animación de cards de clientes con efecto de mosaico
    clientCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            scale: 0,
            rotation: 180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".clients-mosaic",
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Hover effect para cards
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.08,
            rotation: 5,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      }
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const clientProjects = [
    {
      title: "PROYECTO ALPHA",
      category: "BRANDING",
      subcategories: ["DISEÑO WEB", "SOCIAL MEDIA"],
      color: "#FF6B35",
      image: "https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=ALPHA"
    },
    {
      title: "BETA STUDIOS",
      category: "BRANDING",
      subcategories: ["ECOMMERCE", "PAID MEDIA"],
      color: "#4ECDC4",
      image: "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=BETA"
    },
    {
      title: "GAMMA CORP",
      category: "BRANDING",
      subcategories: ["DESARROLLO", "UX/UI"],
      color: "#FFE66D",
      image: "https://via.placeholder.com/400x300/FFE66D/000000?text=GAMMA"
    },
    {
      title: "DELTA INNOVATIONS",
      category: "BRANDING",
      subcategories: ["BRANDING", "MARKETING"],
      color: "#A8E6CF",
      image: "https://via.placeholder.com/400x300/A8E6CF/000000?text=DELTA"
    },
    {
      title: "EPSILON DESIGN",
      category: "BRANDING",
      subcategories: ["CREATIVIDAD", "ESTRATEGIA"],
      color: "#C7CEEA",
      image: "https://via.placeholder.com/400x300/C7CEEA/000000?text=EPSILON"
    }
  ]

  return (
    <div className="home modern-home">
      {/* Hero Section Mejorado */}
      <section ref={heroRef} className="hero modern-hero">
        <div className="hero-content">
          <p ref={heroTaglineRef} className="hero-tagline">
            ESCUCHAMOS, CONECTAMOS, POTENCIAMOS
          </p>
          
          <h1 ref={titleRef} className="hero-title modern-title">
            <span className="sloop-font">Shalom</span>
            <span className="montserrat">Agency</span>
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle modern-subtitle">
            Somos un <span className="highlight">estudio creativo*</span> que transforma ideas en 
            experiencias digitales extraordinarias que conectan, inspiran y generan resultados.
          </p>

          {/* Elementos decorativos */}
          <div className="decorative-elements">
            <div 
              ref={el => decorativeElementsRef.current[0] = el}
              className="floating-element element-1"
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="25" fill="none" stroke="#FF6B35" strokeWidth="2"/>
              </svg>
            </div>
            <div 
              ref={el => decorativeElementsRef.current[1] = el}
              className="floating-element element-2"
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <rect x="10" y="10" width="20" height="20" fill="#4ECDC4" transform="rotate(45 20 20)"/>
              </svg>
            </div>
            <div 
              ref={el => decorativeElementsRef.current[2] = el}
              className="floating-element element-3"
            >
              <div className="pink-dot"></div>
            </div>
          </div>
        </div>
      </section>

      <ScrollingText />

      {/* Nuestro Enfoque - Estilo Moderno */}
      <section className="section approach modern-approach">
        <div className="container">
          <div className="approach-header">
            <h2 className="section-title modern-section-title" style={{ color: '#000000' }}>
              Nuestro enfoque
            </h2>
            <p className="approach-description">
              Diseñamos experiencias que generan impacto y resultados medibles, 
              creando conexiones auténticas que impulsan el crecimiento.
            </p>
          </div>
          
          <div className="approach-grid modern-grid">
            <div 
              className="approach-item modern-card"
              ref={el => approachItemsRef.current[0] = el}
            >
              <div className="card-number">01</div>
              <h3>Estrategia</h3>
              <div className="card-line"></div>
              <p>Desarrollamos estrategias digitales personalizadas que conectan con tu audiencia y generan resultados medibles.</p>
            </div>
            
            <div 
              className="approach-item modern-card"
              ref={el => approachItemsRef.current[1] = el}
            >
              <div className="card-number">02</div>
              <h3>Creatividad</h3>
              <div className="card-line"></div>
              <p>Combinamos arte y ciencia para crear contenido visual que capture la esencia de tu marca.</p>
            </div>
            
            <div 
              className="approach-item modern-card"
              ref={el => approachItemsRef.current[2] = el}
            >
              <div className="card-number">03</div>
              <h3>Resultados</h3>
              <div className="card-line"></div>
              <p>Nos enfocamos en métricas que importan, convirtiendo seguidores en clientes leales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Clientes - Estilo Mosaico */}
      <section className="section clients modern-clients">
        <div className="container">
          <div className="clients-header">
            <h2 className="section-title modern-section-title">
              Nuestros clientes
              <svg className="title-underline" viewBox="0 0 100 20">
                <path d="M0,10 Q50,0 100,10" stroke="#FF6B35" strokeWidth="2" fill="none"/>
              </svg>
            </h2>
            <p className="clients-subtitle">Mira como trabajamos</p>
          </div>
          
          <div className="clients-mosaic">
            {clientProjects.map((project, index) => (
              <div 
                key={index}
                className="client-card"
                ref={el => clientCardsRef.current[index] = el}
                style={{ '--card-color': project.color }}
              >
                <div className="card-tags">
                  <span className="main-tag">{project.category}</span>
                  {project.subcategories.map((sub, subIndex) => (
                    <span key={subIndex} className="sub-tag">{sub}</span>
                  ))}
                </div>
                <div className="card-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <h3 className="card-title">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollingText />

      {/* Misión - Minimalista */}
      <section className="section mission modern-mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text-block">
              <h2 className="section-title modern-section-title">
                Nuestra Misión
              </h2>
              <div className="large-text">
                En Shalom Agency, nuestra misión es <span className="highlight">empoderar a las marcas</span> a través de 
                soluciones digitales innovadoras y estrategias de marketing que generen un impacto real.
              </div>
              <p className="regular-text">
                Creemos en la transformación digital como herramienta para construir conexiones 
                auténticas entre las marcas y sus audiencias, generando crecimiento sostenible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home