// app/data/customCodeArchitecture.ts

export type UniversalServiceId =
  | 'cloud-vault'
  | 'alert-dispatch'
  | 'media-data-core'
  | 'cloud-edge'

export type CustomModuleId =
  | 'commerce-cart'
  | 'media-galleries'
  | 'proposals-quotes'
  | 'live-operations'

export interface UniversalServiceNode {
  id: UniversalServiceId
  name: string
  role: string
  capabilityTag: string
  detail: string
}

export interface CoreStageItem {
  step: string
  label: string
}

export interface CustomModuleSpec {
  id: CustomModuleId
  tabLabel: string
  codeTag: string
  windowTitle: string
  headline: string
  summary: string
  connectedServices: readonly UniversalServiceId[]
  actionLabel: string
  pipelineSteps: readonly [string, string, string]
}

export interface ArchitecturalPillar {
  index: string
  title: string
  body: string
}

export const UNIVERSAL_SERVICES: readonly UniversalServiceNode[] = [
  {
    id: 'cloud-vault',
    name: 'Automated Cloud Vault',
    role: 'Encrypted Backups & Version Archives',
    capabilityTag: 'CLOUD BACKUPS',
    detail: 'Orders, files, records, and system states snapshotted automatically into structured cloud archives.',
  },
  {
    id: 'alert-dispatch',
    name: 'Instant Alert Dispatch',
    role: 'Real-Time Client & Team Notifications',
    capabilityTag: 'LIVE ALERTS',
    detail: 'Automated receipts, approval triggers, status updates, and priority team escalations in milliseconds.',
  },
  {
    id: 'media-data-core',
    name: 'Content & Media Core',
    role: 'Catalogues, Galleries & File Pipelines',
    capabilityTag: 'ASSET ENGINE',
    detail: 'Upload files, manage product catalogues, and publish structured updates from one tailored workspace.',
  },
  {
    id: 'cloud-edge',
    name: 'Global Cloud Edge',
    role: 'Worldwide Sync & Instant Delivery',
    capabilityTag: 'GLOBAL CLOUD EDGE',
    detail: 'Instant state synchronization, automatic media optimization, and peak speed across every device.',
  },
] as const

export const CORE_LIFECYCLE_STAGES: readonly CoreStageItem[] = [
  { step: '01', label: 'UNDERSTAND' },
  { step: '02', label: 'DESIGN' },
  { step: '03', label: 'BUILD' },
  { step: '04', label: 'INTEGRATE' },
  { step: '05', label: 'EVOLVE' },
] as const

export const CUSTOM_APP_MODULES: readonly CustomModuleSpec[] = [
  {
    id: 'commerce-cart',
    tabLabel: 'Commerce & Cart',
    codeTag: 'COMMERCE · LIVE CART',
    windowTitle: 'Custom Storefront, Cart & Order Engine',
    headline: 'Tailored cart logic, live inventory sync, and automated fulfillment.',
    summary:
      'Engineered around your exact products and rules—from dynamic carts and custom bundles to instant order notifications and cloud-archived ledgers.',
    connectedServices: ['cloud-edge', 'alert-dispatch', 'cloud-vault'],
    actionLabel: 'Run Order & Cart Flow',
    pipelineSteps: [
      'Cart rules & inventory verified at edge',
      'Instant order alert dispatched to team',
      'Order ledger archived in Cloud Vault',
    ],
  },
  {
    id: 'media-galleries',
    tabLabel: 'Media & Galleries',
    codeTag: 'UPLOADS · AUTO-GALLERY',
    windowTitle: 'Visual Gallery & Batch File Upload Studio',
    headline: 'Upload files once—auto-optimize visuals and populate live galleries.',
    summary:
      'Drop product shoots, portfolios, documents, or brand assets into your custom studio to populate galleries, generate shareable visuals, and back up originals.',
    connectedServices: ['media-data-core', 'cloud-edge', 'cloud-vault'],
    actionLabel: 'Upload & Populate Gallery',
    pipelineSteps: [
      'Batch files & visuals processed cleanly',
      'Live gallery populated on Global Edge',
      'Master originals secured in Cloud Vault',
    ],
  },
  {
    id: 'proposals-quotes',
    tabLabel: 'Proposals & Quotes',
    codeTag: 'CUSTOM SCOPE · SYNC',
    windowTitle: 'Configurable Proposal & Client Sign-Off Studio',
    headline: 'Assemble custom project scopes, archive revisions, and track approvals.',
    summary:
      'Built for bespoke client engagements where every scope is tailored—compile structured deliverables, store versioned snapshots, and trigger instant sign-off alerts.',
    connectedServices: ['cloud-vault', 'alert-dispatch', 'media-data-core'],
    actionLabel: 'Compile & Dispatch Proposal',
    pipelineSteps: [
      'Custom deliverable matrix compiled',
      'Versioned snapshot stored in Cloud Vault',
      'Approval link dispatched to client & desk',
    ],
  },
  {
    id: 'live-operations',
    tabLabel: 'Live Operations',
    codeTag: 'REAL-TIME COMMAND',
    windowTitle: 'Operational Control & Escalation Board',
    headline: 'Control live availability, intake workflows, and team alerts.',
    summary:
      'Run daily operations from one unified command surface—toggle live capacity, route incoming requests, and maintain an automated cloud audit trail.',
    connectedServices: ['cloud-edge', 'alert-dispatch', 'cloud-vault'],
    actionLabel: 'Broadcast Live State',
    pipelineSteps: [
      'Live operational state synced globally',
      'Team escalation dispatch confirmed',
      'Timestamped audit entry backed up',
    ],
  },
] as const

export const ARCHITECTURAL_PILLARS: readonly ArchitecturalPillar[] = [
  {
    index: '01',
    title: 'YOUR PURPOSE.',
    body: 'Every screen, cart rule, upload flow, and control exists for a reason—zero bloated menus your team has to work around.',
  },
  {
    index: '02',
    title: 'YOUR WORKFLOW.',
    body: 'Shaped around how your business actually sells, curates, dispatches, and operates across every screen.',
  },
  {
    index: '03',
    title: 'YOUR SYSTEM.',
    body: 'Rock-solid universal cloud infrastructure underneath; 100% custom Brandsta speed, security, and craft on top.',
  },
] as const