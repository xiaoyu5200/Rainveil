import { mod } from '../../content/mod'
import type { ModChangelogEntry } from '../../content/types'
import { Container } from '../../components/ui/Container'
import { Section } from '../../components/ui/Section'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Accordion } from '../../components/ui/Accordion'
import { StatTile } from '../../components/ui/StatTile'
import { Icon } from '../../components/ui/Icon'

const tagMeta: Record<
  ModChangelogEntry['tag'],
  { label: string; tone: 'signal' | 'meadow' | 'citrus' | 'default'; dot: string }
> = {
  feature: { label: '新功能', tone: 'signal', dot: 'bg-signal' },
  fix: { label: '修复', tone: 'meadow', dot: 'bg-meadow' },
  balance: { label: '平衡', tone: 'citrus', dot: 'bg-citrus' },
  breaking: { label: '不兼容', tone: 'default', dot: 'bg-ink' },
}

const downloadButton =
  'inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-medium text-cloud transition-colors hover:bg-ink/90'

export function ModPage() {
  const { latest } = mod

  return (
    <Container>
      <Section
        className="py-16"
        as="h1"
        kicker="专属 MOD"
        title={mod.name}
        subtitle={mod.tagline}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <a href={latest.url} className={downloadButton}>
              <Icon name="package" className="h-4 w-4" />
              下载最新版 v{latest.version}
            </a>
            <Badge tone="meadow">v{latest.version} 已发布</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-mist">
              <Icon name="clock" className="h-4 w-4 text-soft" />
              更新于 {latest.releasedAt}
            </span>
          </div>

          <div className="grid gap-6 rounded-check border border-edge bg-cloud p-6 shadow-whisper sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="最新版本" value={latest.version} />
            <StatTile label="游戏版本" value={latest.mcVersion} />
            <StatTile label="加载器" value={latest.loader} />
            <StatTile label="文件大小" value={latest.fileSize} />
          </div>
        </div>
      </Section>

      <Section
        className="mt-16"
        divider
        kicker="下载"
        title={
          <span>
            下载<em className="font-serif-accent italic">与镜像</em>
          </span>
        }
        subtitle={mod.description}
      >
        <Card>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink">{latest.fileName}</h3>
                  <Badge tone="signal">v{latest.version}</Badge>
                </div>
                <p className="mt-1 text-sm text-mist">
                  {latest.mcVersion} · {latest.loader} · {latest.fileSize} · 更新于 {latest.releasedAt}
                </p>
              </div>
              <a href={latest.url} className={downloadButton}>
                <Icon name="package" className="h-4 w-4" />
                下载模组
              </a>
            </div>

            <ul className="divide-y divide-edge border-t border-edge">
              {mod.mirrors.map((mirror) => (
                <li key={mirror.label} className="flex items-center justify-between gap-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-ink">
                    <Icon name="globe" className="h-4 w-4 flex-none text-soft" />
                    {mirror.label}
                    {mirror.note ? <span className="text-xs text-soft">{mirror.note}</span> : null}
                  </span>
                  {mirror.url ? (
                    <a href={mirror.url} className="text-sm font-medium text-signal hover:underline">
                      前往下载
                    </a>
                  ) : (
                    <span className="text-sm text-soft">见页脚社区</span>
                  )}
                </li>
              ))}
            </ul>

            <p className="text-xs text-soft">示例占位：文件名、文件大小与下载链接待替换为真实信息。</p>
          </div>
        </Card>
      </Section>

      <Section className="mt-16" divider kicker="安装" title="安装说明" subtitle="四步完成安装。">
        <ol className="grid gap-4 sm:grid-cols-2">
          {mod.install.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-check border border-edge bg-cloud p-5 shadow-whisper"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-pill bg-ink text-sm font-semibold text-cloud">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-mist">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        className="mt-16"
        divider
        kicker="更新日志"
        title={
          <span>
            更新<em className="font-serif-accent italic">日志</em>
          </span>
        }
        subtitle="记录每个版本的变更内容。"
      >
        <ol className="relative space-y-6 border-l-2 border-edge pl-6">
          {mod.changelog.map((entry) => {
            const meta = tagMeta[entry.tag]
            return (
              <li key={entry.version} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-4 h-3 w-3 rounded-full border-2 border-cloud ${meta.dot}`}
                />
                <Card>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-ink">v{entry.version}</h3>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                    <span className="text-sm text-soft">{entry.date}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-sm text-mist">
                        <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-meadow" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            )
          })}
        </ol>
      </Section>

      <Section className="mt-16" divider kicker="运行要求" title="运行要求">
        <Card>
          <dl className="divide-y divide-edge">
            {mod.requirements.map((req) => (
              <div
                key={req.label}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <dt className="flex items-center gap-2 text-sm text-mist">
                  <Icon name="shield" className="h-4 w-4 flex-none text-soft" />
                  {req.label}
                </dt>
                <dd className="font-medium text-ink">{req.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Section>

      <Section className="mb-8 mt-16" divider kicker="常见问题" title="常见问题">
        <Accordion items={mod.faq.map((item) => ({ title: item.q, content: item.a }))} />
      </Section>
    </Container>
  )
}
