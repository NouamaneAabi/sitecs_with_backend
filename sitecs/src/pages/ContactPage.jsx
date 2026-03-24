import React from 'react'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi'
import useReveal from '../hooks/useReveal'

const cards = [
  { icon: FiPhone,  title: 'Téléphone', lines: ['+240 222 000 000', '+240 333 000 000'],        color: 'bg-blue-600' },
  { icon: FiMail,   title: 'Email',     lines: ['contact@sitecs.com', 'devis@sitecs.com'],       color: 'bg-amber-500' },
  { icon: FiMapPin, title: 'Adresse',   lines: ['Malabo, Guinée Équatoriale', 'Afrique Centrale'], color: 'bg-teal-600' },
  { icon: FiClock,  title: 'Horaires',  lines: ['Lun – Ven : 08h – 18h', 'Sam : 09h – 13h'],   color: 'bg-slate-700' },
]

export default function ContactPage() {
  const ref = useReveal()
  return (
    <>
      <PageHero
        tag="Nous joindre"
        title="Contactez-nous"
        subtitle="Notre équipe est à votre disposition pour étudier votre projet et proposer la meilleure solution."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Info cards */}
      <section ref={ref} className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map(({ icon: Icon, title, lines, color }, i) => (
              <div key={title}
                className={`reveal delay-${i*100} card-premium p-7 group cursor-default`}>
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5
                                  shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white text-xl" />
                </div>
                <h3 className="font-black text-primary-900 mb-2 text-sm uppercase tracking-wider">{title}</h3>
                {lines.map(l => (
                  <p key={l} className="text-slate-500 text-sm">{l}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
