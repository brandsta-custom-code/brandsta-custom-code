<!-- app/pages/index.vue -->
<script setup lang="ts">
import BrandstaSvg from '~/components/BrandstaSvg.vue'
import ResonantFlowButton from '~/components/ResonantFlowButton.vue'
import SynthesisConduit from '~/components/SynthesisConduit.vue'
import { useBrandstaSeo } from '~/composables/useBrandstaSeo'
import { CUSTOM_CODE_LINKS } from '~/data/customCodeConfig'
import { ARCHITECTURAL_PILLARS } from '~/data/customCodeArchitecture'

useBrandstaSeo()

function scrollToSynthesis() {
  if (typeof window !== 'undefined' && window.__brandstaLenis) {
    window.__brandstaLenis.scrollTo('#synthesis', {
      duration: 1.1,
      force: true,
    })
    return
  }
  document.getElementById('synthesis')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="relative min-h-svh w-full bg-brand-void text-white selection:bg-brand-blue selection:text-white">
    <!-- PURE SCULPTED ELECTRIC ATMOSPHERE (Bottom Arc Removed) -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_72%_54%_at_50%_30%,rgba(0,72,255,0.22)_0%,rgba(2,6,18,0.78)_56%,rgba(0,0,0,1)_100%)]"
      />
    </div>

    <main class="relative z-10 w-full">
      <!-- =========================================================
           SECTION 1: FULL-ARMOR SOVEREIGN HERO STAGE (100svh CSS Grid)
           ========================================================= -->
      <section
        aria-labelledby="cc-hero-title"
        class="mx-auto grid min-h-svh w-full max-w-6xl grid-rows-[0.35fr_auto_0.65fr] sm:grid-rows-[0.42fr_auto_0.78fr] items-center px-5 pt-6 pb-6 sm:px-10 sm:py-8"
      >
        <div aria-hidden="true" />

        <!-- Center Full-Armor Stack -->
        <div class="flex flex-col items-center text-center">
          <!-- Larger Dimensional Brandsta Lockup with Sapphire Halo & Shining Wave/'A' -->
          <div class="sync-enter sync-enter--1 relative mb-7 sm:mb-9 flex items-center justify-center">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(18,93,253,0.28)_0%,rgba(0,72,255,0)_70%)] blur-xl"
            />
            <div class="relative w-48 2xs:w-52 sm:w-60 lg:w-64 text-white">
              <BrandstaSvg
                variant="lockup"
                :decorative="false"
                label="Brandsta"
                class="h-auto w-full drop-shadow-[0_10px_30px_rgba(0,72,255,0.45)]"
              />
            </div>
          </div>

          <!-- Armored CUSTOM CODE Eyebrow Capsule (Optical Top Padding Boosted) -->
          <div
            class="sync-enter sync-enter--2 mb-5 inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-brand-electric/45 bg-[#050d24]/90 px-4 pt-[10px] pb-2 sm:px-5 shadow-[0_6px_24px_-4px_rgba(0,72,255,0.42),inset_0_1px_0_rgba(168,218,255,0.18)]"
          >
            <span aria-hidden="true" class="-mt-[2px] h-2 w-2 shrink-0 rounded-full bg-brand-electric shadow-[0_0_10px_#1e6bff]" />
            <p class="whitespace-nowrap text-[0.7rem] sm:text-[0.76rem] font-bold uppercase leading-none tracking-[0.34em] text-white">
              CUSTOM <span class="ml-2 text-brand-sapphire">CODE</span>
            </p>
          </div>

          <!-- Sculpted Display Headline -->
          <h1
            id="cc-hero-title"
            class="sync-enter sync-enter--3 max-w-4xl text-[2.55rem] 2xs:text-[2.95rem] sm:text-[4.15rem] lg:text-[4.85rem] xl:text-[5.25rem] font-semibold leading-[1.16] sm:leading-[1.12] tracking-[-0.03em]"
          >
            <span class="hero-sculpted-white">Built around</span>{{ ' ' }}<span class="hero-deep-electric">you.</span>
          </h1>

          <!-- High-Contrast Editorial Lead -->
          <p
            class="sync-enter sync-enter--4 mt-5 max-w-[35rem] text-[0.98rem] sm:text-[1.12rem] font-normal leading-[1.62] text-white/85"
          >
            Purpose-built applications powered by enterprise cloud services—engineered around the way your business actually sells, operates, and grows.
          </p>

          <!-- Tactile Capability Pills (Optical Top Padding Boosted: pt-[9px] pb-1.5) -->
          <div
            aria-hidden="true"
            class="sync-enter sync-enter--5 mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          >
            <span class="inline-flex items-center rounded-full border border-white/14 bg-brand-surface/85 px-3.5 pt-[9px] pb-1.5 text-[0.62rem] sm:text-[0.66rem] font-bold uppercase leading-none tracking-[0.18em] text-white/88">
              CLOUD BACKUPS & ALERTS
            </span>
            <span class="inline-flex items-center rounded-full border border-brand-electric/35 bg-brand-blue/15 px-3.5 pt-[9px] pb-1.5 text-[0.62rem] sm:text-[0.66rem] font-bold uppercase leading-none tracking-[0.18em] text-white">
              COMMERCE & WORKFLOWS
            </span>
            <span class="inline-flex items-center rounded-full border border-white/14 bg-brand-surface/85 px-3.5 pt-[9px] pb-1.5 text-[0.62rem] sm:text-[0.66rem] font-bold uppercase leading-none tracking-[0.18em] text-white/88">
              ZERO BLOAT
            </span>
          </div>

          <!-- Device-Specific Dual Resonant Flow CTA Pair -->
          <div
            class="sync-enter sync-enter--6 mt-8 sm:mt-10 flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5"
          >
            <ResonantFlowButton
              :label="CUSTOM_CODE_LINKS.primaryCta.label"
              :href="CUSTOM_CODE_LINKS.primaryCta.href"
              :new-tab="CUSTOM_CODE_LINKS.primaryCta.newTab"
              variant="primary"
              size="lg"
              class="w-full max-w-[18.25rem] sm:w-auto"
            />

            <ResonantFlowButton
              :label="CUSTOM_CODE_LINKS.secondaryCta.label"
              :href="CUSTOM_CODE_LINKS.secondaryCta.href"
              :new-tab="CUSTOM_CODE_LINKS.secondaryCta.newTab"
              variant="secondary"
              size="lg"
              class="w-full max-w-[18.25rem] sm:w-auto"
            />
          </div>
        </div>

        <!-- Armored Explore Architecture Scroll Capsule -->
        <div class="flex flex-col items-center justify-end pt-7 sm:pt-9">
          <button
            type="button"
            class="explore-capsule group inline-flex h-11 items-center gap-3 rounded-full pl-4 pr-1.5 text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
            @click="scrollToSynthesis"
          >
            <span class="pt-1 cap-center whitespace-nowrap text-[0.66rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/90 group-hover:text-white">
              EXPLORE ARCHITECTURE
            </span>
            <span
              aria-hidden="true"
              class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brand-electric/75 bg-brand-blue/25 shadow-[0_0_14px_rgba(18,93,253,0.45)] transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-ice"
            >
              <svg viewBox="0 0 20 20" fill="none" class="scroll-chevron h-4 w-4 text-white">
                <path
                  d="M5.75 7.75L10 12L14.25 7.75"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>

      <!-- =========================================================
           SECTION 2: SYNTHESIS CONDUIT + 3-PILLAR PROMISE
           ========================================================= -->
      <section
        id="synthesis"
        aria-labelledby="synthesis-heading"
        class="mx-auto w-full max-w-7xl px-4 2xs:px-5 pt-10 pb-20 sm:px-8 lg:px-10"
      >
        <SynthesisConduit />

        <!-- 3-PILLAR ARCHITECTURAL STRIP (Optical Top Padding Boosted on Cards & Index Pills) -->
        <div
          class="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 rounded-3xl border-2 border-brand-electric/25 bg-brand-obsidian/92 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden shadow-[0_18px_50px_-16px_rgba(0,48,179,0.35)]"
        >
          <div
            v-for="pillar in ARCHITECTURAL_PILLARS"
            :key="pillar.index"
            class="flex flex-col justify-between px-6 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-8 transition-colors duration-300 hover:bg-brand-surface/80"
          >
            <div>
              <span class="inline-flex items-center rounded-full border border-brand-electric/40 bg-brand-blue/20 px-3 pt-[7px] pb-1 text-[0.62rem] font-bold uppercase leading-none tracking-[0.22em] text-white">
                {{ pillar.index }}
              </span>
              <h3 class="mt-4 text-[1.08rem] sm:text-[1.18rem] font-bold uppercase leading-[1.3] tracking-[0.12em] text-white">
                {{ pillar.title }}
              </h3>
              <p class="mt-2.5 text-[0.88rem] font-normal leading-[1.65] text-white/80">
                {{ pillar.body }}
              </p>
            </div>
          </div>
        </div>

        <!-- CLOSING SCALE STATEMENT -->
        <div class="mt-18 sm:mt-24 flex flex-col items-center text-center">
          <p class="text-[0.74rem] sm:text-[0.82rem] font-bold uppercase leading-[1.4] tracking-[0.28em] text-brand-sapphire">
            FROM ONE MODULE TO YOUR ENTIRE PLATFORM.
          </p>

          <h3 class="mt-3 max-w-2xl text-[1.65rem] sm:text-[2.25rem] font-semibold leading-[1.2] tracking-[-0.025em] text-white">
            Ready to build what generic software never could?
          </h3>

          <p class="mt-3 max-w-xl text-[0.94rem] sm:text-[1.02rem] font-normal leading-[1.65] text-white/80">
            Start with one high-impact custom application—or unify your commerce, media, and daily operations under one bespoke system.
          </p>

          <div class="mt-8 flex w-full sm:w-auto flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <ResonantFlowButton
              :label="CUSTOM_CODE_LINKS.primaryCta.label"
              :href="CUSTOM_CODE_LINKS.primaryCta.href"
              :new-tab="CUSTOM_CODE_LINKS.primaryCta.newTab"
              variant="primary"
              size="md"
              class="w-full max-w-[17rem] sm:w-auto"
            />

            <ResonantFlowButton
              :label="CUSTOM_CODE_LINKS.secondaryCta.label"
              :href="CUSTOM_CODE_LINKS.secondaryCta.href"
              :new-tab="CUSTOM_CODE_LINKS.secondaryCta.newTab"
              variant="secondary"
              size="md"
              class="w-full max-w-[17rem] sm:w-auto"
            />
          </div>
        </div>
      </section>
    </main>

    <!-- =========================================================
         SIGNATURE FOOTER WITH SHINING PART 3 BRANDSTA WAVE SVG
         ========================================================= -->
    <footer class="relative z-10 mx-auto w-full max-w-5xl px-5 pb-14 pt-4 sm:px-10">
      <div aria-hidden="true" class="flex items-center justify-center gap-4">
        <span class="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-brand-blue/60 to-brand-electric" />
        <BrandstaSvg
          variant="wave"
          class="h-8 sm:h-9 w-auto drop-shadow-[0_0_16px_rgba(18,93,253,0.75)]"
        />
        <span class="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-brand-blue/60 to-brand-electric" />
      </div>

      <div class="mt-6 flex flex-col items-center text-center gap-2.5">
        <p class="text-[0.72rem] sm:text-[0.78rem] font-bold uppercase leading-[1.4] tracking-[0.34em] text-white">
          WE <span class="text-brand-sapphire">AMPLIFY</span> DIGITAL IDENTITIES.
        </p>

        <p class="text-[0.66rem] font-medium uppercase leading-[1.4] tracking-[0.22em] text-white/75">
          brandsta.cc · Custom Code by Brandsta
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Sculpted Top-Lit Silver-White Display Text (Descender-Safe Padding Box) */
.hero-sculpted-white {
  display: inline-block;
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
  background-image: linear-gradient(180deg, #ffffff 0%, #f0f6ff 58%, #bdd5fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #ffffff;
}

/* Deep Electric Sapphire Accent on "you." */
.hero-deep-electric {
  display: inline-block;
  padding: 0.04em 0.05em 0.18em 0.02em;
  margin: -0.04em -0.05em -0.18em -0.02em;
  background-image: linear-gradient(180deg, #3b88ff 0%, #125dfd 50%, #0040e5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--color-brand-sapphire);
  filter: drop-shadow(0 6px 26px rgba(0, 72, 255, 0.52));
}

/* Armored Scroll Trigger Capsule */
.explore-capsule {
  background: linear-gradient(180deg, rgba(8, 18, 44, 0.9) 0%, rgba(2, 6, 18, 0.95) 100%);
  border: 1.75px solid rgba(30, 107, 255, 0.42);
  box-shadow:
    0 2px 2px -2px rgba(0, 72, 255, 0.45),
    inset 0 1px 0 rgba(168, 218, 255, 0.14);
  transition:
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 320ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.explore-capsule:hover {
  transform: scale(1.035);
  border-color: rgba(82, 168, 255, 0.85);
  box-shadow:
    0 5px 5px -4px rgba(18, 93, 253, 0.62),
    inset 0 0 7px rgba(30, 107, 255, 0.22);
}

.explore-capsule:active {
  transform: scale(0.98);
}

.scroll-chevron {
  animation: chevronPulse 1s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

@keyframes chevronPulse {
  0%, 100% {
    transform: translate3d(0, -1.5px, 0);
  }
  50% {
    transform: translate3d(0, 2px, 0);
  }
}

.sync-enter {
  animation: heroSyncGlide 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.sync-enter--1 {
  animation-delay: 0ms;
}
.sync-enter--2 {
  animation-delay: 40ms;
}
.sync-enter--3 {
  animation-delay: 80ms;
}
.sync-enter--4 {
  animation-delay: 120ms;
}
.sync-enter--5 {
  animation-delay: 160ms;
}
.sync-enter--6 {
  animation-delay: 200ms;
}

@keyframes heroSyncGlide {
  0% {
    transform: translate3d(0, 16px, 0) scale(0.985);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}
</style>