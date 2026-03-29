// src/components/Activities.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdConstruction, MdFactory, MdComputer, MdSolarPower, MdBuildCircle } from 'react-icons/md'
import { FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import frLocale from '../locales/fr.json'
import useReveal from '../hooks/useReveal'

const activityStyles = {
  construction: {
    icon: MdConstruction,
    gradient: 'from-blue-600 to-blue-800',
    iconBg: 'bg-blue-600/10 border-blue-600/20 text-blue-600'
  },
  factory: {
    icon: MdFactory,
    gradient: 'from-slate-600 to-slate-800',
    iconBg: 'bg-slate-600/10 border-slate-500/20 text-slate-600'
  },
  computer: {
    icon: MdComputer,
    gradient: 'from-indigo-600 to-indigo-800',
    iconBg: 'bg-indigo-600/10 border-indigo-500/20 text-indigo-600'
  },
  solar: {
    icon: MdSolarPower,
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-600'
  },
  solutions: {
    icon: MdBuildCircle,
    gradient: 'from-teal-600 to-teal-800',
    iconBg: 'bg-teal-600/10 border-teal-500/20 text-teal-600'
  }
}

function ActivityCard({ activity, delay, num }) {
  const { t } = useTranslation()
  const Icon = activity.icon

  return (
    <div className={`reveal delay-${delay} group card-premium flex flex-col`}>
      <div className={`h-1 w-full bg-gradient-to-r ${activity.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${activity.iconBg}`}>
            <Icon className="text-2xl" />
          </div>
          <span className="text-[2rem] font-black text-slate-100 leading-none">{num}</span>
        </div>

        <h3 className="text-lg font-black text-primary-900 mb-1 group-hover:text-primary-700 transition-colors">
          {activity.title}
        </h3>

        <p className="text-amber-600 text-[.7rem] font-black uppercase tracking-widest mb-3">
          {activity.sub}
        </p>

        <div className="text-slate-500 text-sm leading-relaxed flex-1 space-y-3">
          {activity.text && <p>{activity.text}</p>}

          {activity.points && (
            <ul className="space-y-1 text-xs text-slate-600">
              {activity.points.map((point, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-amber-600">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {activity.sections && (
            <div className="space-y-3">
              {activity.sections.map((section, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-slate-700 text-xs mb-1">{section.title}</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {section.points.map((point, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-amber-600">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activity.conclusion && <p className="font-semibold text-slate-700">{activity.conclusion}</p>}
        </div>

        <div className="flex flex-wrap gap-2 mt-5 mb-5">
          {activity.tags?.map(tagText => (
            <span key={tagText} className="text-[.65rem] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 rounded-full px-2.5 py-1 bg-slate-50">
              {tagText}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-primary-700 text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {t('activities.action_view_more')} <FiArrowRight className="text-xs" />
        </div>
      </div>
    </div>
  )
}

export default function Activities() {
  const { t } = useTranslation()
  const ref = useReveal()
  const navigate = useNavigate()

  const activitiesData = t('activities.cards', { returnObjects: true }) || {}
  const fallbackActivities = frLocale.activities?.cards || {}
  const fallbackSolution = fallbackActivities.solutions || {
    title: 'Solutions & Services',
    sub: 'Des solutions techniques avancées :',
    points: [
      'Technologics industriclies',
      'Réhabilitation d\'infrastructures',
      'Modernisation d\'équipements',
      'Ingénierie & conseil'
    ],
    conclusion: 'Nous améliorons la performance et la durabilité de vos installations.'
  }

  if (!activitiesData.solutions) {
    if (fallbackActivities.solutions) {
      activitiesData.solutions = fallbackActivities.solutions
      console.info('[Activities] injecting solutions from fr locale fallback')
    } else {
      activitiesData.solutions = fallbackSolution
      console.warn('[Activities] injecting manual fallback solutions card')
    }
  }

  const preferredOrder = ['factory', 'construction', 'solar', 'computer', 'solutions']
  const activityKeys = Object.keys(activitiesData)
  const orderedActivityKeys = [
    ...preferredOrder.filter(key => activityKeys.includes(key)),
    ...activityKeys.filter(key => !preferredOrder.includes(key))
  ]

  console.log('[Activities] ordered card keys', orderedActivityKeys)


  return (
    <section ref={ref} className="py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[.025]" style={{ backgroundImage: `linear-gradient(rgba(30,58,138,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="section-wrap relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="reveal max-w-xl">
            <span className="section-tag">{t('activities.section_tag')}</span>
            <h2 className="section-title">{t('activities.title')}</h2>
            <p className="section-body">{t('activities.subtitle')}</p>
          </div>
          <div className="reveal delay-200 flex-shrink-0">
            <button onClick={() => navigate('/activities')} className="btn-primary">
              {t('activities.cta_view_all')} <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedActivityKeys.map((key, i) => {
            const data = activitiesData[key]
            const style = activityStyles[key] || {
              icon: MdComputer,
              gradient: 'from-gray-600 to-gray-800',
              iconBg: 'bg-gray-600/10 border-gray-500/20 text-gray-600'
            }
            const entry = { ...style, ...data }

            return (
              <ActivityCard
                key={key}
                activity={entry}
                delay={i * 100}
                num={`0${i + 1}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}