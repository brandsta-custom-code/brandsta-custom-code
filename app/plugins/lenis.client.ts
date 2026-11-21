// app/plugins/lenis.client.ts
import Lenis from 'lenis'
import { defineNuxtPlugin } from 'nuxt/app'

declare global {
  interface Window {
    __brandstaLenis?: Lenis
    __brandstaLenisRaf?: number
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

  // Clean up any prior instance during Vite HMR
  if (window.__brandstaLenisRaf) {
    cancelAnimationFrame(window.__brandstaLenisRaf)
  }
  if (window.__brandstaLenis) {
    window.__brandstaLenis.destroy()
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  window.__brandstaLenis = lenis
  lenis.scrollTo(0, { immediate: true, force: true })

  const raf = (time: number) => {
    lenis.raf(time)
    window.__brandstaLenisRaf = requestAnimationFrame(raf)
  }
  window.__brandstaLenisRaf = requestAnimationFrame(raf)

  nuxtApp.hook('app:mounted', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    lenis.scrollTo(0, { immediate: true, force: true })
  })

  window.addEventListener(
    'beforeunload',
    () => {
      window.scrollTo(0, 0)
    },
    { passive: true },
  )

  return {
    provide: {
      lenis,
    },
  }
})