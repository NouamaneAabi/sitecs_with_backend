import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to a container ref and adds
 * the 'visible' class to every .reveal / .reveal-left / .reveal-right / .reveal-scale
 * child element when it enters the viewport.
 *
 * Usage:
 *   const sectionRef = useReveal()
 *   <section ref={sectionRef}> ... <div className="reveal delay-200"> ... </div> </section>
 */
export default function useReveal(threshold = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = container.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
