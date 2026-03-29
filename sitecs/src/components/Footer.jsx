import React from 'react'
import { Link } from 'react-router-dom'
import { MdElectricBolt } from 'react-icons/md'
import { FiPhone, FiMail, FiMapPin, FiLinkedin, FiFacebook, FiTwitter, FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const quickLinks = [
  { labelKey: 'nav.home',   to: '/' },
  { labelKey: 'nav.about',  to: '/about' },
  { labelKey: 'nav.activities', to: '/activities' },
  { labelKey: 'nav.projects',   to: '/projects' },
  { labelKey: 'nav.contact',   to: '/contact' },
]
const services = [
  'footer.services.1',
  'footer.services.2',
  'footer.services.3',
  'footer.services.4',
  'footer.services.5',
]

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #0a1628 0%, #0f2144 100%)' }}>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />

      {/* Top divider */}
      <div className="h-[2px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,.5), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <MdElectricBolt className="text-white text-[1.35rem]" />
              </div>
              <div>
                <div className="text-white font-black text-xl tracking-[.12em]">
                  SITE<span className="text-amber-400">CS</span>
                </div>
                <div className="text-[.5rem] font-semibold tracking-[.14em] text-slate-500 uppercase">
                  {t('brand.tagline')}
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-2.5">
              {[FiLinkedin, FiFacebook, FiTwitter].map((Icon, i) => (
                <a key={i} href="#"
                   className="w-9 h-9 rounded-lg bg-white/[.06] hover:bg-amber-500
                              flex items-center justify-center text-slate-300 hover:text-white
                              transition-all duration-300 hover:-translate-y-0.5 border border-white/[.08] hover:border-amber-500">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[.18em] mb-5">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ labelKey, to }) => (
                <li key={to}>
                  <Link to={to}
                    className="flex items-center gap-2 text-slate-400 hover:text-amber-400
                               text-sm font-medium transition-colors group">
                    <FiArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[.18em] mb-5">
              {t('footer.services_title')}
            </h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <Link to="/activities"
                    className="flex items-center gap-2 text-slate-400 hover:text-amber-400
                               text-sm font-medium transition-colors group">
                    <FiArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                    {t(s)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[.18em] mb-5">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              {[
                { Icon: FiPhone,  text: '+240 222 31 82 82 /  +212 601 28 19 50', href: 'tel:+240222318282' },
                { Icon: FiMail,   text: 'contact@sitecs.com',     href: 'mailto:contact@sitecs.com' },
                { Icon: FiMapPin, text: 'Malabo – Guinée Équatoriale', href: '#' },
              ].map(({ Icon, text, href }) => (
                <li key={text}>
                  <a href={href}
                     className="flex items-start gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors group">
                    <div className="w-7 h-7 rounded-lg bg-white/[.05] flex items-center justify-center flex-shrink-0 mt-0.5
                                    group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="text-amber-500 text-xs" />
                    </div>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[.07] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} SITECS — {t('footer.copyright')}
          </p>
          <p className="text-slate-600 text-xs">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
