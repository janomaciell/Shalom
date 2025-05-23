import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const teamRef = useRef(null)

  useEffect(() => {
    gsap.utils.toArray('.team-member').forEach((member, index) => {
      gsap.fromTo(member, 
        { opacity: 0, y: 100, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: member,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    gsap.utils.toArray('.value-card').forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
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

  const teamMembers = [
    {
      name: "Sofia Martinez",
      role: "CEO & Estratega Digital",
      bio: "Con más de 8 años de experiencia en marketing digital, Sofia lidera nuestra visión estratégica. Especialista en transformación digital y growth hacking, ha ayudado a más de 100 marcas a escalar sus negocios.",
      skills: ["Estrategia Digital", "Growth Hacking", "Liderazgo", "Análisis de Datos"],
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Sofia"
    },
    {
      name: "Carlos Rodriguez",
      role: "Director Creativo",
      bio: "Diseñador gráfico y director de arte con 10 años de experiencia. Carlos combina creatividad y estrategia para crear identidades visuales memorables que conectan con las audiencias.",
      skills: ["Diseño Gráfico", "Dirección de Arte", "Branding", "UI/UX"],
      image: "https://via.placeholder.com/300x300/FEFBEA/000000?text=Carlos"
    },
    {
      name: "Ana Gutierrez",
      role: "Community Manager Senior",
      bio: "Especialista en redes sociales y gestión de comunidades. Ana ha desarrollado estrategias de contenido que han generado millones de interacciones para nuestros clientes.",
      skills: ["Social Media", "Content Marketing", "Community Building", "Copywriting"],
      image: "https://via.placeholder.com/300x300/000000/FEFBEA?text=Ana"
    },
    {
      name: "Miguel Torres",
      role: "Desarrollador Full Stack",
      bio: "Ingeniero en sistemas con expertise en desarrollo web moderno. Miguel construye experiencias digitales robustas y escalables utilizando las últimas tecnologías.",
      skills: ["React", "Node.js", "Python", "DevOps"],
      image: "https://via.placeholder.com/300x300/FFE465/000000?text=Miguel"
    },
    {
      name: "Laura Vega",
      role: "Fotógrafa & Productora",
      bio: "Fotógrafa profesional y productora audiovisual. Laura captura la esencia de cada marca a través de imágenes y videos que cuentan historias auténticas.",
      skills: ["Fotografía", "Producción Audiovisual", "Edición", "Storytelling"],
      image: "https://via.placeholder.com/300x300/FEFBEA/000000?text=Laura"
    },
    {
      name: "David Kim",
      role: "Especialista en Datos",
      bio: "Analista de datos y especialista en performance marketing. David optimiza campañas basándose en métricas precisas para maximizar el ROI de nuestros clientes.",
      skills: ["Google Analytics", "Data Analysis", "Performance Marketing", "Automation"],
      image: "https://via.placeholder.com/300x300/000000/FFE465?text=David"
    }
  ]

  const values = [
    {
      title: "Innovación",
      description: "Siempre buscamos nuevas formas de resolver problemas y crear experiencias únicas.",
      icon: "💡"
    },
    {
      title: "Colaboración",
      description: "Trabajamos como un equipo unificado, combinando nuestras fortalezas individuales.",
      icon: "🤝"
    },
    {
      title: "Excelencia",
      description: "Nos comprometemos a entregar resultados excepcionales en cada proyecto.",
      icon: "⭐"
    },
    {
      title: "Autenticidad",
      description: "Creamos conexiones genuinas entre las marcas y sus audiencias.",
      icon: "❤️"
    }
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="page-title">
            <span className="sloop-font">Sobre</span>
            <span className="montserrat">Nosotros</span>
          </h1>
          <p className="page-subtitle">
            Somos un equipo apasionado de creativos y estrategas digitales comprometidos con transformar marcas
          </p>
        </div>
      </div>

      <ScrollingText />

      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title">Nuestra Historia</h2>
            <div className="story-text">
              <p>
                Shalom Agency nació en 2019 con una visión clara: democratizar el acceso a estrategias de marketing digital de alta calidad. Comenzamos como un pequeño equipo de freelancers apasionados que se conocieron trabajando en proyectos independientes.
              </p>
              <p>
                Lo que nos unió fue nuestra frustración con las agencias tradicionales que prometían mucho pero entregaban poco. Decidimos crear algo diferente: una agencia que realmente escuchara a sus clientes, que fuera transparente en sus procesos y que midiera su éxito por los resultados reales que generaba.
              </p>
              <p>
                Hoy, después de 5 años, hemos ayudado a más de 200 marcas a transformar su presencia digital. Desde startups que buscan su primer millón hasta empresas establecidas que necesitan reinventarse, cada proyecto nos enseña algo nuevo y nos motiva a seguir innovando.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollingText text="CONOCE A NUESTRO EQUIPO" />

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-grid" ref={teamRef}>
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <div className="member-skills">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h3>Nuestra Misión</h3>
              <p>
                Empoderar a las marcas a través de estrategias digitales innovadoras que generen conexiones auténticas con sus audiencias y resultados medibles para sus negocios.
              </p>
            </div>
            <div className="vision-card">
              <h3>Nuestra Visión</h3>
              <p>
                Ser la agencia de marketing digital más reconocida de Latinoamérica, conocida por nuestra creatividad, transparencia y por los resultados extraordinarios que generamos para nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About