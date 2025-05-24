import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import ScrollingText from '../components/ScrollingText'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const contactRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.fromTo(formRef.current, 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    )
    .fromTo('.contact-info', 
      { opacity: 0, x: 100 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, 
      "-=0.8"
    )
    .fromTo('.contact-method', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
      "-=0.5"
    )
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // Aquí iría la lógica para enviar el formulario
      console.log('Formulario enviado:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulación de envío
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.')
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      })
    } catch (err) {
      setError('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      info: "hola@shalomagency.com",
      description: "Respuesta en 24 horas",
      link: "mailto:hola@shalomagency.com"
    },
    {
      icon: "📱",
      title: "WhatsApp",
      info: "+1 (555) 123-4567",
      description: "Respuesta inmediata",
      link: "https://wa.me/15551234567"
    },
    {
      icon: "📍",
      title: "Oficina",
      info: "Ciudad de México, MX",
      description: "Citas con previa programación",
      link: "#"
    },
    {
      icon: "📷",
      title: "Instagram",
      info: "@shalomagency",
      description: "Síguenos para contenido exclusivo",
      link: "https://instagram.com/shalomagency"
    },
    {
      icon: "💼",
      title: "LinkedIn",
      info: "Shalom Agency",
      description: "Conecta con nosotros profesionalmente",
      link: "https://linkedin.com/company/shalomagency"
    },
    {
      icon: "🎵",
      title: "TikTok",
      info: "@shalomagency",
      description: "Contenido creativo y tendencias",
      link: "https://tiktok.com/@shalomagency"
    }
  ]

  const services = [
    "Community Management",
    "Fotografía Profesional",
    "Diseño Gráfico",
    "Desarrollo Web",
    "Estrategia Digital",
    "Producción Audiovisual",
    "Consultoría Digital"
  ]

  const budgetRanges = [
    "Menos de $100.000",
    "$100.000 - $300.000",
    "$300.000 - $500.000",
    "$500.000 - $1.000.000",
    "Más de $1.000.000"
  ]

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1 className="page-title">
            <span className="sloop-font">Hablemos</span>
            <span className="montserrat">de tu Proyecto</span>
          </h1>
          <p className="page-subtitle">
            ¿Listo para transformar tu marca? Cuéntanos tu idea y hagámosla realidad juntos
          </p>
        </div>
      </div>

      <ScrollingText />

      <section className="contact-section" ref={contactRef}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container" ref={formRef}>
              <h2>Cuéntanos sobre tu proyecto</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Servicio de Interés</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Presupuesto Estimado</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecciona un rango</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Cuéntanos sobre tu proyecto *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe tu proyecto, objetivos y cualquier detalle relevante..."
                    required
                  ></textarea>
                </div>

                {error && <div className="error-message">{error}</div>}
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                  {!isLoading && <span className="btn-arrow">→</span>}
                </button>
              </form>
            </div>

            <div className="contact-info">
              <h2>Otras formas de contactarnos</h2>
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className="contact-method"
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-content">
                      <h4>{method.title}</h4>
                      <p className="method-info">{method.info}</p>
                      <p className="method-description">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollingText text="COMENCEMOS A TRABAJAR JUNTOS" />

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Tienes una emergencia digital?</h2>
            <p>
              Para proyectos urgentes o consultas inmediatas, contáctanos directamente por WhatsApp. 
              Nuestro equipo está listo para ayudarte.
            </p>
            <a href="https://wa.me/2267405599" className="emergency-btn" target="_blank" rel="noopener noreferrer">
              WhatsApp Urgente
              <span className="btn-icon">📱</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

ScrollingText.propTypes = {
  text: PropTypes.string
}

export default Contact