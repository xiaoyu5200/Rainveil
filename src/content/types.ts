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
