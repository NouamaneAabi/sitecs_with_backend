import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { GiWindTurbine } from 'react-icons/gi'
import { MdSolarPower, MdConstruction } from 'react-icons/md'

import { useTranslation } from 'react-i18next'

export default function Hero() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const stats = [
    { value: '15+', label: t('hero.stats.years') },
    { value: '200+', label: t('hero.stats.projects') },
    { value: '50+', label: t('hero.stats.experts') },
    { value: '8', label: t('hero.stats.countries') },
  ]

  // Small floating badge component
  function FloatingBadge({ icon: Icon, label, className }) {
    return (
      <div className={`glass rounded-2xl px-4 py-3 flex items-center gap-3 ${className}`}>
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
          <Icon className="text-amber-400 text-lg" />
        </div>
        <span className="text-white text-xs font-bold whitespace-nowrap">{label}</span>
      </div>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── BG image ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')` }}
      />

      {/* ── Multi-layer overlay for depth ─────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-900/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent" />

      {/* ── Noise grain ───────────────────────────────────────── */}
      <div className="absolute inset-0 opacity-[.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* ── Accent left stripe ────────────────────────────────── */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-amber-500 to-transparent" />

      {/* ── Decorative floating elements ──────────────────────── */}
      <div className="absolute right-8 top-28 opacity-[.06] spin-slow pointer-events-none">
        <GiWindTurbine className="text-[260px] text-white" />
      </div>
      <div className="absolute right-48 bottom-24 opacity-[.04] float-anim pointer-events-none">
        <MdSolarPower className="text-[160px] text-white" />
      </div>

      {/* ── Geometric accent circles ──────────────────────────── */}
      <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[.04] pointer-events-none" />
      <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-500/[.08] pointer-events-none" />

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-28 pb-20 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow badge */}
          <div className="anim-badge inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 mb-8
                          border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-black uppercase tracking-[.16em]">
            <HiOutlineLightningBolt className="text-amber-400 text-sm" />
            {t('hero.badge')}
          </div>

          {/* H1 */}
          <h1 className="anim-1 text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.08] mb-6">
            {t('hero.title')}
          </h1>

          {/* Subline */}
          <p className="anim-2 text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
            {t('hero.subtitle')}
          </p>

          {/* CTA row */}
          <div className="anim-3 flex flex-wrap items-center gap-4 mb-16">
            <button onClick={() => navigate('/contact')} className="btn-primary text-base px-8 py-4">
              {t('hero.cta_contact')} <FiArrowRight className="text-lg" />
            </button>
            <button onClick={() => navigate('/projects')} className="btn-ghost text-base px-8 py-4">
              <FiPlay className="text-sm" /> {t('hero.cta_projects')}
            </button>
          </div>

          {/* Stats row */}
          <div className="anim-4 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {stats.map(({ value, label }, i) => (
              <div key={label} className="relative pl-5 border-l-2 border-amber-500/40 hover:border-amber-500 transition-colors group">
                <div className="text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                  {value}
                </div>
                <div className="text-slate-400 text-[.7rem] font-semibold uppercase tracking-wider mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating info badges (desktop) ───────────────────── */}
      <div className="hidden xl:block">
        <FloatingBadge
          icon={MdConstruction}
          label={t('hero.badges.construction')}
          className="absolute right-16 top-1/3 float-anim"
          style={{ animationDelay: '0s' }}
        />
        <FloatingBadge
          icon={MdSolarPower}
          label={t('hero.badges.renewable')}
          className="absolute right-36 top-1/2 float-anim"
          style={{ animationDelay: '1.5s' }}
        />
        <FloatingBadge
          icon={GiWindTurbine}
          label={t('hero.badges.wind')}
          className="absolute right-8 top-2/3 float-anim"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* ── Scroll cue ────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-16 flex items-center gap-3 animate-bounce">
        <div className="flex flex-col gap-1">
          <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500/80 to-transparent rounded mx-auto" />
        </div>
        <span className="text-slate-500 text-[.65rem] uppercase tracking-[.2em]">{t('hero.scroll')}</span>
      </div>
    </section>
  )
}