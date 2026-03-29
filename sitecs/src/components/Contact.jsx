import React, { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiLinkedin, FiFacebook, FiSend, FiCheck } from 'react-icons/fi'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import useReveal from '../hooks/useReveal'

// ── API endpoint — update this for production ──────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const contactDetails = [
  { icon: FiPhone,  labelKey: 'contact.details.phone', value: ' +240 222 31 82 82 /  +212 601 28 19 50', href: 'tel:+240222318282' },
  { icon: FiMail,   labelKey: 'contact.details.email', value: 'contact@sitecs.com', href: 'mailto:contact@sitecs.com' },
  { icon: FiMapPin, labelKey: 'contact.details.address', value: 'Malabo – Guinée Équatoriale', href: '#' },
]

const INITIAL = { name: '', email: '', phone: '', message: '' }

function InputField({ label, name, type = 'text', placeholder, value, onChange, error, rows }) {
  const base = `w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm text-slate-800 outline-none
                transition-all duration-200 placeholder:text-slate-400 font-medium
                focus:bg-white focus:border-primary-500 focus:ring-3 focus:ring-primary-500/10
                ${error ? 'border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400/10'
                        : 'border-slate-200 hover:border-slate-300'}`

  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
        {label}
      </label>
      {rows
        ? <textarea name={name} rows={rows} placeholder={placeholder} value={value}
                    onChange={onChange} className={`${base} resize-none`} />
        : <input type={type} name={name} placeholder={placeholder} value={value}
                 onChange={onChange} className={base} />
      }
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <HiOutlineExclamationCircle /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const ref = useReveal()
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim())                          e.name    = t('contact.validation.name_required')
    if (!form.email.trim())                         e.email   = t('contact.validation.email_required')
    else if (!/\S+@\S+\.\S+/.test(form.email))  e.email   = t('contact.validation.email_invalid')
    if (!form.message.trim())                       e.message = t('contact.validation.message_required')
    return e
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('loading'); setErrors({})

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(form),
      })

      const json = await res.json()

      if (!res.ok) {
        if (res.status === 400 && json.errors) {
          setErrors(json.errors)
          setStatus('idle')
        } else {
          setStatus('error')
        }
        return
      }

      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  return (
    <section ref={ref} className="py-28 bg-slate-50 relative overflow-hidden">

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white pointer-events-none
                      hidden lg:block" style={{ clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)' }} />

      <div className="section-wrap relative z-10">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="section-tag justify-center">{t('contact.section_tag')}</span>
          <h2 className="section-title text-center">{t('contact.title')}</h2>
          <p className="section-body mx-auto text-center">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16 items-start">

          {/* ── Left panel ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8 reveal-left">

            {/* Intro */}
            <div>
              <h3 className="text-2xl font-black text-primary-900 mb-3">{t('contact.info_title')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('contact.info_description')}
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, labelKey, value, href }) => (
                <a key={labelKey} href={href}
                   className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100
                              hover:border-primary-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-primary-900 flex items-center justify-center
                                  flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-300">
                    <Icon className="text-white text-base" />
                  </div>
                  <div>
                    <p className="text-[.65rem] font-black uppercase tracking-widest text-slate-400 mb-3">{t(labelKey)}</p>
                    <p className="text-slate-800 font-bold text-sm group-hover:text-primary-700 transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-[.65rem] font-black uppercase tracking-widest text-slate-400 mb-3">{t('contact.follow_us')}</p>
              <div className="flex gap-3">
                {[FiLinkedin, FiFacebook].map((Icon, i) => (
                  <a key={i} href="#"
                     className="w-11 h-11 bg-primary-900 hover:bg-amber-500 rounded-xl flex items-center justify-center
                                text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <Icon className="text-base" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map thumb */}
            <div className="rounded-2xl overflow-hidden h-44 relative ring-1 ring-slate-200">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                   alt="Localisation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary-950/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <FiMapPin className="text-white text-lg" />
                  </div>
                  <p className="text-white font-bold text-sm">{t('contact.map_location')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Form ─────────────────────────────────────────── */}
          <div className="lg:col-span-3 reveal-right">
            <div className="bg-white rounded-3xl p-8 md:p-12"
                 style={{ boxShadow: '0 8px 48px rgba(30,58,138,.10), 0 2px 12px rgba(30,58,138,.06)' }}>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-primary-900 mb-1">{t('contact.form.header')}</h3>
                <p className="text-slate-500 text-sm">{t('contact.form.subheader')}</p>
              </div>

              {/* Success state */}
              {status === 'success' && (
                <div className="mb-6 flex items-start gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <FiCheck className="text-emerald-600 text-lg" />
                  </div>
                  <div>
                    <p className="font-black text-emerald-800">{t('contact.form.success')}</p>
                    <p className="text-emerald-600 text-sm mt-0.5">{t('contact.form.success_detail')}</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {status === 'error' && (
                <div className="mb-6 flex items-start gap-4 bg-red-50 border border-red-200 rounded-2xl p-5">
                  <HiOutlineExclamationCircle className="text-red-500 text-2xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-red-800">{t('contact.form.error')}</p>
                    <p className="text-red-600 text-sm mt-0.5">{t('contact.form.error_detail')}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label={`${t('contact.form.name')} *`}
                    name="name"
                    placeholder={t('contact.form.placeholder_name')}
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <InputField
                    label={`${t('contact.form.email')} *`}
                    name="email"
                    type="email"
                    placeholder={t('contact.form.placeholder_email')}
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>
                <InputField
                  label={t('contact.form.phone')}
                  name="phone"
                  type="tel"
                  placeholder={t('contact.form.placeholder_phone')}
                  value={form.phone}
                  onChange={handleChange}
                />
                <InputField
                  label={`${t('contact.form.message')} *`}
                  name="message"
                  rows={5}
                  placeholder={t('contact.form.placeholder_message')}
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                <button type="submit" disabled={status === 'loading'}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black text-base
                               transition-all duration-300 ${
                    status === 'loading'
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-primary-900 hover:bg-primary-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                      </svg>
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <FiSend className="text-base" /> {t('contact.form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
