import React from 'react'
import PageHero from '../components/PageHero'
import { FaAward, FaHandshake, FaLeaf } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import useReveal from '../hooks/useReveal'

const values = [
  { icon: FaAward,     title: 'Excellence',  desc: 'Nous visons le plus haut standard de qualité dans chaque réalisation.' },
  { icon: FaHandshake, title: 'Intégrité',   desc: 'Des relations transparentes et éthiques avec nos clients et partenaires.' },
  { icon: FaLeaf,      title: 'Durabilité',  desc: 'Des solutions respectueuses de l\'environnement pour un avenir durable.' },
]

const timeline = [
  { year: '2008', title: 'Fondation', event: 'Création de SITECS à Malabo, Guinée Équatoriale.' },
  { year: '2011', title: 'Expansion', event: 'Développement des activités industrielles et maintenance.' },
  { year: '2015', title: 'Énergie',   event: 'Lancement de la division Énergies Renouvelables.' },
  { year: '2018', title: 'Tech',      event: 'Ouverture du département Solutions Technologiques.' },
  { year: '2023', title: 'Afrique',   event: 'Extension à 8 pays africains et 200+ projets réalisés.' },
]

const highlights = [
  '15+ années d\'expérience',
  '200+ projets livrés avec succès',
  'Présence dans 8 pays africains',
  '50+ experts qualifiés',
]

export default function About() {
  const ref1 = useReveal()
  const ref2 = useReveal()
  const ref3 = useReveal()

  return (
    <>
      <PageHero
        tag="Notre histoire"
        title="À Propos de SITECS"
        subtitle="Depuis 2008, SITECS bâtit l'avenir industriel et énergétique de l'Afrique avec rigueur et passion."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Mission */}
      <section ref={ref1} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="reveal-left">
              <span className="section-tag">Notre mission</span>
              <h2 className="section-title">Bâtir l'Afrique de Demain</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                SITECS est une société industrielle panafricaine spécialisée dans la construction,
                l'énergie, le transport et les services. Avec une présence dans 8 pays, nous réalisons
                des projets complexes en combinant expertise locale et standards internationaux.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Notre approche intégrée — de la conception à la livraison — garantit des solutions sur
                mesure, adaptées aux réalités du continent africain.
              </p>
              <ul className="space-y-3">
                {highlights.map(pt => (
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

            <div className="reveal-right relative">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                   alt="SITECS en action"
                   className="rounded-3xl shadow-2xl w-full h-96 object-cover" />
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white rounded-2xl p-6 shadow-2xl">
                <div className="text-4xl font-black">15+</div>
                <div className="text-xs font-black uppercase tracking-widest mt-1 text-amber-100">
                  Années d'Expérience
                </div>
              </div>
              {/* Second badge */}
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl px-5 py-4 shadow-xl
                               border border-slate-100 hidden md:block">
                <div className="text-2xl font-black text-primary-900">200+</div>
                <div className="text-[.65rem] font-black uppercase tracking-widest text-slate-400 mt-0.5">
                  Projets livrés
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={ref2} className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <div className="reveal mb-16">
            <span className="section-tag justify-center">Ce qui nous guide</span>
            <h2 className="section-title text-center">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div key={title}
                className={`reveal delay-${i * 150} card-premium p-10 group cursor-default`}>
                <div className="w-16 h-16 bg-primary-900 rounded-2xl flex items-center justify-center
                                 mx-auto mb-6 group-hover:bg-amber-500 transition-colors duration-400 shadow-lg">
                  <Icon className="text-2xl text-amber-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-primary-900 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={ref3} className="py-28"
        style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0f2144 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-16 reveal">
            <span className="section-tag !text-amber-400 justify-center">Notre parcours</span>
            <h2 className="section-title !text-white text-center">Histoire de SITECS</h2>
          </div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2
                             bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden md:block" />

            <div className="space-y-10">
              {timeline.map(({ year, title, event }, i) => (
                <div key={year}
                  className={`reveal delay-${i * 100} flex flex-col md:flex-row items-center gap-6
                               ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="inline-block bg-white/[.06] border border-white/[.10] rounded-2xl p-6
                                     hover:border-amber-500/30 transition-colors">
                      <div className="text-amber-400 font-black text-lg mb-0.5">{title}</div>
                      <p className="text-slate-400 text-sm">{event}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500 border-4 border-primary-900
                                     flex items-center justify-center text-white font-black text-xs z-10 shadow-lg">
                      {year.slice(2)}
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
