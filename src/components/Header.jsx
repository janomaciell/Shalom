import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import logoShalom from '../img/logo-shalom.png'
import './Header.css'

const Header = () => {
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const navRef = useRef(null)
  const burgerRef = useRef(null)
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    ).fromTo(
      navRef.current.children,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.5'
    )
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false)
    }
  }

  return (
    <header ref={headerRef} className="header">
      <div className="header-container">
        <div ref={logoRef} className="logo">
          <Link to="/">
            <img
              src={logoShalom}
              alt="Shalom Agency"
              className="logo-image"
            />
          </Link>
        </div>

        <button
          ref={burgerRef}
          className={`burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav ref={navRef} className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={handleLinkClick} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/services" onClick={handleLinkClick} className={location.pathname === '/services' ? 'active' : ''}>Servicios</Link>
          <Link to="/portfolio" onClick={handleLinkClick} className={location.pathname === '/portfolio' ? 'active' : ''}>Trabajos</Link>
          <Link to="/about" onClick={handleLinkClick} className={location.pathname === '/about' ? 'active' : ''}>Nosotros</Link>
          <Link to="/contact" onClick={handleLinkClick} className={location.pathname === '/contact' ? 'active' : ''}>Contacto</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header