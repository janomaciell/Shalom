import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import logoShalom from '../img/logo-shalom.png' // Ajusta la ruta según tu estructura
import './Header.css'

const Header = () => {
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(logoRef.current, 
      { opacity: 0, y: -30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )
    .fromTo(navRef.current.children, 
      { opacity: 0, x: 30 }, 
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }, 
      "-=0.5"
    )
  }, [])

  return (
    <header ref={headerRef} className="header">
      <div className="header-container">
        <div ref={logoRef} className="logo">
          <Link to="/">
            <img src={logoShalom} alt="Shalom Agency" className="logo-image" />
          </Link>
        </div>
        <nav ref={navRef} className="nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Servicios</Link>
          <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Trabajos</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Nosotros</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contacto</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header