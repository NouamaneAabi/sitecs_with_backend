import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { MdElectricBolt } from 'react-icons/md'
import { FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const navigate                = useNavigate()
  const location                = useLocation()
  const { t, i18n }             = useTranslation()

  const navLinks = [
    { label: t('nav.home', 'Accueil'),        to: '/' },
    { label: t('nav.about', 'À Propos'),     to: '/about' },
    { label: t('nav.activities', 'Activités'), to: '/activities' },
    { label: t('nav.projects', 'Projets'),   to: '/projects' },
    { label: t('nav.contact', 'Contact'),    to: '/contact' },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  const isScrolled = scrolled || open

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-primary-950/98 shadow-[0_4px_32px_rgba(0,0,0,.32)] py-3'
          : 'bg-transparent py-5'
      }`}
      style={{ backdropFilter: isScrolled ? 'blur(20px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 group-hover:from-amber-300 group-hover:to-amber-500 transition-all duration-300" />
            <MdElectricBolt className="absolute inset-0 m-auto text-white text-[1.35rem]" />
          </div>
          <div className="leading-none">
            <div className="text-white font-black text-[1.3rem] tracking-[.12em]">
              SITE<span className="text-amber-400">CS</span>
            </div>
            <div className="text-[.5rem] font-semibold tracking-[.14em] text-slate-400 uppercase mt-0.5">
              {t('brand.tagline')}
            </div>
          </div>
        </Link>

        {/* ── Desktop nav ──────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-[.82rem] font-bold uppercase tracking-[.1em] rounded-lg
                 transition-all duration-200 ${
                   isActive
                     ? 'text-amber-400 nav-dot'
                     : 'text-slate-300 hover:text-white hover:bg-white/6'
                 }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Sélecteur de langue */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-primary-900 text-white rounded px-2 py-1 ml-4 border border-amber-500"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </nav>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <button
            onClick={() => navigate('/contact')}
            className="btn-primary text-sm px-6 py-3"
          >
            {t('nav.request_quote')} <FiArrowRight className="text-base" />
          </button>
        </div>

        {/* ── Mobile burger ────────────────────────────────── */}
        <button
          className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white rounded-lg
                     bg-white/8 hover:bg-white/15 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`absolute transition-all duration-300 ${open ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}>
            <HiX className="text-xl" />
          </span>
          <span className={`absolute transition-all duration-300 ${open ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`}>
            <HiMenuAlt3 className="text-xl" />
          </span>
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/8 mx-4 sm:mx-8 mt-3" />
        <div className="px-4 sm:px-8 py-5 flex flex-col gap-1">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-[.1em] transition-all ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10 pl-6'
                    : 'text-slate-300 hover:text-white hover:bg-white/8 hover:pl-6'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <button
            onClick={() => navigate('/contact')}
            className="btn-primary mt-3 justify-center text-sm"
          >
            {t('nav.request_quote')} <FiArrowRight />
          </button>

          {/* Sélecteur de langue mobile */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-primary-900 text-white rounded px-2 py-1 mt-3 border border-amber-500"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
    </header>
  )
}