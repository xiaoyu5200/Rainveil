import { site } from '../content/site'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export function StorePage() {
  return (
    <Container>
      <Section
        className="py-16"
        kicker="商店"
        title={
          <span>
            Rainveil<em className="font-serif-accent italic">商店</em>
          </span>
        }
        subtitle="赞助与权益方案尚未开放，敬请期待。"
      >
        <div className="flex flex-col items-center gap-4 rounded-check border border-edge bg-cloud px-6 py-16 text-center shadow-whisper">
          <Badge>未开放</Badge>
          <p className="max-w-md text-mist">商店暂未开放，具体方案与开放时间将在官网与群内公布。</p>
        </div>
      </Section>

      <Section
        className="mt-16"
        kicker="社区"
        title="联系我们"
        subtitle="加入官方社区，第一时间了解开服与更新动态。"
      >
        <Card>
          <ul className="divide-y divide-edge">
            {site.community.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span className="text-sm text-mist">{c.label}</span>
                <span className="font-medium text-ink">{c.value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>
    </Container>
  )
}
