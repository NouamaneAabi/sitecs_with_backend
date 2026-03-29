import React from 'react'
import PageHero from '../components/PageHero'
import { MdConstruction, MdFactory, MdComputer, MdSolarPower, MdBuildCircle } from 'react-icons/md'
import { FiCheck } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'

const activitiesStyle = {
  construction: { icon: MdConstruction, color: 'bg-blue-600', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  factory: { icon: MdFactory, color: 'bg-slate-700', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  computer: { icon: MdComputer, color: 'bg-indigo-700', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  solar: { icon: MdSolarPower, color: 'bg-amber-600', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
  solutions: { icon: MdBuildCircle, color: 'bg-teal-700', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' }
}

export default function ActivitiesPage() {
  const { t } = useTranslation()
  const ref = useReveal()

  const cards = t('activities.cards', { returnObjects: true }) || {}
  const order = ['factory', 'construction', 'solar', 'computer', 'solutions']
  const cardKeys = [...order.filter(k => cards[k]), ...Object.keys(cards).filter(k => !order.includes(k))]

  const translatedActivities = cardKeys.map(key => {
    const data = cards[key] || {}
    const style = activitiesStyle[key] || { icon: MdComputer, color: 'bg-slate-700', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' }

    const points = (data.points && data.points.length > 0)
      ? data.points
      : (data.sections ? data.sections.flatMap(section => section.points || []) : [])

    return {
      key,
      icon: style.icon,
      color: style.color,
      title: data.title || '',
      sub: data.sub || '',
      desc: data.conclusion || data.desc || '',
      points,
      image: style.image
    }
  })

  return (
    <>
      <PageHero
        tag="Secteurs d'intervention"
        title="Nos Activités"
        subtitle="SITECS couvre un large spectre de secteurs industriels pour répondre à tous vos besoins."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
      />

      <section ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 space-y-24">
          {translatedActivities.map(({ key, icon: Icon, color, title, sub, desc, image, points }, i) => (
            <div key={key || title || i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${i%2!==0 ? 'lg:[&>*:first-child]:order-2' : ''}`}>

              {/* Image side */}
              <div className={`reveal-${i%2===0?'left':'right'} relative`}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src={image} alt={title} className="w-full h-80 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 to-transparent" />
                </div>
                {/* Icon badge */}
                <div className={`absolute -bottom-5 ${i%2===0?'-right-5':'right-5'} w-16 h-16 ${color} rounded-2xl
                                 flex items-center justify-center shadow-xl border-4 border-white`}>
                  <Icon className="text-white text-3xl" />
                </div>
              </div>

              {/* Text side */}
              <div className={`reveal-${i%2===0?'right':'left'}`}>
                <span className="section-tag">{sub}</span>
                <h2 className="section-title">{title}</h2>
                <p className="text-slate-500 leading-relaxed mb-7">{desc}</p>
                {points.length > 0 && (
                  <ul className="space-y-3">
                    {points.map(pt => (
                      <li key={pt} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                        <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="text-amber-600 text-xs" />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
