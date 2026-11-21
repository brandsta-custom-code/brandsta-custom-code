<!-- app/components/SynthesisConduit.vue -->
<script setup lang="ts">
import { ref, computed, useId, onMounted, onBeforeUnmount, nextTick } from 'vue'
import BrandstaSvg from '~/components/BrandstaSvg.vue'
import {
  UNIVERSAL_SERVICES,
  CORE_LIFECYCLE_STAGES,
  CUSTOM_APP_MODULES,
  type UniversalServiceId,
  type CustomModuleId,
} from '~/data/customCodeArchitecture'

interface ConduitLine {
  id: UniversalServiceId
  d: string
}

const uid = useId()

const matrixEl = ref<HTMLElement | null>(null)
const coreEl = ref<HTMLElement | null>(null)
const studioEl = ref<HTMLElement | null>(null)
const serviceEls = ref<Record<string, HTMLElement | null>>({})
const tabBtnEls = ref<Record<string, HTMLButtonElement | null>>({})

function setServiceRef(id: UniversalServiceId, el: unknown) {
  serviceEls.value[id] = el instanceof HTMLElement ? el : null
}

function setTabBtnRef(id: CustomModuleId, el: unknown) {
  tabBtnEls.value[id] = el instanceof HTMLButtonElement ? el : null
}

// Interactive Architecture State
const activeModuleId = ref<CustomModuleId>('commerce-cart')
const hoveredServiceId = ref<UniversalServiceId | null>(null)
const pinnedServiceId = ref<UniversalServiceId | null>(null)
const activeStageIdx = ref(3)
const isCoreHovered = ref(false)
const corePulseActive = ref(false)
const studioArrivalHighlight = ref(false)

// Panel 1: Commerce & Cart Interactive Controls
const commerceRules = ref([
  { id: 'cart', label: 'Dynamic Cart, Bundles & Checkout Logic', badge: 'LIVE CART', enabled: true },
  { id: 'stock', label: 'Real-Time Multi-Channel Inventory Sync', badge: 'GLOBAL EDGE', enabled: true },
  { id: 'fulfill', label: 'Instant Order Alerts & Cloud Ledger Backup', badge: 'AUTO-DISPATCH', enabled: true },
])

// Panel 2: Media & Galleries Interactive Controls
const selectedGalleryIdx = ref(0)
const galleryPipelines = [
  { title: 'Product & Catalogue Showcase Grid', sub: 'Drag-and-drop batch upload · Instant visual optimization', tag: 'GALLERY SYNC' },
  { title: 'Client File & Document Vault Dropzone', sub: 'Structured cloud folders · Automated team notifications', tag: 'FILE UPLOAD' },
  { title: 'Branded Campaign & Shareable Visuals', sub: 'Upload once · Publish across web & QR endpoints', tag: 'VISUAL ENGINE' },
] as const

// Panel 3: Proposals & Quotes Interactive Controls
const proposalBlocks = ref([
  { id: 'matrix', label: 'Configurable Scope & Deliverable Matrix', badge: 'TAILORED SCOPE', enabled: true },
  { id: 'vault', label: 'Automated Cloud Revision & Snapshot Archive', badge: 'CLOUD VAULT', enabled: true },
  { id: 'signoff', label: 'One-Tap Client Approval & Desk Alert', badge: 'LIVE DISPATCH', enabled: true },
])

// Panel 4: Live Operations Interactive Controls
const opsSwitches = ref([
  { id: 'intake', label: 'Live Priority Request & Booking Intake', tag: 'GLOBAL EDGE', active: true },
  { id: 'escalate', label: 'Instant Team Escalation & Status Alerts', tag: 'LIVE ALERTS', active: true },
  { id: 'audit', label: 'Automated Cloud Audit & Daily Snapshots', tag: 'CLOUD BACKUPS', active: true },
])

// Live Telemetry Banner
const pipelineRunning = ref(false)
const pipelineStepIndex = ref(-1)
const liveStatusBanner = ref('ALL 4 CLOUD CONDUITS SYNCHRONIZED · READY')

// Parametric SVG Conduit Stage Geometry
const stageW = ref(1120)
const stageH = ref(560)
const serviceConduits = ref<ConduitLine[]>([
  { id: 'cloud-vault', d: 'M 280 95 C 370 95, 395 270, 475 270' },
  { id: 'alert-dispatch', d: 'M 280 210 C 365 210, 395 270, 475 270' },
  { id: 'media-data-core', d: 'M 280 330 C 365 330, 395 270, 475 270' },
  { id: 'cloud-edge', d: 'M 280 445 C 370 445, 395 270, 475 270' },
])
const coreToStudioPath = ref('M 595 270 C 635 270, 645 270, 685 270')

const streamFlowOffset = ref(0)
const surgeProgress = ref(0)
const surgeOpacity = ref(0)
const surgedServiceIds = ref<Set<UniversalServiceId>>(new Set())

const activeModule = computed(
  () => CUSTOM_APP_MODULES.find((m) => m.id === activeModuleId.value) ?? CUSTOM_APP_MODULES[0]!,
)

const activeCommerceCount = computed(
  () => commerceRules.value.filter((r) => r.enabled).length,
)

const activeProposalCount = computed(
  () => proposalBlocks.value.filter((b) => b.enabled).length,
)

function isServiceHighlighted(id: UniversalServiceId): boolean {
  if (surgedServiceIds.value.has(id)) return true
  if (hoveredServiceId.value) return hoveredServiceId.value === id
  if (pinnedServiceId.value) return pinnedServiceId.value === id
  return activeModule.value.connectedServices.includes(id)
}

function getServiceName(id: UniversalServiceId): string {
  return UNIVERSAL_SERVICES.find((s) => s.id === id)?.name ?? id
}

/**
 * Silky Lenis-Routed Reveal on Stacked Mobile & Tablet Viewports
 */
function revealStudioIfOffscreen() {
  const el = studioEl.value
  if (!el || typeof window === 'undefined') return

  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const isStackedViewport = window.innerWidth < 1024
  const isPartiallyHiddenBelow = rect.top > vh * 0.56 || rect.bottom > vh + 72

  if (isStackedViewport && isPartiallyHiddenBelow) {
    const targetTop = Math.max(0, window.scrollY + rect.top - 20)
    if (window.__brandstaLenis) {
      window.__brandstaLenis.scrollTo(targetTop, {
        duration: 0.9,
        force: true,
      })
    } else {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      })
    }
  }

  studioArrivalHighlight.value = true
  const t = setTimeout(() => {
    studioArrivalHighlight.value = false
  }, 820)
  activeTimers.push(t)
}

function measureConduitGeometry() {
  const stage = matrixEl.value
  const core = coreEl.value
  const studio = studioEl.value
  if (!stage || !core || !studio) return

  const sRect = stage.getBoundingClientRect()
  if (sRect.width < 10 || sRect.height < 10) return

  stageW.value = Math.round(sRect.width)
  stageH.value = Math.round(sRect.height)

  const cRect = core.getBoundingClientRect()
  const stRect = studio.getBoundingClientRect()
  const isDesktopHorizontal = window.innerWidth >= 1024

  const coreCx = cRect.left - sRect.left + cRect.width * 0.5
  const coreCy = cRect.top - sRect.top + cRect.height * 0.5

  const lines: ConduitLine[] = []

  for (const svc of UNIVERSAL_SERVICES) {
    const el = serviceEls.value[svc.id]
    if (!el) continue
    const r = el.getBoundingClientRect()

    if (isDesktopHorizontal) {
      const x1 = r.right - sRect.left - 2
      const y1 = r.top - sRect.top + r.height * 0.5
      const x2 = coreCx - cRect.width * 0.44
      const y2 = coreCy + (y1 - coreCy) * 0.14
      const span = Math.max(40, x2 - x1)
      const cp1x = x1 + span * 0.52
      const cp2x = x2 - span * 0.44
      lines.push({
        id: svc.id,
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${cp1x.toFixed(1)} ${y1.toFixed(1)}, ${cp2x.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      })
    } else {
      const x1 = r.left - sRect.left + r.width * 0.5
      const y1 = r.bottom - sRect.top - 2
      const x2 = coreCx + (x1 - coreCx) * 0.18
      const y2 = cRect.top - sRect.top + 6
      const vSpan = Math.max(28, y2 - y1)
      const cp1y = y1 + vSpan * 0.52
      const cp2y = y2 - vSpan * 0.46
      lines.push({
        id: svc.id,
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${x1.toFixed(1)} ${cp1y.toFixed(1)}, ${x2.toFixed(1)} ${cp2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
      })
    }
  }

  if (lines.length === UNIVERSAL_SERVICES.length) {
    serviceConduits.value = lines
  }

  if (isDesktopHorizontal) {
    const ox1 = coreCx + cRect.width * 0.44
    const oy1 = coreCy
    const ox2 = stRect.left - sRect.left + 4
    const oy2 = coreCy
    const oSpan = Math.max(24, ox2 - ox1)
    coreToStudioPath.value = `M ${ox1.toFixed(1)} ${oy1.toFixed(1)} C ${(ox1 + oSpan * 0.45).toFixed(1)} ${(oy1 - 10).toFixed(1)}, ${(ox2 - oSpan * 0.45).toFixed(1)} ${(oy2 + 10).toFixed(1)}, ${ox2.toFixed(1)} ${oy2.toFixed(1)}`
  } else {
    const ox1 = coreCx
    const oy1 = cRect.bottom - sRect.top - 4
    const ox2 = stRect.left - sRect.left + stRect.width * 0.5
    const oy2 = stRect.top - sRect.top + 4
    const oSpan = Math.max(24, oy2 - oy1)
    coreToStudioPath.value = `M ${ox1.toFixed(1)} ${oy1.toFixed(1)} C ${(ox1 - 8).toFixed(1)} ${(oy1 + oSpan * 0.45).toFixed(1)}, ${(ox2 + 8).toFixed(1)} ${(oy2 - oSpan * 0.45).toFixed(1)}, ${ox2.toFixed(1)} ${oy2.toFixed(1)}`
  }
}

let rafId: number | null = null
let lastTs = 0
let surgeScalar = 0
let stageCycleAcc = 0
let isInViewport = true
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
const activeTimers: ReturnType<typeof setTimeout>[] = []

function clearPendingTimers() {
  while (activeTimers.length > 0) {
    const t = activeTimers.pop()
    if (t) clearTimeout(t)
  }
}

function tickConduits(ts: number) {
  if (!isInViewport) {
    rafId = null
    lastTs = 0
    return
  }

  if (!lastTs) lastTs = ts
  const dt = Math.min(0.04, (ts - lastTs) / 1000)
  lastTs = ts

  const speed = 260 + (hoveredServiceId.value || isCoreHovered.value ? 150 : 0) + (surgeScalar > 0 ? 320 : 0)
  streamFlowOffset.value = (streamFlowOffset.value - dt * speed) % 1000

  stageCycleAcc += dt
  if (stageCycleAcc >= 2.6) {
    stageCycleAcc = 0
    activeStageIdx.value = (activeStageIdx.value + 1) % CORE_LIFECYCLE_STAGES.length
  }

  if (surgeScalar > 0) {
    surgeScalar += dt * 1.65
    if (surgeScalar >= 1.25) {
      surgeScalar = 0
      surgeOpacity.value = 0
      surgedServiceIds.value = new Set()
    } else {
      const clamped = Math.min(1, surgeScalar)
      surgeProgress.value = Number((1000 - clamped * 1240).toFixed(1))
      surgeOpacity.value = Number(Math.sin(clamped * Math.PI).toFixed(3))
    }
  }

  rafId = requestAnimationFrame(tickConduits)
}

function ensureConduitLoop() {
  if (rafId === null && isInViewport && typeof window !== 'undefined') {
    lastTs = 0
    rafId = requestAnimationFrame(tickConduits)
  }
}

function fireConduitSurge(ids: readonly UniversalServiceId[], bannerText?: string) {
  surgedServiceIds.value = new Set(ids)
  surgeScalar = 0.02
  corePulseActive.value = true
  if (bannerText) {
    liveStatusBanner.value = bannerText
  }
  const t = setTimeout(() => {
    corePulseActive.value = false
  }, 520)
  activeTimers.push(t)
  ensureConduitLoop()
}

function onSelectService(svcId: UniversalServiceId) {
  const svc = UNIVERSAL_SERVICES.find((s) => s.id === svcId)
  pinnedServiceId.value = pinnedServiceId.value === svcId ? null : svcId

  if (!activeModule.value.connectedServices.includes(svcId)) {
    const matchingMod = CUSTOM_APP_MODULES.find((m) => m.connectedServices.includes(svcId))
    if (matchingMod) {
      activeModuleId.value = matchingMod.id
      nextTick(() => measureConduitGeometry())
    }
  }

  fireConduitSurge(
    [svcId],
    `ROUTED · ${svc?.capabilityTag ?? 'CLOUD'} → ${activeModule.value.tabLabel.toUpperCase()}`,
  )

  const scrollDelay = typeof window !== 'undefined' && window.innerWidth < 1024 ? 160 : 0
  const t = setTimeout(() => {
    revealStudioIfOffscreen()
  }, scrollDelay)
  activeTimers.push(t)
}

function onTriggerCoreSync() {
  pinnedServiceId.value = null
  activeStageIdx.value = 3
  fireConduitSurge(
    UNIVERSAL_SERVICES.map((s) => s.id),
    `FULL SYSTEM SYNC · ALL 4 SERVICES → ${activeModule.value.tabLabel.toUpperCase()}`,
  )

  const scrollDelay = typeof window !== 'undefined' && window.innerWidth < 1024 ? 180 : 0
  const t = setTimeout(() => {
    revealStudioIfOffscreen()
  }, scrollDelay)
  activeTimers.push(t)
}

function onSelectModuleTab(modId: CustomModuleId) {
  pinnedServiceId.value = null
  pipelineRunning.value = false
  pipelineStepIndex.value = -1
  activeModuleId.value = modId
  const mod = CUSTOM_APP_MODULES.find((m) => m.id === modId)
  if (mod) {
    fireConduitSurge(mod.connectedServices, `ACTIVE MODULE · ${mod.codeTag}`)
  }
  nextTick(() => measureConduitGeometry())
}

function onTabKeydown(e: KeyboardEvent, idx: number) {
  const count = CUSTOM_APP_MODULES.length
  let nextIdx = -1
  if (e.key === 'ArrowRight') nextIdx = (idx + 1) % count
  else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + count) % count
  else if (e.key === 'Home') nextIdx = 0
  else if (e.key === 'End') nextIdx = count - 1

  if (nextIdx !== -1) {
    e.preventDefault()
    const targetMod = CUSTOM_APP_MODULES[nextIdx]
    if (targetMod) {
      onSelectModuleTab(targetMod.id)
      tabBtnEls.value[targetMod.id]?.focus()
    }
  }
}

function runBlueprintAction() {
  clearPendingTimers()
  const mod = activeModule.value
  pipelineRunning.value = true
  pipelineStepIndex.value = 0
  studioArrivalHighlight.value = true

  fireConduitSurge(mod.connectedServices, `STEP 1/3 · ${mod.pipelineSteps[0].toUpperCase()}`)

  const t1 = setTimeout(() => {
    pipelineStepIndex.value = 1
    fireConduitSurge(mod.connectedServices, `STEP 2/3 · ${mod.pipelineSteps[1].toUpperCase()}`)
  }, 480)

  const t2 = setTimeout(() => {
    pipelineStepIndex.value = 2
    fireConduitSurge(mod.connectedServices, `COMPLETE · ${mod.pipelineSteps[2].toUpperCase()}`)
  }, 960)

  const t3 = setTimeout(() => {
    pipelineRunning.value = false
    studioArrivalHighlight.value = false
  }, 2600)

  activeTimers.push(t1, t2, t3)
}

function toggleCommerceRule(idx: number) {
  const rule = commerceRules.value[idx]
  if (!rule) return
  rule.enabled = !rule.enabled
  const svc: UniversalServiceId =
    idx === 0 ? 'cloud-edge' : idx === 1 ? 'media-data-core' : 'alert-dispatch'
  fireConduitSurge(
    [svc],
    `COMMERCE RULE ${rule.enabled ? 'ACTIVE' : 'PAUSED'} · ${rule.badge}`,
  )
}

function selectGalleryPipeline(idx: number) {
  selectedGalleryIdx.value = idx
  const item = galleryPipelines[idx]
  if (item) {
    fireConduitSurge(['media-data-core', 'cloud-edge', 'cloud-vault'], `PIPELINE READY · ${item.tag}`)
  }
}

function toggleProposalBlock(idx: number) {
  const block = proposalBlocks.value[idx]
  if (!block) return
  block.enabled = !block.enabled
  const svc: UniversalServiceId =
    idx === 0 ? 'media-data-core' : idx === 1 ? 'cloud-vault' : 'alert-dispatch'
  fireConduitSurge(
    [svc],
    `PROPOSAL MODULE ${block.enabled ? 'INCLUDED' : 'OPTIONAL'} · ${block.badge}`,
  )
}

function toggleOpsSwitch(idx: number) {
  const sw = opsSwitches.value[idx]
  if (!sw) return
  sw.active = !sw.active
  const svc: UniversalServiceId =
    idx === 0 ? 'cloud-edge' : idx === 1 ? 'alert-dispatch' : 'cloud-vault'
  fireConduitSurge(
    [svc],
    `${sw.tag} ${sw.active ? 'ONLINE' : 'STANDBY'} · STATE SYNCED`,
  )
}

onMounted(() => {
  measureConduitGeometry()
  ensureConduitLoop()

  // Re-lock Bezier port coordinates once self-hosted WOFF2 Inter metrics settle
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => {
      measureConduitGeometry()
    })
  }

  if (typeof ResizeObserver !== 'undefined' && matrixEl.value) {
    resizeObserver = new ResizeObserver(() => {
      measureConduitGeometry()
    })
    resizeObserver.observe(matrixEl.value)
  }

  if (typeof IntersectionObserver !== 'undefined' && matrixEl.value) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true
        isInViewport = visible
        if (visible) {
          measureConduitGeometry()
          ensureConduitLoop()
        }
      },
      { threshold: 0.05 },
    )
    intersectionObserver.observe(matrixEl.value)
  }
})

onBeforeUnmount(() => {
  clearPendingTimers()
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
})
</script>

<template>
  <div class="w-full">
    <!-- SECTION HEADER (Optical Top Padding Boosted on Eyebrow Capsule) -->
    <div class="mx-auto max-w-3xl text-center">
      <div class="inline-flex items-center gap-2.5 rounded-full border border-brand-electric/35 bg-brand-surface/90 px-4 pt-[10px] pb-2 shadow-[0_0_24px_rgba(0,72,255,0.22)]">
        <span aria-hidden="true" class="-mt-[2px] h-2 w-2 shrink-0 rounded-full bg-brand-electric shadow-[0_0_8px_#1e6bff]" />
        <span class="text-[0.65rem] sm:text-[0.72rem] font-bold uppercase leading-[1.5] tracking-[0.24em] text-white/90">
          UNIVERSAL SERVICES · CUSTOM APPLICATIONS
        </span>
      </div>

      <h2
        id="synthesis-heading"
        class="mt-5 text-[2.05rem] 2xs:text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-semibold leading-[1.16] sm:leading-[1.12] tracking-[-0.03em] text-white"
      >
        <span class="sculpted-white-text">Your business.</span>{{ ' ' }}<span class="deep-electric-text">Your system.</span>
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-[0.96rem] sm:text-[1.06rem] font-normal leading-[1.65] text-white/82">
        We connect rock-solid cloud backups, live alert dispatch, and high-speed media pipelines into custom-built applications shaped around how you sell and operate.
      </p>
    </div>

    <!-- 3-ZONE INTERACTIVE SYNTHESIS MATRIX -->
    <div
      ref="matrixEl"
      class="relative mt-11 sm:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(16rem,0.9fr)_auto_minmax(22rem,1.35fr)] items-center gap-8 sm:gap-10 lg:gap-8 xl:gap-11"
    >
      <!-- PARAMETRIC CONTINUOUS CONDUIT LAYER -->
      <svg
        aria-hidden="true"
        focusable="false"
        :viewBox="`0 0 ${stageW} ${stageH}`"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient :id="`conduitCoreGrad-${uid}`" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stop-color="#0038d6" stop-opacity="0.65" />
            <stop offset="52%" stop-color="#125dfd" stop-opacity="0.96" />
            <stop offset="100%" stop-color="#369bff" stop-opacity="1" />
          </linearGradient>
        </defs>

        <g v-for="line in serviceConduits" :key="line.id">
          <path
            :d="line.d"
            fill="none"
            stroke="rgba(30, 107, 255, 0.18)"
            stroke-width="1.75"
            stroke-linecap="round"
          />

          <path
            :d="line.d"
            fill="none"
            :stroke="`url(#conduitCoreGrad-${uid})`"
            :stroke-width="isServiceHighlighted(line.id) ? 2.4 : 1.2"
            :opacity="isServiceHighlighted(line.id) ? 0.92 : 0.24"
            stroke-linecap="round"
            class="conduit-transition"
          />

          <path
            v-if="isServiceHighlighted(line.id)"
            :d="line.d"
            pathLength="1000"
            fill="none"
            stroke="#6bb8ff"
            stroke-width="2.8"
            stroke-linecap="round"
            stroke-dasharray="240 760"
            :stroke-dashoffset="streamFlowOffset"
            opacity="0.82"
          />

          <path
            v-if="surgeOpacity > 0 && surgedServiceIds.has(line.id)"
            :d="line.d"
            pathLength="1000"
            fill="none"
            stroke="#ffffff"
            stroke-width="3.6"
            stroke-linecap="round"
            stroke-dasharray="280 1000"
            :stroke-dashoffset="surgeProgress"
            :opacity="surgeOpacity"
          />
        </g>

        <g>
          <path
            :d="coreToStudioPath"
            fill="none"
            stroke="rgba(0, 72, 255, 0.34)"
            stroke-width="7"
            stroke-linecap="round"
          />
          <path
            :d="coreToStudioPath"
            fill="none"
            :stroke="`url(#conduitCoreGrad-${uid})`"
            stroke-width="2.8"
            stroke-linecap="round"
          />
          <path
            :d="coreToStudioPath"
            pathLength="1000"
            fill="none"
            stroke="#7cc4ff"
            stroke-width="3.2"
            stroke-linecap="round"
            stroke-dasharray="260 740"
            :stroke-dashoffset="streamFlowOffset * 1.15"
            opacity="0.92"
          />
          <path
            v-if="surgeOpacity > 0"
            :d="coreToStudioPath"
            pathLength="1000"
            fill="none"
            stroke="#ffffff"
            stroke-width="4.2"
            stroke-linecap="round"
            stroke-dasharray="300 1000"
            :stroke-dashoffset="surgeProgress"
            :opacity="surgeOpacity"
          />
        </g>
      </svg>

      <!-- =========================================================
           ZONE 1: UNIVERSAL CLOUD SERVICES (Optical Top Padding Boosted on Cards)
           ========================================================= -->
      <div class="relative z-10 flex flex-col gap-3">
        <div class="mb-0.5 flex items-center justify-between gap-2 px-1 pt-0.5">
          <span class="text-[0.68rem] font-bold uppercase leading-[1.3] tracking-[0.22em] text-brand-sapphire">
            01 · UNIVERSAL SERVICES
          </span>
          <span class="shrink-0 text-[0.63rem] font-medium uppercase leading-[1.3] tracking-[0.15em] text-white/75">
            <span class="lg:hidden">TAP TO ROUTE ↓</span>
            <span class="hidden lg:inline">CLICK TO ROUTE →</span>
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <button
            v-for="svc in UNIVERSAL_SERVICES"
            :key="svc.id"
            :ref="(el) => setServiceRef(svc.id, el)"
            type="button"
            :aria-pressed="pinnedServiceId === svc.id"
            class="service-node group relative flex w-full flex-col justify-between rounded-2xl px-4 pt-[19px] pb-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
            :class="isServiceHighlighted(svc.id) ? 'service-node--active' : 'service-node--dim'"
            @mouseenter="hoveredServiceId = svc.id"
            @mouseleave="hoveredServiceId = null"
            @click="onSelectService(svc.id)"
          >
            <div>
              <div class="flex items-start justify-between gap-2.5">
                <div class="flex items-start gap-3 min-w-0">
                  <span
                    aria-hidden="true"
                    class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 transition-transform duration-300 group-hover:scale-110"
                    :class="
                      isServiceHighlighted(svc.id)
                        ? 'border-brand-electric bg-brand-blue/30 text-white shadow-[0_0_14px_rgba(18,93,253,0.45)]'
                        : 'border-white/20 bg-white/[0.04] text-white/80'
                    "
                  >
                    <svg v-if="svc.id === 'cloud-vault'" viewBox="0 0 20 20" fill="none" class="h-4 w-4">
                      <path d="M5.5 15.25H14.75C16.4 15.25 17.5 14.05 17.5 12.5C17.5 11.05 16.5 9.9 15.05 9.75C14.65 6.95 12.4 5 9.75 5C7.15 5 5.05 6.8 4.55 9.35C3.35 9.75 2.5 10.9 2.5 12.25C2.5 13.95 3.85 15.25 5.5 15.25Z" stroke="currentColor" stroke-width="1.65" stroke-linejoin="round" />
                      <path d="M10 8.5V13M10 13L8.25 11.25M10 13L11.75 11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <svg v-else-if="svc.id === 'alert-dispatch'" viewBox="0 0 20 20" fill="none" class="h-4 w-4">
                      <path d="M11.2 2.75L4.5 11.1H9.6L8.8 17.25L15.5 8.9H10.4L11.2 2.75Z" stroke="currentColor" stroke-width="1.65" stroke-linejoin="round" />
                    </svg>

                    <svg v-else-if="svc.id === 'media-data-core'" viewBox="0 0 20 20" fill="none" class="h-4 w-4">
                      <rect x="2.75" y="3.25" width="14.5" height="13.5" rx="2.25" stroke="currentColor" stroke-width="1.65" />
                      <circle cx="7.1" cy="7.4" r="1.4" fill="currentColor" />
                      <path d="M3.25 14.25L7.6 10.4L10.8 13.1L13.4 10.9L16.75 14.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <svg v-else viewBox="0 0 20 20" fill="none" class="h-4 w-4">
                      <circle cx="10" cy="10" r="7.25" stroke="currentColor" stroke-width="1.65" />
                      <ellipse cx="10" cy="10" rx="3.4" ry="7.25" stroke="currentColor" stroke-width="1.4" />
                      <path d="M3 10H17" stroke="currentColor" stroke-width="1.4" />
                    </svg>
                  </span>

                  <div class="min-w-0 pt-[1px]">
                    <span class="line-clamp-2 text-[0.9rem] font-bold leading-[1.3] tracking-[-0.01em] text-white">
                      {{ svc.name }}
                    </span>
                    <span class="mt-0.5 line-clamp-2 text-[0.75rem] font-medium leading-[1.35] text-white/78">
                      {{ svc.role }}
                    </span>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  class="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300"
                  :class="
                    isServiceHighlighted(svc.id)
                      ? 'bg-brand-electric shadow-[0_0_12px_#1e6bff] scale-125'
                      : 'bg-white/25'
                  "
                />
              </div>

              <p class="mt-2.5 line-clamp-2 lg:line-clamp-none text-[0.76rem] leading-[1.52] text-white/76">
                {{ svc.detail }}
              </p>
            </div>

            <div class="mt-3 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
              <span class="text-[0.62rem] font-bold uppercase leading-none tracking-[0.16em] text-brand-sapphire">
                {{ svc.capabilityTag }}
              </span>
              <span class="shrink-0 text-[0.6rem] font-semibold uppercase leading-none tracking-[0.16em] text-white/78">
                {{ isServiceHighlighted(svc.id) ? 'ACTIVE' : 'READY' }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <!-- =========================================================
           ZONE 2: BRANDSTA CUSTOM CODE RESONATOR CORE (Optical Top Padding Boosted)
           ========================================================= -->
      <div class="relative z-10 flex flex-col items-center justify-center py-1 lg:py-0">
        <button
          ref="coreEl"
          type="button"
          class="core-chamber group relative flex w-full max-w-[16rem] lg:w-[14.75rem] flex-col items-center rounded-3xl px-5 pt-7 pb-6 text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
          :class="{ 'is-core-pulsing': corePulseActive }"
          @mouseenter="isCoreHovered = true"
          @mouseleave="isCoreHovered = false"
          @click="onTriggerCoreSync"
        >
          <div class="relative flex h-24 w-24 items-center justify-center">
            <span
              aria-hidden="true"
              class="core-orbit-outer pointer-events-none absolute inset-0 rounded-full border-2 border-brand-electric/65"
            />
            <span
              aria-hidden="true"
              class="pointer-events-none absolute inset-2.5 rounded-full border-2 border-brand-blue/60 bg-brand-blue/20"
            />
            <BrandstaSvg
              variant="mark"
              class="relative z-10 h-11 w-auto text-white transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <span class="mt-4 text-[0.66rem] font-bold uppercase leading-[1.2] tracking-[0.28em] text-brand-sapphire">
            BRANDSTA
          </span>
          <span class="mt-1.5 text-[0.9rem] font-bold uppercase leading-[1.2] tracking-[0.2em] text-white">
            CUSTOM CODE
          </span>

          <!-- 5 Lifecycle Pills (pt-[7px] pb-1) -->
          <div aria-hidden="true" class="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            <span
              v-for="(st, idx) in CORE_LIFECYCLE_STAGES"
              :key="st.step"
              class="inline-flex items-center rounded-full px-2.5 pt-[5px] pb-1 text-[0.58rem] font-bold leading-none tracking-[0.14em] transition-all duration-300"
              :class="
                idx === activeStageIdx
                  ? 'bg-brand-blue text-white shadow-[0_0_14px_rgba(0,72,255,0.75)] border border-white/25'
                  : 'bg-white/[0.05] text-white/75 border border-transparent'
              "
            >
              {{ st.label }}
            </span>
          </div>

          <!-- Sync All Conduits Pill (pt-[9px] pb-1.5) -->
          <span class="mt-4 inline-flex items-center rounded-full border border-brand-electric/40 bg-brand-blue/20 px-4 pt-[8px] pb-1.5 text-[0.6rem] font-bold uppercase leading-none tracking-[0.16em] text-white">
            <span class="lg:hidden">TAP TO SYNC & VIEW ↓</span>
            <span class="hidden lg:inline">SYNC ALL CONDUITS</span>
          </span>
        </button>
      </div>

      <!-- =========================================================
           ZONE 3: PURPOSE-BUILT CLIENT APPLICATION STUDIO
           ========================================================= -->
      <div
        ref="studioEl"
        class="studio-window relative z-10 flex flex-col rounded-3xl border-2 bg-brand-surface/95 overflow-hidden transition-all duration-500"
        :class="
          studioArrivalHighlight
            ? 'border-brand-electric shadow-[0_0_52px_rgba(18,93,253,0.55)]'
            : 'border-brand-electric/35'
        "
      >
        <!-- Top Window Chrome + Right Pill -->
        <div class="block md:flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 bg-brand-obsidian/95 px-4 py-4 sm:px-5">
          <div class="flex items-center gap-2 min-w-0 flex-1 mb-2 md:mb-auto">
            <div class="flex shrink-0 items-center gap-1.5">
              <span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-brand-electric shadow-[0_0_10px_#1e6bff]" />
              <span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-brand-blue/70" />
              <span aria-hidden="true" class="h-2.5 w-2.5 rounded-full bg-white/25" />
            </div>
            <span class="ml-1 pt-[2px] line-clamp-2 text-left text-[0.68rem] font-bold uppercase leading-[1.32] tracking-[0.16em] text-white/92">
              {{ activeModule.windowTitle }}
            </span>
          </div>

          <span class="inline-flex shrink-0 items-center rounded-full border border-brand-electric/45 bg-brand-blue/25 px-3.5 pt-[8px] pb-1.75 text-[0.6rem] font-bold uppercase leading-none tracking-[0.15em] text-white whitespace-nowrap">
            {{ activeModule.codeTag }}
          </span>
        </div>

        <!-- Blueprint Tabs (Optical Top Padding Boosted: pt-[11px] pb-2) -->
        <div
          role="tablist"
          aria-label="Custom application blueprints"
          class="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-white/10 bg-brand-obsidian/70 p-2.5"
        >
          <button
            v-for="(mod, idx) in CUSTOM_APP_MODULES"
            :id="`tab-${mod.id}`"
            :key="mod.id"
            :ref="(el) => setTabBtnRef(mod.id, el)"
            role="tab"
            type="button"
            :aria-selected="activeModuleId === mod.id"
            :aria-controls="`panel-${mod.id}`"
            :tabindex="activeModuleId === mod.id ? 0 : -1"
            class="studio-tab-btn flex min-h-[2.75rem] items-center justify-center rounded-xl px-3 py-2 text-center transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
            :class="
              activeModuleId === mod.id
                ? 'studio-tab-btn--active text-white'
                : 'bg-white/[0.03] border border-white/8 text-white/80 hover:bg-white/[0.07] hover:text-white'
            "
            @click="onSelectModuleTab(mod.id)"
            @keydown="onTabKeydown($event, idx)"
          >
            <span class="line-clamp-2 text-[0.71rem] sm:text-[0.73rem] font-bold leading-[1.25] tracking-[0.02em]">
              {{ mod.tabLabel }}
            </span>
          </button>
        </div>

        <!-- TOP-MOUNTED LIVE TELEMETRY BAR (pt-3 pb-2.5 + Step Pill pt-[6px] pb-1) -->
        <div
          role="status"
          aria-live="polite"
          class="flex items-center justify-between gap-2.5 border-b border-white/10 bg-[#040c22] px-4 pt-3 pb-2.5 sm:px-5"
        >
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <span
              aria-hidden="true"
              class="-mt-[1px] h-2 w-2 shrink-0 rounded-full bg-brand-electric shadow-[0_0_8px_#1e6bff]"
              :class="{ 'animate-ping': pipelineRunning || studioArrivalHighlight }"
            />
            <span class="line-clamp-2 text-left text-[0.65rem] sm:text-[0.68rem] font-bold uppercase leading-[1.32] tracking-[0.14em] text-white/92">
              {{ liveStatusBanner }}
            </span>
          </div>

          <span
            v-if="pipelineStepIndex >= 0"
            class="inline-flex shrink-0 items-center rounded-full bg-brand-blue px-2.5 py-1 text-[0.6rem] font-bold uppercase leading-none tracking-[0.14em] text-white whitespace-nowrap"
          >
            {{ pipelineStepIndex + 1 }} / 3
          </span>
        </div>

        <!-- Tab Panels (Optical Top Padding Boosted Across All Rows, Counter Cards & Tags) -->
        <div class="flex min-h-[23.5rem] sm:min-h-[22rem] flex-col justify-between px-4 pt-5 pb-4 sm:px-6 sm:pt-7 sm:pb-6">
          <!-- PANEL 1: COMMERCE & CART -->
          <div
            v-show="activeModuleId === 'commerce-cart'"
            id="panel-commerce-cart"
            role="tabpanel"
            aria-labelledby="tab-commerce-cart"
            class="flex flex-col gap-4"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="max-w-lg">
                <h3 class="text-[1.06rem] sm:text-[1.16rem] font-bold leading-[1.3] tracking-[-0.015em] text-white">
                  {{ activeModule.headline }}
                </h3>
                <p class="mt-1.5 text-[0.82rem] leading-[1.58] text-white/78">
                  {{ activeModule.summary }}
                </p>
              </div>
              <div class="rounded-xl border border-brand-electric/40 bg-brand-obsidian px-3.5 pt-[12px] pb-2.5 text-left sm:text-right">
                <span class="block text-[0.58rem] font-bold uppercase leading-none tracking-[0.18em] text-brand-sapphire">
                  ACTIVE ENGINE
                </span>
                <span class="mt-1.5 block text-[0.86rem] font-bold leading-[1.2] text-white">
                  {{ activeCommerceCount }} / 3 Live Flows
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-2.5">
              <button
                v-for="(rule, idx) in commerceRules"
                :key="rule.id"
                type="button"
                :aria-pressed="rule.enabled"
                class="flex min-h-[3.35rem] items-center justify-between gap-3 rounded-xl border px-3.5 pt-[12px] pb-2.5 text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                :class="
                  rule.enabled
                    ? 'border-brand-electric/65 bg-brand-blue/18 text-white'
                    : 'border-white/12 bg-brand-obsidian/70 text-white/75 hover:border-white/25'
                "
                @click="toggleCommerceRule(idx)"
              >
                <span class="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    aria-hidden="true"
                    class="-mt-[1px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[0.68rem] font-bold leading-none"
                    :class="rule.enabled ? 'border-brand-electric bg-brand-blue text-white' : 'border-white/30'"
                  >
                    {{ rule.enabled ? '✓' : '' }}
                  </span>
                  <span class="py-0.5 line-clamp-2 text-[0.82rem] font-semibold leading-[1.36]">
                    {{ rule.label }}
                  </span>
                </span>
                <span class="inline-flex shrink-0 items-center rounded-full border border-brand-electric/35 bg-brand-obsidian/90 px-3 pt-2 pb-1.75 text-[0.6rem] font-bold uppercase leading-none tracking-[0.13em] text-white/90 whitespace-nowrap">
                  {{ rule.badge }}
                </span>
              </button>
            </div>
          </div>

          <!-- PANEL 2: MEDIA & GALLERIES -->
          <div
            v-show="activeModuleId === 'media-galleries'"
            id="panel-media-galleries"
            role="tabpanel"
            aria-labelledby="tab-media-galleries"
            class="flex flex-col gap-4"
          >
            <div>
              <h3 class="text-[1.06rem] sm:text-[1.16rem] font-bold leading-[1.3] tracking-[-0.015em] text-white">
                {{ activeModule.headline }}
              </h3>
              <p class="mt-1.5 text-[0.82rem] leading-[1.58] text-white/78">
                {{ activeModule.summary }}
              </p>
            </div>

            <div class="flex flex-col gap-2.5">
              <button
                v-for="(item, idx) in galleryPipelines"
                :key="item.title"
                type="button"
                :aria-pressed="selectedGalleryIdx === idx"
                class="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 rounded-xl border px-3.5 pt-[13px] pb-3 text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                :class="
                  selectedGalleryIdx === idx
                    ? 'border-brand-electric/65 bg-brand-blue/18 text-white'
                    : 'border-white/12 bg-brand-obsidian/70 text-white/78 hover:border-white/25'
                "
                @click="selectGalleryPipeline(idx)"
              >
                <div class="min-w-0 flex-1">
                  <span class="line-clamp-2 text-[0.84rem] font-bold leading-[1.35] text-white">{{ item.title }}</span>
                  <span class="mt-0.5 line-clamp-2 text-[0.73rem] leading-[1.4] text-white/75">{{ item.sub }}</span>
                </div>
                <span class="inline-flex shrink-0 items-center rounded-full border border-brand-electric/40 bg-brand-obsidian px-3 pt-2 pb-1.75 text-[0.6rem] font-bold uppercase leading-none tracking-[0.14em] text-white whitespace-nowrap">
                  {{ item.tag }}
                </span>
              </button>
            </div>
          </div>

          <!-- PANEL 3: PROPOSALS & QUOTES -->
          <div
            v-show="activeModuleId === 'proposals-quotes'"
            id="panel-proposals-quotes"
            role="tabpanel"
            aria-labelledby="tab-proposals-quotes"
            class="flex flex-col gap-4"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="max-w-lg">
                <h3 class="text-[1.06rem] sm:text-[1.16rem] font-bold leading-[1.3] tracking-[-0.015em] text-white">
                  {{ activeModule.headline }}
                </h3>
                <p class="mt-1.5 text-[0.82rem] leading-[1.58] text-white/78">
                  {{ activeModule.summary }}
                </p>
              </div>
              <div class="rounded-xl border border-brand-electric/40 bg-brand-obsidian px-3.5 pt-[12px] pb-2.5 text-left sm:text-right">
                <span class="block text-[0.58rem] font-bold uppercase leading-none tracking-[0.18em] text-brand-sapphire">
                  BESPOKE SCOPE
                </span>
                <span class="mt-1.5 block text-[0.86rem] font-bold leading-[1.2] text-white">
                  {{ activeProposalCount }} Modules Selected
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-2.5">
              <button
                v-for="(block, idx) in proposalBlocks"
                :key="block.id"
                type="button"
                :aria-pressed="block.enabled"
                class="flex min-h-[3.35rem] items-center justify-between gap-3 rounded-xl border px-3.5 pt-[12px] pb-2.5 text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                :class="
                  block.enabled
                    ? 'border-brand-electric/65 bg-brand-blue/18 text-white'
                    : 'border-white/12 bg-brand-obsidian/70 text-white/75 hover:border-white/25'
                "
                @click="toggleProposalBlock(idx)"
              >
                <span class="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    aria-hidden="true"
                    class="-mt-[1px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[0.68rem] font-bold leading-none"
                    :class="block.enabled ? 'border-brand-electric bg-brand-blue text-white' : 'border-white/30'"
                  >
                    {{ block.enabled ? '✓' : '' }}
                  </span>
                  <span class="py-0.5 line-clamp-2 text-[0.82rem] font-semibold leading-[1.36]">
                    {{ block.label }}
                  </span>
                </span>
                <span class="inline-flex shrink-0 items-center rounded-full border border-brand-electric/35 bg-brand-obsidian/90 px-3 pt-2 pb-1.75 text-[0.6rem] font-bold uppercase leading-none tracking-[0.13em] text-white/90 whitespace-nowrap">
                  {{ block.badge }}
                </span>
              </button>
            </div>
          </div>

          <!-- PANEL 4: LIVE OPERATIONS -->
          <div
            v-show="activeModuleId === 'live-operations'"
            id="panel-live-operations"
            role="tabpanel"
            aria-labelledby="tab-live-operations"
            class="flex flex-col gap-4"
          >
            <div>
              <h3 class="text-[1.06rem] sm:text-[1.16rem] font-bold leading-[1.3] tracking-[-0.015em] text-white">
                {{ activeModule.headline }}
              </h3>
              <p class="mt-1.5 text-[0.82rem] leading-[1.58] text-white/78">
                {{ activeModule.summary }}
              </p>
            </div>

            <div class="flex flex-col gap-2.5">
              <button
                v-for="(sw, idx) in opsSwitches"
                :key="sw.id"
                type="button"
                :aria-pressed="sw.active"
                class="flex min-h-[3.35rem] items-center justify-between gap-3 rounded-xl border px-3.5 pt-[12px] pb-2.5 text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                :class="
                  sw.active
                    ? 'border-brand-electric/65 bg-brand-blue/18 text-white'
                    : 'border-white/12 bg-brand-obsidian/70 text-white/75'
                "
                @click="toggleOpsSwitch(idx)"
              >
                <span class="py-0.5 line-clamp-2 min-w-0 flex-1 text-[0.82rem] font-semibold leading-[1.36]">
                  {{ sw.label }}
                </span>
                <span class="inline-flex shrink-0 items-center gap-2.5">
                  <span class="hidden xs:inline-flex pt-1 py-0.5 text-[0.6rem] font-bold uppercase leading-none tracking-[0.14em] text-brand-sapphire whitespace-nowrap">
                    {{ sw.tag }}
                  </span>
                  <span
                    aria-hidden="true"
                    class="inline-flex h-5 w-9 items-center rounded-full p-0.5 transition-colors"
                    :class="sw.active ? 'bg-brand-blue justify-end' : 'bg-white/20 justify-start'"
                  >
                    <span class="h-4 w-4 rounded-full bg-white shadow" />
                  </span>
                </span>
              </button>
            </div>
          </div>

          <!-- SHARED STUDIO ACTION BAR (Service Pills pt-[9px] pb-1.5 + Centered Action CTA) -->
          <div class="mt-5 flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 border-t border-white/10 pt-4">
            <div class="flex flex-wrap items-center gap-2">
              <span
                v-for="svcId in activeModule.connectedServices"
                :key="svcId"
                class="inline-flex items-center rounded-full border border-brand-electric/35 bg-brand-obsidian px-3.5 pt-2.5 pb-2 text-[0.6rem] font-bold uppercase leading-[1.2] tracking-[0.14em] text-white/90 sm:whitespace-nowrap"
              >
                {{ getServiceName(svcId) }}
              </span>
            </div>

            <button
              type="button"
              class="studio-action-btn group inline-flex h-11 w-full sm:w-auto sm:self-start xl:self-auto shrink-0 items-center justify-between sm:justify-center gap-3 rounded-full pl-4 pr-2 text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-ice"
              @click="runBlueprintAction"
            >
              <span class="whitespace-nowrap pt-1 pb-0.5 text-[0.7rem] font-bold uppercase leading-none tracking-[0.13em]">
                {{ activeModule.actionLabel }}
              </span>
              <span
                aria-hidden="true"
                class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white/75 bg-white/10 transition-transform duration-300 group-hover:scale-110"
              >
                <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5">
                  <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Descender-Safe Padding Box for Sculpted White & Electric Blue Display Text */
.sculpted-white-text {
  display: inline-block;
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
  background-image: linear-gradient(180deg, #ffffff 0%, #edf4ff 62%, #b5cff8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #ffffff;
}

.deep-electric-text {
  display: inline-block;
  padding: 0.04em 0.05em 0.18em 0.02em;
  margin: -0.04em -0.05em -0.18em -0.02em;
  background-image: linear-gradient(180deg, #3b88ff 0%, #125dfd 52%, #0040e5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: var(--color-brand-sapphire);
  filter: drop-shadow(0 4px 24px rgba(0, 72, 255, 0.44));
}

.conduit-transition {
  transition:
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
    stroke-width 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.service-node {
  background: linear-gradient(180deg, rgba(7, 15, 36, 0.92) 0%, rgba(2, 6, 16, 0.96) 100%);
  transition:
    transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 340ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 340ms cubic-bezier(0.22, 1, 0.36, 1);
}

.service-node:hover {
  transform: translate3d(0, -2px, 0);
}

.service-node--active {
  border: 2px solid rgba(30, 107, 255, 0.68);
  box-shadow:
    0 10px 30px -8px rgba(0, 72, 255, 0.45),
    inset 0 0 18px rgba(18, 93, 253, 0.16);
}

.service-node--dim {
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.core-chamber {
  background:
    radial-gradient(circle at 50% 34%, rgba(18, 93, 253, 0.34) 0%, rgba(5, 11, 26, 0.96) 72%);
  border: 2px solid rgba(30, 107, 255, 0.62);
  box-shadow:
    0 12px 44px -6px rgba(0, 72, 255, 0.46),
    inset 0 0 24px rgba(18, 93, 253, 0.22);
  transition:
    transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 400ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1);
}

.core-chamber:hover,
.core-chamber.is-core-pulsing {
  transform: scale(1.035);
  border-color: #4da2ff;
  box-shadow:
    0 14px 56px -4px rgba(18, 93, 253, 0.65),
    inset 0 0 28px rgba(30, 107, 255, 0.32);
}

.core-orbit-outer {
  animation: orbitBreathe 6s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
}

@keyframes orbitBreathe {
  0% {
    transform: scale(0.96);
    opacity: 0.65;
  }
  100% {
    transform: scale(1.05);
    opacity: 1;
  }
}

.studio-window {
  box-shadow:
    0 24px 64px -16px rgba(0, 48, 179, 0.48),
    0 0 28px rgba(0, 72, 255, 0.22);
}

.studio-tab-btn--active {
  background-image: linear-gradient(180deg, #125dfd 0%, var(--color-brand-blue) 52%, #002382 100%);
  border: 1.5px solid rgba(168, 218, 255, 0.42);
  box-shadow: 0 6px 20px -4px rgba(0, 72, 255, 0.58);
}

.studio-action-btn {
  background-image:
    radial-gradient(ellipse 74% 66% at 50% -12%, rgba(116, 184, 255, 0.4) 0%, rgba(30, 107, 255, 0) 68%),
    linear-gradient(180deg, #125dfd 0%, var(--color-brand-blue) 50%, #002382 100%);
  background-origin: border-box;
  border: 2px solid rgba(168, 218, 255, 0.36);
  box-shadow:
    0 8px 24px -4px rgba(0, 72, 255, 0.55),
    inset 0 0 10px rgba(0, 14, 56, 0.34);
  transition:
    transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 340ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 340ms cubic-bezier(0.22, 1, 0.36, 1);
}

.studio-action-btn:hover {
  transform: scale(1.025);
  border-color: rgba(168, 218, 255, 0.7);
  box-shadow: 0 10px 30px -4px rgba(18, 93, 253, 0.68);
}

.studio-action-btn:active {
  transform: scale(0.98);
}
</style>