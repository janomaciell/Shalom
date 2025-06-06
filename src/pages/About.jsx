import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const teamRef = useRef(null)
  const heroRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    // Hero animation (mantenemos esta que te gustó)
    gsap.fromTo(heroRef.current.querySelector('.hero-title'), 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    )
    
    gsap.fromTo(heroRef.current.querySelector('.hero-subtitle'), 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6 }
    )

    // Efecto de hover continuo para las imágenes (sin entrada)
    gsap.utils.toArray('.member-image').forEach((image) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(image, {
        scale: 1.02,
        duration: 3,
        ease: "power1.inOut"
      })
    })

    // Efecto flotante para elementos decorativos
    gsap.utils.toArray('.floating-element').forEach((element) => {
      gsap.to(element, {
        y: "+=15",
        rotation: "+=3",
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      })
    })

    // Efecto de parallax suave en valores
    gsap.utils.toArray('.value-item').forEach((item, index) => {
      gsap.to(item, {
        y: (index % 2 === 0 ? -10 : 10),
        duration: 5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5
      })
    })

  }, [])

  const teamMembers = [
    {
      name: "Sofia Martinez",
      role: "Co-founder & CEO",
      description: "Estratega digital con 8+ años transformando marcas",
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Sofia"
    },
    {
      name: "Carlos Rodriguez", 
      role: "Co-founder & Director Creativo",
      description: "Visionario creativo especializado en branding",
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Carlos"
    },
    {
      name: "Ana Gutierrez",
      role: "Manager", 
      description: "Especialista en gestión de proyectos creativos",
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Ana"
    },
    {
      name: "Miguel Torres",
      role: "Web Specialist",
      description: "Desarrollador full-stack experto en experiencias web",
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Miguel"
    },
    {
      name: "Laura Vega",
      role: "Diseñadora Gráfica", 
      description: "Artista visual que transforma ideas en diseños",
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Laura"
    },
    {
      name: "David Kim",
      role: "Development Lead",
      description: "Líder técnico en arquitecturas escalables",
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=David"
    }
  ]

  const values = [
    {
      title: "COMUNICACIÓN",
      subtitle: "efectiva",
      description: "Fomentamos el diálogo claro y constante para asegurar una comprensión mutua y resultados alineados."
    },
    {
      title: "DISCIPLINA",
      subtitle: "profesional",
      description: "Nuestro compromiso con la organización y la constancia garantiza entregas a tiempo y de alta calidad."
    },
    {
      title: "ATRIBUCIONES",
      subtitle: "claras",
      description: "Cada integrante conoce su rol y responsabilidades, lo que optimiza la eficiencia y evita malentendidos."
    },
    {
      title: "TRANSPARENCIA",
      subtitle: "total",
      description: "Compartimos métricas, procesos y decisiones con honestidad en cada etapa del trabajo."
    }
  ];


  return (
    <div className="about-page">
      {/* Sección Hero - MANTENER IGUAL */}
        <section className="about-hero" ref={heroRef}>
          <div className="hero-background">
            <div className="floating-element star-1">✦</div>
            <div className="floating-element star-2">✧</div>
            <div className="floating-element circle-1"></div>
            <div className="floating-element circle-2"></div>
          </div>
          <div className="container">
            <h1 className="hero-title">
          <span className="white-text">NUESTRO</span><br />
          <span className="highlight">EQUIPO</span>
          </h1>
            <p className="hero-subtitle">
          Talento, pasión y trabajo en equipo para lograr grandes resultados.
            </p>
          </div>
        </section>

        {/* Sección Equipo - COMPLETAMENTE NUEVO */}
      <section className="team-section">
        <div className="container">
          <div className="team-grid" ref={teamRef}>
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <span className="member-role">{member.role}</span>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - COMPLETAMENTE NUEVO */}
      <section className="values-section" ref={valuesRef}>
        <div className="container">
          <div className="values-header">
            <h2 className="values-main-title">NUESTROS</h2>
            <h3 className="values-sub-title">valores</h3>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-item">
                <h4 className="value-title">{value.title}</h4>
                <span className="value-subtitle">{value.subtitle}</span>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About