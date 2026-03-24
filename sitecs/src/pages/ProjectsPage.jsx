import React, { useState } from 'react'
import PageHero from '../components/PageHero'
import { FiMapPin, FiArrowRight } from 'react-icons/fi'
import useReveal from '../hooks/useReveal'

const projects = [
  { id:1, cat:'Construction', color:'bg-blue-600',   title:'Complexe Résidentiel Malabo Nord',     location:'Malabo, Guinée Équatoriale', year:'2023', desc:'Construction d\'un complexe de 120 logements avec toutes les commodités modernes.',                   image:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  { id:2, cat:'Industrie',    color:'bg-slate-700',  title:'Usine de Transformation Alimentaire',  location:'Bata, Guinée Équatoriale',    year:'2022', desc:'Installation et mise en service d\'une usine avec systèmes automatisés.',                         image:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' },
  { id:3, cat:'Énergie',      color:'bg-amber-600',  title:'Centrale Solaire 5 MWc',               location:'Afrique Centrale',            year:'2023', desc:'Conception et déploiement d\'une centrale photovoltaïque de 5 MWc pour 3 000 foyers.',           image:'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
  { id:4, cat:'Construction', color:'bg-blue-600',   title:'Immeuble de Bureaux Corporatifs',      location:'Malabo, Guinée Équatoriale',  year:'2021', desc:'Construction d\'un immeuble de bureaux de 8 étages certifié aux normes environnementales.',      image:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { id:5, cat:'Tech',         color:'bg-indigo-700', title:'Système SCADA Réseau Eau',             location:'Cameroun',                    year:'2022', desc:'Déploiement d\'un système SCADA pour la gestion d\'un réseau de distribution d\'eau.',          image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { id:6, cat:'Énergie',      color:'bg-amber-600',  title:'Parc Éolien Côtier 24 MW',             location:'Gabon',                       year:'2023', desc:'Installation de 12 éoliennes pour une puissance totale de 24 MW en zone côtière.',             image:'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80' },
]

const cats = ['Tous', 'Construction', 'Industrie', 'Énergie', 'Tech']

export default function ProjectsPage() {
  const ref    = useReveal()
  const [cat, setCat] = useState('Tous')
  const list   = cat === 'Tous' ? projects : projects.filter(p => p.cat === cat)

  return (
    <>
      <PageHero
        tag="Portfolio"
        title="Nos Réalisations"
        subtitle="Des projets ambitieux livrés avec excellence à travers l'Afrique."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
      />

      <section ref={ref} className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

          {/* Filter tabs */}
          <div className="reveal flex flex-wrap gap-3 justify-center mb-14">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-250 ${
                  cat === c
                    ? 'bg-primary-900 text-white shadow-lg shadow-primary-900/25'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-primary-300 hover:text-primary-800 hover:shadow-md'
                }`}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {list.map((p, i) => (
              <div key={p.id}
                className={`reveal delay-${[0,100,200,0,100,200][i]} group card-premium cursor-pointer`}>

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-4 left-4 ${p.color} text-white text-[.63rem] font-black uppercase tracking-widest px-3 py-1.5 rounded-full`}>
                    {p.cat}
                  </span>
                  <span className="absolute top-4 right-4 glass text-white text-[.7rem] font-bold px-3 py-1 rounded-full">
                    {p.year}
                  </span>
                  <p className="absolute bottom-3 left-4 text-white/80 text-xs flex items-center gap-1">
                    <FiMapPin className="text-amber-400" /> {p.location}
                  </p>
                </div>

                {/* Body */}
                <div className="p-7">
                  <h3 className="text-base font-black text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex items-center gap-1.5 text-primary-700 text-sm font-bold
                                  translate-x-0 group-hover:translate-x-1 transition-transform">
                    Voir Plus <FiArrowRight className="text-xs" />
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-[2px] bg-gradient-to-r from-amber-500 to-amber-600
                                 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>

          {list.length === 0 && (
            <div className="text-center py-20 text-slate-400">Aucun projet dans cette catégorie.</div>
          )}
        </div>
      </section>
    </>
  )
}
