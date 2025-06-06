import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const whatsappFloatRef = useRef(null);
  const whatsappThreadRef = useRef(null);
  const contactInfoRef = useRef(null);

  const faqData = [
    {
      question: "¿Qué servicios ofrece la agencia?",
      answer: "Ofrecemos desarrollo web, branding, social media, diseño gráfico, SEO, marketing digital y consultoría estratégica. Cada proyecto se adapta a las necesidades específicas de tu negocio."
    },
    {
      question: "¿Trabajan con empresas de cualquier industria?",
      answer: "Sí, trabajamos con empresas de todos los sectores: tecnología, retail, salud, educación, restaurantes, servicios profesionales y más. Nuestra experiencia diversa nos permite adaptarnos a cualquier industria."
    },
    {
      question: "¿Pueden desarrollar estrategias personalizadas?",
      answer: "Absolutamente. Cada negocio es único, por eso desarrollamos estrategias 100% personalizadas basadas en tus objetivos, audiencia y mercado específico."
    },
    {
      question: "¿Cuál es el tiempo de entrega promedio?",
      answer: "Depende del proyecto. Un sitio web puede tomar 2-4 semanas, una estrategia de branding 1-2 semanas, y campañas de marketing digital se implementan en 3-5 días hábiles."
    },
    {
      question: "¿Ofrecen soporte post-lanzamiento?",
      answer: "Sí, incluimos soporte técnico por 30 días y ofrecemos planes de mantenimiento mensual para mantener tu proyecto actualizado y optimizado."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-badge',
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
      )
        .fromTo('.hero-title',
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6'
        )
        .fromTo('.hero-subtitle',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8'
        );

      // Form animation
      gsap.fromTo('.form-container',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // FAQ items animation
      gsap.fromTo('.faq-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: faqRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-info',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // WhatsApp floating button animations
      const whatsappBtn = whatsappFloatRef.current;
      const thread = whatsappThreadRef.current;

      if (whatsappBtn && thread) {
        // Breathing animation
        gsap.to(whatsappBtn, {
          scale: 1.1,
          duration: 2,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });

        // Thread rotation
        gsap.to(thread, {
          rotation: 360,
          duration: 4,
          ease: 'none',
          repeat: -1
        });

        // Thread drawing animation
        gsap.set(thread.querySelector('circle'), {
          drawSVG: "0% 30%"
        });

        gsap.to(thread.querySelector('circle'), {
          drawSVG: "0% 100%",
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true
        });

        // Hover effects
        whatsappBtn.addEventListener('mouseenter', () => {
          gsap.to(whatsappBtn, {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.4)'
          });
          gsap.to('.whatsapp-pulse', {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3
          });
        });

        whatsappBtn.addEventListener('mouseleave', () => {
          gsap.to(whatsappBtn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to('.whatsapp-pulse', {
            scale: 1,
            opacity: 0.6,
            duration: 0.3
          });
        });

        // Click effect
        whatsappBtn.addEventListener('click', () => {
          gsap.to(whatsappBtn, {
            scale: 0.9,
            duration: 0.1,
            onComplete: () => {
              gsap.to(whatsappBtn, { scale: 1.2, duration: 0.2 });
            }
          });
        });
      }

      // Form input animations
      const inputs = document.querySelectorAll('.form-input');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            borderColor: '#e91e63',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Submit button hover
      const submitBtn = document.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          gsap.to('.submit-btn-bg', {
            scaleX: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
          gsap.to('.submit-arrow', {
            x: 5,
            duration: 0.3
          });
        });
        submitBtn.addEventListener('mouseleave', () => {
          gsap.to('.submit-btn-bg', {
            scaleX: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
          gsap.to('.submit-arrow', {
            x: 0,
            duration: 0.3
          });
        });
      }

    }, [heroRef, formRef, faqRef, whatsappFloatRef, contactInfoRef]);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Loading animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to('.loading-spinner', {
          rotation: 360,
          duration: 1,
          ease: 'none',
          repeat: -1
        });
      }
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);

      gsap.to('.form-container', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          gsap.fromTo('.success-message',
            { opacity: 0, scale: 0.8, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.4)'
            }
          );
        }
      });

      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', service: '' });
        setIsSuccess(false);
        gsap.to('.form-container', {
          opacity: 1,
          y: 0,
          duration: 0.5
        });
      }, 3000);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFaq = (index) => {
    if (openFaq === index) {
      gsap.to(`.faq-answer-${index}`, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      setOpenFaq(null);
    } else {
      if (openFaq !== null) {
        gsap.to(`.faq-answer-${openFaq}`, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      setOpenFaq(index);
      setTimeout(() => {
        gsap.fromTo(`.faq-answer-${index}`,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          }
        );
      }, 100);
    }
  };

  return (
    <div className="contact-page">
      {/* Floating WhatsApp Button */}
      <div className="whatsapp-floating" ref={whatsappFloatRef}>
        <a
          href="https://wa.me/2267405599"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float-btn"
        >
          <div className="whatsapp-pulse"></div>
          <svg className="whatsapp-thread" ref={whatsappThreadRef} width="70" height="70" viewBox="0 0 70 70">
            <circle
              cx="35"
              cy="35"
              r="25"
              fill="none"
              stroke="#25D366"
              strokeWidth="2"
              strokeDasharray="157"
            />
          </svg>
          <div className="whatsapp-icon">💬</div>
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-badge">🚀</div>
          <h1 className="hero-title">Transforma tu negocio</h1>
          <p className="hero-subtitle">
            Estrategias digitales personalizadas que impulsan el crecimiento de tu empresa
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="main-section">
        <div className="content-grid">

          {/* Left Column - FAQ */}
          <div className="faq-section" ref={faqRef}>
            <div className="section-header">
              <h2 className="section-title pink-text">SOBRE NUESTROS SERVICIOS</h2>
              <div className="title-underline"></div>
            </div>

            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{index + 1}. {faq.question}</span>
                    <div className={`faq-icon ${openFaq === index ? 'rotated' : ''}`}>+</div>
                  </button>
                  <div className={`faq-answer faq-answer-${index}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form & Contact */}
          <div className="form-contact-section">

            {/* Contact Form */}
            <div className="form-section" ref={formRef}>
              {!isSuccess ? (
                <div className="form-container">
                  <div className="form-header">
                    <h3>Cuéntanos tu proyecto</h3>
                    <h5 style={{ color: 'black' }}>Envíanos un correo</h5>
                  </div>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="form-input"
                        required
                      />
                      <div className="email-arrow">→</div>
                    </div>
                    <div className="form-group">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="form-input form-select"
                        required
                      >
                        <option value="">Servicio de interés</option>
                        <option value="branding">🎨 Branding & Identidad</option>
                        <option value="web">💻 Desarrollo Web</option>
                        <option value="social">📱 Social Media</option>
                        <option value="design">✨ Diseño Gráfico</option>
                        <option value="seo">🔍 SEO & Marketing</option>
                        <option value="consulting">🚀 Consultoría Digital</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos sobre tu proyecto, objetivos y timeline..."
                        className="form-input form-textarea"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={isLoading}
                    >
                      <div className="submit-btn-bg"></div>
                      <span className="btn-content">
                        {isLoading ? (
                          <>
                            <span className="loading-spinner">⏳</span>
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
                            <span className="submit-arrow">→</span>
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="success-message">
                  <div className="success-icon">🎉</div>
                  <h3>¡Mensaje enviado con éxito!</h3>
                  <p>Te contactaremos muy pronto</p>
                </div>
              )}
            </div>
            <div className="contact-section" ref={contactInfoRef}>
              <h3 className="contact-title">Contacto</h3>
              <div className="contact-info">
                <p className="contact-address">Av. Libertador, Buenos Aires, Arg.</p>
                <a href="mailto:hola@shalomagency.com" className="contact-email">
                  hola@shalomagency.com
                </a>
                <div className="contact-whatsapp">
                  <a
                    href="https://wa.me/2267405599?text=¡Hola!%20Me%20interesa%20conocer%20sus%20servicios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-contact-btn"
                  >
                    <span>WhatsApp</span>

                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Nueva sección independiente para redes sociales */}
      <section className="social-networks-section">
        <div className="container">
          <div className="social-networks">
            <h3 className="social-networks-title">Síguenos en redes sociales</h3>
            <div className="social-grid">
              <a href="https://instagram.com/shalomagency" className="social-item instagram">
                <span className="social-icon">📸</span>
                <span className="social-name">Instagram</span>
                <span className="social-username">@shalomagency</span>
              </a>

              <a href="https://facebook.com/shalomagency" className="social-item facebook">
                <span className="social-icon">👥</span>
                <span className="social-name">Facebook</span>
                <span className="social-username">@shalomagency</span>
              </a>

              <a href="https://tiktok.com/@shalomagency" className="social-item tiktok">
                <span className="social-icon">🎵</span>
                <span className="social-name">TikTok</span>
                <span className="social-username">@shalomagency</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;