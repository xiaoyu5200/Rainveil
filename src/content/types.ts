export interface SiteInfo {
  name: string
  version: string
  type: string
  ip: string
  tagline: string
  community: { label: string; value: string }[]
}

export interface RuleGroup {
  title: string
  items: string[]
}

export interface Faq {
  q: string
  a: string
}

export interface Plan {
  id: string
  name: string
  price: string
  per: string
  perks: string[]
}

export interface Announcement {
  date: string
  title: string
  body: string
}

/** 专属 MOD：当前对外发布的最新版本 */
export interface ModRelease {
  version: string
  mcVersion: string
  loader: string
  fileName: string
  fileSize: string
  releasedAt: string
  url: string
}

/** 专属 MOD：更新日志条目 */
export interface ModChangelogEntry {
  version: string
  date: string
  tag: 'feature' | 'fix' | 'balance' | 'breaking'
  highlights: string[]
}

/** 专属 MOD：页面全部内容 */
export interface ModInfo {
  name: string
  tagline: string
  description: string
  latest: ModRelease
  mirrors: { label: string; url: string; note?: string }[]
  requirements: { label: string; value: string }[]
  install: { title: string; detail: string }[]
  changelog: ModChangelogEntry[]
  faq: Faq[]
}
