import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Activities from '../components/Activities'
import WhyChooseUs from '../components/WhyChooseUs'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import { FiMapPin } from 'react-icons/fi'
import zoneImage from '../images/WhatsApp Image 2026-03-27 at 15.03.59.jpeg'

const interventionZone = {
  title: "ZONE D’INTERVENTION",
  subtitle: "Afrique de l’Ouest et Centrale",
  countries: [
    'Guinée Équatoriale',
    'Sao Tome',
    'Gabon',
    'Cameroun',
    'Ghana',
    'Nigeria'
  ],
  image: zoneImage
}

export default function Home() {
  const [imageVisible, setImageVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setImageVisible(true), 150)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <Hero />
      <Activities />

      <section className="py-20 bg-gradient-to-r from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <article>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">{interventionZone.title}</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">{interventionZone.subtitle}</h2>
              <p className="mt-4 text-slate-600">Nous intervenons sur les marchés stratégiques suivants :</p>
              <ul className="mt-5 space-y-2 text-slate-700">
                {interventionZone.countries.map(country => (
                  <li key={country} className="flex items-center gap-2">
                    <FiMapPin className="text-amber-500" />
                    <span>{country}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="overflow-hidden rounded-3xl shadow-2xl border border-slate-100 h-[450px] sm:h-[480px] md:h-[500px] lg:h-[460px]">
              <img
                src={interventionZone.image}
                alt="Carte intervention Afrique de l'Ouest et Centrale"
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:scale-105 hover:shadow-2xl`}
                style={{ transformOrigin: 'center center' }}
              />
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Projects />
      <Contact />
    </>
  )
}
