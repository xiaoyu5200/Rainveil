import { Link } from 'react-router'
import { site } from '../content/site'
import { modes } from '../content/modes'
import { announcements } from '../content/announcements'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { CopyIp } from '../components/ui/CopyIp'
import { PillButton } from '../components/ui/PillButton'
import { Icon } from '../components/ui/Icon'
import { Container } from '../components/ui/Container'

export function HomePage() {
  return (
    <Container>
      <Section
        className="py-16 text-center"
        as="h1"
        kicker="雨幕"
        title={<>进入 Rainveil，开始你的<em className="font-serif-accent italic">冒险</em></>}
        subtitle={site.tagline}
      >
        <div className="flex flex-col items-center gap-4">
          <CopyIp ip={site.ip} />
          <PillButton variant="primary">加入服务器</PillButton>
        </div>
      </Section>

      <Section kicker="玩法速览" title="正在展开的世界">
        <div className="grid gap-4 md:grid-cols-3">
          {modes.slice(0, 3).map((m) => (
            <Card key={m.id} as="article">
              <Link to="/modes" className="group block" aria-label={`${m.title}，前往玩法详解`}>
                <h3 className="font-medium text-ink transition-colors group-hover:text-signal">
                  {m.title}
                </h3>
                <p className="text-mist">{m.desc}</p>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/modes"
            className="inline-flex items-center gap-2 rounded-pill border border-edge bg-cloud px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-mist"
          >
            查看全部玩法
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section kicker="公告" title="最新动态">
        {announcements.slice(0, 3).map((a) => (
          <p key={a.title} className="text-sm text-mist">
            <span className="mr-2 text-mist">{a.date}</span>
            {a.title}
          </p>
        ))}
      </Section>

    </Container>
  )
}
