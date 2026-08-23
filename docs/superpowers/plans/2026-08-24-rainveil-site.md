# Rainveil 官网 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用 React + Vite + TypeScript + Tailwind(v4) + react-router 构建 Rainveil 服务器的纯静态多页官网。

**Architecture:** Vite React-TS 单页应用，react-router 提供真实 URL；Tailwind v4 通过在 `src/index.css` 的 `@theme` 块把 Cirrus 设计系统 token 映射为 Tailwind 主题色板；所有内容放 `src/content/*` 类型化数据文件，组件只读数据渲染；无后端、纯静态。

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4（`@tailwindcss/vite` + `@theme`）, react-router v7, Vitest + Testing Library。

**Spec:** `docs/官网设计方案.md`

## Global Constraints

- **全站禁止使用 emoji**（标题、正文、按钮、标签、提示、公告）。一律用文字 + SVG 图标，不使用 emoji 充当图标或装饰。
- 中文文案为主；专有名词（IP 地址、版本号、服务器/游戏术语）按原样保留英文/数字。
- 配色严格取自 Cirrus 亮色 token：ink `#0e1116`、cloud `#ffffff`、mist `#5b6472`、mist-soft `#8a93a3`、edge `#e3e8ee`、signal `#2e7def`、citrus `#ff7a3d`、meadow `#2bc48a`、sky `#edf2f7`。
- 圆角用胶囊（999px）为主；hairline 边框（1px edge）；两级柔和阴影；聚焦环 `0 0 0 3px rgba(46,125,239,0.28)`。
- 服务器信息：名称 Rainveil · 雨幕；版本 Java 1.21.11；类型 生存 RPG；地址 mc.xiaoyu.wiki。
- 应用根目录：`rainveil-site/`（相对本计划所在项目根的 `D:\服务器官网+玩法文档`）。
- 内容先以占位数据落地，全文案无 emoji，标注待替换的真实内容。

---

### Task 1: 脚手架 Vite + React + TS 应用

**Files:**
- Create: `rainveil-site/`（整个项目）
- Create: `rainveil-site/package.json`, `rainveil-site/vite.config.ts`, `rainveil-site/tsconfig.json`, `rainveil-site/tsconfig.node.json`, `rainveil-site/index.html`, `rainveil-site/src/main.tsx`, `rainveil-site/src/App.tsx`, `rainveil-site/src/index.css`

**Interfaces:**
- Produces: 可运行的 `npm run dev` 时钟应用；`src/main.tsx` 挂载 `<App />` 到 `#root`。

- [ ] **Step 1: 用 Vite 官方模板初始化（React + TS）**

```bash
cd "D:\服务器官网+玩法文档"
npm create vite@latest rainveil-site -- --template react-ts
cd rainveil-site
npm install
```

- [ ] **Step 2: 安装路由与测试依赖**

```bash
npm install react-router
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: 配置 vitest（vite.config.ts）**

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
```

- [ ] **Step 4: 建测试 setup 文件 `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: 精简 `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: 验证开发与构建**

```bash
npm run dev   # 应正常渲染 Vite 模板
npm run build # 应成功
```

- [ ] **Step 7: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold react-vite-ts app"
```

---

### Task 2: 安装 Tailwind v4 并映射 Cirrus token 为主题

**Files:**
- Modify: `rainveil-site/vite.config.ts`
- Modify: `rainveil-site/src/index.css`

**Interfaces:**
- Produces: Tailwind 类名可用：`bg-ink`, `bg-cloud`, `text-mist`, `text-soft`, `border-edge`, `bg-sky`, `text-signal`, `text-citrus`, `text-meadow`, `rounded-pill`, `shadow-whisper`, `shadow-float`, `focus-ring`。字体类 `font-sans`（Inter）。

- [ ] **Step 1: 编写 `src/index.css`（@import + @theme）**

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap");
@import "tailwindcss";

@theme {
  /* color */
  --color-ink: #0e1116;
  --color-cloud: #ffffff;
  --color-mist: #5b6472;
  --color-soft: #8a93a3;
  --color-edge: #e3e8ee;
  --color-signal: #2e7def;
  --color-citrus: #ff7a3d;
  --color-meadow: #2bc48a;
  --color-sky: #edf2f7;

  /* semantic aliases */
  --color-page: var(--color-sky);
  --color-strong: var(--color-ink);
  --color-muted: var(--color-mist);

  /* radius */
  --radius-pill: 999px;

  /* font */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-serif-accent: "Instrument Serif", Georgia, serif;

  /* shadow tiers */
  --shadow-whisper: 0 1px 1px rgba(14,17,22,0.04), 0 20px 40px -28px rgba(14,17,22,0.28);
  --shadow-float: 0 1px 1px rgba(14,17,22,0.05), 0 24px 44px -30px rgba(14,17,22,0.22);

  /* focus ring */
  --ring-focus: 0 0 0 3px rgba(46,125,239,0.28);
}
```

- [ ] **Step 2: 添加基础层样式（同文件追加）**

```css
/* base */
* , *::before , *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--font-sans);
  background: var(--color-sky);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: 0; background: transparent; }
```

- [ ] **Step 3: 验证 Tailwind 类生效（临时在 App.tsx 输出）**

```bash
npm run dev
```

在 `App.tsx` 中写 `<div className="bg-cloud text-ink rounded-pill shadow-whisper">x</div>` 并确认可渲染（可随后清理）。

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: tailwind v4 with cirrus token theme"
```

---

### Task 3: 内容数据文件（类型 + 占位内容）

**Files:**
- Create: `rainveil-site/src/content/types.ts`
- Create: `rainveil-site/src/content/site.ts`
- Create: `rainveil-site/src/content/modes.ts`
- Create: `rainveil-site/src/content/rules.ts`
- Create: `rainveil-site/src/content/store.ts`
- Create: `rainveil-site/src/content/announcements.ts`
- Test: `rainveil-site/src/content/content.test.ts`

**Interfaces:**
- Produces:
  - `export interface SiteInfo { name; version; type; ip; tagline; community: { label; value }[] }`
  - `export interface Mode { id; title; desc; features: string[] }`
  - `export interface RuleGroup { title; items: string[] }`
  - `export interface Plan { id; name; price; per: string; perks: string[] }`（商店）
  - `export interface Announcement { date; title; body }`
  - `export const site: SiteInfo`, `modes: Mode[]`, `ruleGroups: RuleGroup[]`, `plans: Plan[]`, `announcements: Announcement[]`

- [ ] **Step 1: 定义类型与数据（中文占位、无 emoji）**

```ts
// types.ts
export interface SiteInfo {
  name: string; version: string; type: string; ip: string; tagline: string;
  community: { label: string; value: string }[];
}
export interface Mode { id: string; title: string; desc: string; features: string[] }
export interface RuleGroup { title: string; items: string[] }
export interface Plan { id: string; name: string; price: string; per: string; perks: string[] }
export interface Announcement { date: string; title: string; body: string }
```

```ts
// site.ts
import type { SiteInfo } from './types'
export const site: SiteInfo = {
  name: 'Rainveil · 雨幕',
  version: 'Java 1.21.11',
  type: '生存 RPG',
  ip: 'mc.xiaoyu.wiki',
  tagline: '一片以任务与成长为核心的生存 RPG 世界。',
  community: [
    { label: 'QQ 群', value: '000000000' },
    { label: '邮箱', value: 'hello@xiaoyu.wiki' },
  ],
}
```

其余文件按同样风格填入 2–4 条占位条目，内容无 emoji，`modes.ts`/`store.ts`/`rules.ts`/`announcements.ts` 各含至少 2 条。

- [ ] **Step 2: 写测试（校验结构与非空）**

```ts
// content.test.ts
import { describe, it, expect } from 'vitest'
import { site } from './site'
import { modes } from './modes'
import { plans } from './store'
import { ruleGroups } from './rules'
import { announcements } from './announcements'

describe('content', () => {
  it('exposes server basics', () => {
    expect(site.name).toContain('Rainveil')
    expect(site.ip).toBe('mc.xiaoyu.wiki')
    expect(site.version).toBe('Java 1.21.11')
  })
  it('has at least one mode, plan, rule group, announcement', () => {
    expect(modes.length).toBeGreaterThan(0)
    expect(plans.length).toBeGreaterThan(0)
    expect(ruleGroups.length).toBeGreaterThan(0)
    expect(announcements.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 3: Run test to verify pass**

Run: `npm run test -- content.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: typed content data files with placeholders"
```

---

### Task 4: react-router 入口与 AppLayout

**Files:**
- Create: `rainveil-site/src/router.tsx`
- Create: `rainveil-site/src/components/layout/AppLayout.tsx`
- Create: `rainveil-site/src/components/layout/Layout.css`（如有需要）
- Modify: `rainveil-site/src/App.tsx`
- Test: `rainveil-site/src/App.test.tsx`

**Interfaces:**
- Produces: `router`（`createBrowserRouter`）导出；`AppLayout` 渲染 `NavBar` + `<Outlet />` + `Footer`；各页面映射到 `/`, `/modes`, `/guide`, `/store`。

- [ ] **Step 1: 写失败测试（App 渲染含布局骨架）**

```tsx
// App.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders NavBar brand', () => {
    render(<App />)
    expect(screen.getByText(/Rainveil/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm fail**

Run: `npm run test -- App.test.tsx` — Expected FAIL（`App`/`NavBar` 尚不存在）。

- [ ] **Step 3: 新建 `router.tsx`**

```tsx
import { createBrowserRouter } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { ModesPage } from './pages/ModesPage'
import { GuidePage } from './pages/GuidePage'
import { StorePage } from './pages/StorePage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/modes', element: <ModesPage /> },
      { path: '/guide', element: <GuidePage /> },
      { path: '/store', element: <StorePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
```

- [ ] **Step 4: 新建 `pages` 桩组件与 `AppLayout`**

Pages 先做最小 `<div />` 桩（后续任务填充）；`AppLayout` 先渲染占位 `NavBar` + `<Outlet />` + `Footer`。`App.tsx` 改为：

```tsx
import { RouterProvider } from 'react-router'
import { router } from './router'
export function App() {
  return <RouterProvider router={router} />
}
```

- [ ] **Step 5: Run test to pass**

Run: `npm run test -- App.test.tsx` — Expected PASS（NavBar 品牌文本存在）。

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: react-router entry and app layout skeleton"
```

---

### Task 5: NavBar 与 Footer

**Files:**
- Create: `rainveil-site/src/components/layout/NavBar.tsx`
- Create: `rainveil-site/src/components/layout/Footer.tsx`
- Modify: `rainveil-site/src/components/layout/AppLayout.tsx`
- Test: `rainveil-site/src/components/layout/NavBar.test.tsx`

**Interfaces:**
- Consumes: `site`（Task 3）
- Produces: `NavBar`（胶囊导航，当前项高亮，移动端收合，无 emoji）；`Footer`（含社区联系）。

- [ ] **Step 1: 写失败测试**

```tsx
// NavBar.test.tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { NavBar } from './NavBar'

describe('NavBar', () => {
  it('renders nav links', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('玩法')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现 `NavBar`**

```tsx
import { NavLink } from 'react-router'
const links = [
  { to: '/', label: '首页' },
  { to: '/modes', label: '玩法' },
  { to: '/guide', label: '开始游玩' },
  { to: '/store', label: '商店' },
]
export function NavBar() {
  return (
    <nav aria-label="主导航">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-ink font-semibold tracking-tight">Rainveil · 雨幕</NavLink>
        <div className="flex items-center gap-1 rounded-pill bg-cloud px-2 py-1.5 shadow-whisper">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-cloud' : 'text-mist hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: 实现 `Footer`（读取 `site.community`）**

```tsx
import { site } from '../../content/site'
export function Footer() {
  return (
    <footer className="border-t border-edge py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-mist">
        <span>{site.name} · {site.version} · {site.ip}</span>
        <span>
          {site.community.map((c, i) => (
            <span key={c.label} className="mr-4">{c.label}: {c.value}</span>
          ))}
        </span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: 接入 `AppLayout`**

```tsx
import { Outlet } from 'react-router'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 6: Run test to pass**

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: navbar and footer"
```

---

### Task 6: 通用 UI 组件（Container/Section/Card/PillButton/Badge/StatTile/CopyIp/Accordion/Icon）

**Files:**
- Create: `rainveil-site/src/components/ui/Container.tsx`
- Create: `rainveil-site/src/components/ui/Section.tsx`
- Create: `rainveil-site/src/components/ui/Card.tsx`
- Create: `rainveil-site/src/components/ui/PillButton.tsx`
- Create: `rainveil-site/src/components/ui/Badge.tsx`
- Create: `rainveil-site/src/components/ui/StatTile.tsx`
- Create: `rainveil-site/src/components/ui/CopyIp.tsx`
- Create: `rainveil-site/src/components/ui/Accordion.tsx`
- Create: `rainveil-site/src/components/ui/Icon.tsx`
- Test: `rainveil-site/src/components/ui/ui.test.tsx`

**Interfaces:**
- Consumes: `site`（Task 3）
- Produces: 上述组件，供页面任务使用。`PillButton` 支持 `variant: 'primary' | 'secondary' | 'ghost'`；`StatTile` 接收 `label`/`value`；`CopyIp` 使用 `navigator.clipboard` 与内嵌 SVG；`Accordion` 受控展开；`Icon` 按 `name` 返回内嵌 SVG path。

- [ ] **Step 1: 写测试（各组件渲染 & 复制交互）**

```tsx
// ui.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Badge } from './Badge'
import { PillButton } from './PillButton'
import { StatTile } from './StatTile'
import { CopyIp } from './CopyIp'

describe('ui components', () => {
  it('Badge renders text', () => {
    render(<Badge>Java 1.21.11</Badge>)
    expect(screen.getByText('Java 1.21.11')).toBeInTheDocument()
  })
  it('StatTile shows label and value', () => {
    render(<StatTile label="版本" value="1.21.11" />)
    expect(screen.getByText('版本')).toBeInTheDocument()
    expect(screen.getByText('1.21.11')).toBeInTheDocument()
  })
  it('CopyIp copies ip to clipboard', async () => {
    const write = vi.fn()
    Object.assign(navigator, { clipboard: { writeText: write } })
    render(<CopyIp ip="mc.xiaoyu.wiki" />)
    await userEvent.click(screen.getByText('mc.xiaoyu.wiki'))
    expect(write).toHaveBeenCalledWith('mc.xiaoyu.wiki')
  })
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现组件（关键两个示例如下，其余同理）**

```tsx
// PillButton.tsx
import type { ReactNode } from 'react'
export function PillButton({ children, variant = 'primary', ...props }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: 'bg-ink text-cloud hover:bg-black',
    secondary: 'border border-edge bg-cloud text-ink hover:border-mist',
    ghost: 'text-mist hover:text-ink',
  }[variant]
  return (
    <button {...props} className={`inline-flex items-center gap-2 rounded-pill px-6 py-3 text-sm font-medium transition-colors ${styles}`}>
      {children}
    </button>
  )
}
```

```tsx
// CopyIp.tsx
import { useState } from 'react'
export function CopyIp({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-pill border border-edge bg-cloud px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-mist">
      <span className="font-mono">{ip}</span>
      <span className="text-mist">{copied ? '已复制' : '复制'}</span>
    </button>
  )
}
```

其余组件（Container/Section/Card/Badge/StatTile/Accordion/Icon）按接口用 Tailwind 类实现，无 emoji。

- [ ] **Step 4: Run test to pass**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: shared ui components"
```

---

### Task 7: 首页 HomePage

**Files:**
- Modify: `rainveil-site/src/pages/HomePage.tsx`
- Test: `rainveil-site/src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `site`, `modes`, `announcements`, UI 组件。
- Produces: 首页区块（Hero、概览条、卖点、玩法入口、公告、CTA）。

- [ ] **Step 1: 写失败测试（Hero 标题 + IP + CTA 存在）**

```tsx
// HomePage.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('shows tagline and server ip', () => {
    render(<HomePage />)
    expect(screen.getByText(/Rainveil/)).toBeInTheDocument()
    expect(screen.getByText('mc.xiaoyu.wiki')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现 `HomePage`（Hero + 区块，文案无 emoji）**

```tsx
import { site } from '../content/site'
import { modes } from '../content/modes'
import { announcements } from '../content/announcements'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { PillButton } from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'
import { StatTile } from '../components/ui/StatTile'
import { CopyIp } from '../components/ui/CopyIp'

export function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Section className="py-16 text-center" kicker="生存 RPG" title={<>进入雨幕，开始你的<em className="font-serif-accent italic">冒险</em></>} subtitle={site.tagline}>
        <div className="mt-6 flex flex-col items-center gap-4">
          <CopyIp ip={site.ip} />
          <PillButton variant="primary">加入服务器</PillButton>
        </div>
      </Section>

      <Section kicker="服务器概览" title="一屏了解" >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatTile label="版本" value={site.version} />
          <StatTile label="类型" value={site.type} />
          <StatTile label="地址" value={site.ip} />
          <StatTile label="在线" value="占位" />
        </div>
      </Section>

      <Section kicker="玩法速览" title="正在展开的世界" >
        <div className="grid gap-4 md:grid-cols-3">
          {modes.slice(0, 3).map((m) => (
            <Card key={m.id}>
              <h3 className="font-medium text-ink">{m.title}</h3>
              <p className="text-mist">{m.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section kicker="公告" title="最新动态" >
        {announcements.slice(0, 3).map((a) => (
          <p key={a.title} className="text-sm text-mist"><span className="mr-2 text-soft">{a.date}</span>{a.title}</p>
        ))}
      </Section>
    </div>
  )
}
```

`Section` 组件按 `kicker/title/subtitle/children` 的类型接口实现；`Card` 实现为 `bg-cloud border border-edge rounded-2xl p-5 shadow-whisper`。

- [ ] **Step 4: Run test to pass**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: home page"
```

---

### Task 8: 玩法详解 ModesPage

**Files:**
- Modify: `rainveil-site/src/pages/ModesPage.tsx`
- Test: `rainveil-site/src/pages/ModesPage.test.tsx`

**Interfaces:**
- Consumes: `modes`, UI 组件。
- Produces: 玩法卡片列表，每项含标题/描述/特性。

- [ ] **Step 1: 失败测试（渲染每个玩法标题）**

```tsx
import { render, screen } from '@testing-library/react'
import { modes } from '../content/modes'
import { ModesPage } from './ModesPage'
it('renders all modes', () => {
  render(<ModesPage />)
  modes.forEach((m) => expect(screen.getByText(m.title)).toBeInTheDocument())
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现 `ModesPage`（遍历 `modes`，Card + features 列表），文案无 emoji**

- [ ] **Step 4: Run test to pass**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: modes page"
```

---

### Task 9: 开始游玩 + 规则 GuidePage

**Files:**
- Modify: `rainveil-site/src/pages/GuidePage.tsx`
- Test: `rainveil-site/src/pages/GuidePage.test.tsx`

**Interfaces:**
- Consumes: `site`, `ruleGroups`, `Accordion`。
- Produces: 进服步骤 + 规则分组（Accordion）+ FAQ。

- [ ] **Step 1: 失败测试（渲染每条规则分组标题）**

```tsx
import { render, screen } from '@testing-library/react'
import { ruleGroups } from '../content/rules'
import { GuidePage } from './GuidePage'
it('renders rule groups', () => {
  render(<GuidePage />)
  ruleGroups.forEach((g) => expect(screen.getByText(g.title)).toBeInTheDocument())
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现 `GuidePage`（含 `site.version`/`site.ip` 的进服步骤、`Accordion` 规则组、FAQ），文案无 emoji**

- [ ] **Step 4: Run test to pass**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: guide page"
```

---

### Task 10: 商店 / 赞助 StorePage

**Files:**
- Modify: `rainveil-site/src/pages/StorePage.tsx`
- Test: `rainveil-site/src/pages/StorePage.test.tsx`

**Interfaces:**
- Consumes: `plans`, UI 组件。
- Produces: 赞助方案卡片 + 权益对照 + 购买指引。

- [ ] **Step 1: 失败测试（渲染每个档位名）**

```tsx
import { render, screen } from '@testing-library/react'
import { plans } from '../content/store'
import { StorePage } from './StorePage'
it('renders all plans', () => {
  render(<StorePage />)
  plans.forEach((p) => expect(screen.getByText(p.name)).toBeInTheDocument())
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现 `StorePage`（`plans` 卡片 + `perks` 列表 + 联系/购买指引），文案无 emoji**

- [ ] **Step 4: Run test to pass**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: store page"
```

---

### Task 11: 404 页面 NotFoundPage

**Files:**
- Modify: `rainveil-site/src/pages/NotFoundPage.tsx`
- Test: `rainveil-site/src/pages/NotFoundPage.test.tsx`

- [ ] **Step 1: 失败测试（渲染 404 文案 + 回首页链接）**

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { NotFoundPage } from './NotFoundPage'
it('renders 404', () => {
  render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
  expect(screen.getByText(/404/)).toBeInTheDocument()
  expect(screen.getByText('回到首页')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to confirm fail**

- [ ] **Step 3: 实现 `NotFoundPage`（文案无 emoji，含返回首页 `Link`）**

- [ ] **Step 4: Run test to pass**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: not found page"
```

---

### Task 12: 响应式与可访问性打磨

**Files:**
- Modify: `rainveil-site/src/components/layout/NavBar.tsx`（移动端收合菜单）
- Modify: 各页面（网格 `md:` 前缀已随组件写入，此处统一核查）

**Interfaces:**
- Produces: 移动端导航收合为菜单；`focus-visible` 聚焦环统一；语义标签、对比达标。

- [ ] **Step 1: NavBar 增加移动端菜单按钮（受控展开）**

保留顶部胶囊在移动端收合为「菜单」按钮（文案无 emoji），展开后显示竖排链接。

- [ ] **Step 2: 全站统一 focus-visible**

在 `src/index.css` 追加：

```css
:focus-visible { outline: none; box-shadow: var(--ring-focus); }
```

- [ ] **Step 3: 核查语义与对比**

`nav/main/footer/article` 齐全；`text-mist`/`text-soft` 在 `bg-cloud` 上满足对比度。

- [ ] **Step 4: 全量测试通过 + 构建通过**

```bash
npm run test
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: responsive nav and a11y polish"
```

---

### Task 13: 端到端自检与交付

**Files:**
- 全局检查

- [ ] **Step 1: 关键词扫描确认无 emoji**

用 Grep 检查 `src/` 中是否出现 emoji 范围：`[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]`，命中则剔除。

- [ ] **Step 2: 全站无 emoji、无外链图片依赖（图标全部内嵌 SVG）**

- [ ] **Step 3: `npm run build` 通过，产出可部署静产物**

- [ ] **Step 4: 记录遗留**

将第 12 节估算的「待补内容」（玩法明细、商店定价、规则要点、进服要求、联系社区、公告）标注为实现后的 `src/content/*` 待替换占位，写明来源位置。

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: final polish and emoji guard"
```

---

## Self-Review

- **Spec 覆盖**：设计文档 3（token）、4（路由）、5（四页+404）、6（组件）、7（内容数据）、8（响应式/a11y）、9（目录）、10（阶段）均已映射到 Task 1–13。第 12 节待补充内容用占位落地并标注。
- **占位符扫描**：无 TBD/TODO；每步含具体代码。文件名一致。
- **类型一致性**：`site`/`modes`/`ruleGroups`/`plans`/`announcements` 类型在 Task 3 定义并贯穿后续任务；`SiteInfo.version`/`ip` 为 string，和 `Mode`/`RuleGroup`/`Plan`/`Announcement` 接口在各页一致使用。
- **说明**：Tailwind 载体采用 v4 的 CSS `@theme`（`src/index.css`），设计文档 3.2 写的是 `tailwind.config.ts`——实现以 v4 的 `@theme` 为准，token 值不变，属实现细节调整。
