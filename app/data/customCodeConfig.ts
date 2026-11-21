// app/data/customCodeConfig.ts

export const CUSTOM_CODE_LINKS = {
  primaryCta: {
    label: "Let's Make Waves",
    href: 'https://brandsta.in',
    newTab: true,
  },
  secondaryCta: {
    label: 'See Our Wave',
    href: 'https://koduvayur.in',
    newTab: true,
  },
} as const

/**
 * Centralized Visual, Scale, Border & Opacity Constants
 */
export const BUTTON_VISUAL_TUNING = {
  // Pure Scale-Up Targets on Group Hover (Flowing spring cushion on press/click)
  buttonHoverScale: 1.03,
  buttonPressDipScale: 0.982,
  leftWaveHoverScale: 1.34,
  rightArrowHoverScale: 1.30,

  // Clean Integer Structural Outline Thicknesses (Eliminates Fractional Top/Bottom Rounding)
  pillBorderWidthPx: 2,
  socketBorderWidthPx: 2,

  // Master Edge-Masked Bluish Energy Ceiling
  gaseousMasterOpacity: 0.92,

  // Uniform Pill Outer Borders (Tuned for 2px integer border width)
  primaryBorderRest: 0.30,
  primaryBorderHover: 0.60,
  secondaryBorderRest: 0.38,
  secondaryBorderHover: 0.70,

  // Left Resonator Circle Outline (2px Strong -> Translucent on Rightward Flow)
  leftCircleRest: 0.92,
  leftCircleHover: 0.28,

  // Left High-Amplitude Wave Signal
  leftWaveRest: 1.0,
  leftWaveHover: 0.84,

  // Right Arrow Circle Outline (2px Translucent -> Strong Opaque on Arrival)
  rightCircleRest: 0.38,
  rightCircleHover: 0.98,

  // Right Top-Right Arrow Icon
  rightArrowRest: 0.80,
  rightArrowHover: 1.0,

  // Pure Marine-Obsidian Contrast Veil on Primary Hover
  primaryHoverDimOpacity: 0.42,

  // Secondary Subtle Hover Contrast Tint
  secondaryHoverBgAlpha: 0.05,
} as const

export const RESONANT_BUTTON_PHYSICS = {
  /** Inertial spring for hover scale-up & liquid press cushion (Critically damped on return) */
  scaleSpringStiffness: 44.0,
  scaleSpringDamping: 9.0,

  /** Hover fluid tide inertia (Critically damped with zero-floor arrest on return) */
  tideSpringStiffness: 17.5,
  tideSpringDamping: 5.4,

  /** Traveling click wave speed (Left Resonator -> Bottom Stream -> Right Circle) */
  clickWaveTravelSpeed: 2.35,
  /** Spring driving the smooth right-socket & arrow swell when click wave arrives */
  clickArrivalStiffness: 34.0,
  clickArrivalDamping: 7.4,

  /** Outside-click partial sympathetic pulse (flows forward gently, settles back slowly) */
  outsideImpulseStep: 0.38,
  outsideImpulseMax: 0.64,
  outsideDecayRate: 1.85,
  outsideSpringStiffness: 9.2,
  outsideSpringDamping: 4.4,

  /** Rotational inertia rate when reversing wave & continuous stream direction */
  directionInertiaRate: 4.4,

  /** Bluish energy fade-in vs monotonic evaporation rate after returning to left circle */
  vaporFadeInRate: 10.0,
  vaporEvaporateRate: 4.8,

  /** Continuous stream & wave flow speed */
  vaporWaveSpeed: 4.2,

  /** Smooth beat so the traveling click crest blooms into the right arrow before new tab opens */
  clickNavigationHoldMs: 430,
} as const