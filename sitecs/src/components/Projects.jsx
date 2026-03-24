import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'

const staticProjects = [
  {
    id: 1,
    catColor: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    catColor: 'bg-slate-700',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    catColor: 'bg-amber-600',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
  },
]

function ProjectCard({ p, delay }) {
  const navigate = useNavigate()
  return (
    <div className={`reveal delay-${delay} group relative rounded-3xl overflow-hidden cursor-pointer`}
         style={{ boxShadow: '0 4px 24px rgba(0,0,0,.1)', height: '420px' }}
         onClick={() => navigate('/projects')}>

      {/* Image */}
      <img src={p.image} alt={p.title}
           className="absolute inset-0 w-full h-full object-cover
                      transition-transform duration-700 ease-out group-hover:scale-110" />

      {/* Permanent bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />

      {/* Full overlay on hover */}
      <div className="absolute inset-0 bg-primary-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top row */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        <span className={`${p.catColor} text-white text-[.65rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}>
          {p.cat}
        </span>
        <div className="w-8 h-8 rounded-full glass flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-all duration-400 rotate-45 group-hover:rotate-0">
          <FiArrowRight className="text-white text-sm" />
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7
                      translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
        <p className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-2">
          <FiMapPin /> {p.location}
        </p>
        <h3 className="text-white font-black text-xl mb-3">{p.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100
                      transition-opacity duration-500 delay-100 max-h-0 group-hover:max-h-20 overflow-hidden">
          {p.desc}
        </p>
        <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-bold
                        opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
          {p.action_view_more} <FiArrowRight className="text-xs" />
        </div>
      </div>

      {/* Amber bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const ref = useReveal()
  const navigate = useNavigate()

  const cardsFromLocale = t('projects.cards', { returnObjects: true })
  const imageUrls = [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
  ]
  const catColors = ['bg-blue-600', 'bg-slate-700', 'bg-amber-600']

  const projectsData = Object.values(cardsFromLocale).map((card, i) => ({
    ...card,
    id: i + 1,
    catColor: catColors[i] || 'bg-slate-700',
    image: imageUrls[i] || imageUrls[0],
    action_view_more: t('projects.action_view_more'),
  }))

  return (
    <section ref={ref} className="py-28 bg-white relative">

      {/* Subtle top rule */}
      <div className="divider absolute top-0 inset-x-0" />

      <div className="section-wrap">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="reveal max-w-xl">
            <span className="section-tag">{t('projects.section_tag')}</span>
            <h2 className="section-title">{t('projects.title')}</h2>
            <p className="section-body">
              {t('projects.subtitle')}
            </p>
          </div>
          <div className="reveal delay-200">
            <button onClick={() => navigate('/projects')} className="btn-primary">
              {t('projects.cta_all_projects')} <HiOutlineExternalLink className="text-lg" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((p, i) => (
            <ProjectCard key={p.id} p={p} delay={[0, 150, 300][i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
