import React from 'react'

export default function PageHero({ tag, title, subtitle, image }) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden" style={{ minHeight: 340 }}>
      {/* BG */}
      <div className="absolute inset-0 bg-cover bg-center scale-105"
           style={{ backgroundImage: `url('${image}')` }} />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/96 via-primary-950/85 to-primary-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />
      {/* Grain */}
      <div className="absolute inset-0 opacity-[.025]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      {/* Left stripe */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-amber-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
        <span className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[.18em]
                          text-amber-400 mb-4 before:content-[''] before:block before:w-8 before:h-0.5
                          before:bg-amber-500 before:rounded-full after:content-[''] after:block
                          after:w-8 after:h-0.5 after:bg-amber-500 after:rounded-full">
          {tag}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white mt-1 mb-4"
            style={{ letterSpacing: '-.025em' }}>
          {title}
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )
}
