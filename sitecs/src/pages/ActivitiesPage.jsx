import React from 'react'
import PageHero from '../components/PageHero'
import { MdConstruction, MdFactory, MdComputer, MdSolarPower, MdBuildCircle } from 'react-icons/md'
import { FiCheck } from 'react-icons/fi'
import useReveal from '../hooks/useReveal'

const activities = [
  {
    icon: MdConstruction, color: 'bg-blue-600', title: 'Construction',
    sub: 'Bâtiments & Travaux Publics',
    desc: 'SITECS réalise des projets de construction résidentiels, commerciaux et d\'infrastructures publiques avec des matériaux durables et des techniques modernes.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    points: ['Bâtiments résidentiels & commerciaux', 'Ouvrages d\'art & ponts', 'Routes & infrastructures', 'Génie civil & fondations'],
  },
  {
    icon: MdFactory, color: 'bg-slate-700', title: 'Activités Industrielles',
    sub: 'Production & Maintenance',
    desc: 'Installations industrielles clés en main, maintenance préventive et corrective, optimisation des processus de production et formation des équipes.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    points: ['Installations clés en main', 'Maintenance préventive', 'Optimisation de production', 'Formation opérateurs'],
  },
  {
    icon: MdComputer, color: 'bg-indigo-700', title: 'Solutions Tech',
    sub: 'Innovation & IT',
    desc: 'Intégration de systèmes SCADA, automatisation industrielle, solutions numériques et infrastructure IT sur mesure pour moderniser vos opérations.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    points: ['Systèmes SCADA & supervision', 'Automatisation industrielle', 'Infrastructure réseau & IT', 'Solutions numériques métier'],
  },
  {
    icon: MdSolarPower, color: 'bg-amber-600', title: 'Activités Énergie',
    sub: 'Énergies renouvelables',
    desc: 'Conception et déploiement de centrales solaires photovoltaïques, parcs éoliens et systèmes hybrides pour une autonomie énergétique durable.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    points: ['Centrales solaires PV', 'Parcs éoliens', 'Systèmes hybrides & stockage', 'Audit & conseil énergétique'],
  },
  {
    icon: MdBuildCircle, color: 'bg-teal-700', title: 'Réhabilitation',
    sub: 'Rénovation & Modernisation',
    desc: 'Réhabilitation complète de bâtiments existants, mise aux normes énergétiques, et modernisation des infrastructures industrielles vieillissantes.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    points: ['Rénovation complète', 'Mise aux normes énergétiques', 'Modernisation d\'usines', 'Restauration du patrimoine'],
  },
]

export default function ActivitiesPage() {
  const ref = useReveal()

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
          {activities.map(({ icon: Icon, color, title, sub, desc, image, points }, i) => (
            <div key={title}
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
                <ul className="space-y-3">
                  {points.map(pt => (
                    <li key={pt} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                      <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/30
                                        flex items-center justify-center flex-shrink-0">
                        <FiCheck className="text-amber-600 text-xs" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
