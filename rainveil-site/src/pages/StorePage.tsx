import { plans } from '../content/store'
import { site } from '../content/site'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Icon } from '../components/ui/Icon'
import { PillButton } from '../components/ui/PillButton'

const featuredId = 'patron'

// 所有档位 perks 的并集：去重、保持内容源顺序
const allPerks = Array.from(new Set(plans.flatMap((p) => p.perks)))

export function StorePage() {
  return (
    <Container>
      <Section
        className="py-16"
        kicker="商店"
        title={
          <span>
            选择一个方案来支持<em className="font-serif-accent italic">雨幕</em>
          </span>
        }
        subtitle="每一份赞助都会直接支持服务器运营，让雨幕走得更远。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((p) => {
            const featured = p.id === featuredId
            return (
              <Card key={p.id} as="article" shadow={featured ? 'float' : 'whisper'}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
                  {featured ? <Badge tone="signal">推荐</Badge> : null}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-ink">{p.price}</span>
                  <span className="text-sm text-mist">{p.per}</span>
                </div>
                <ul className="mt-5 space-y-2">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-mist">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-soft" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <PillButton variant="primary">赞助 / 购买</PillButton>
                </div>
              </Card>
            )
          })}
        </div>
      </Section>

      <Section
        className="mt-16"
        kicker="权益"
        title={
          <span>
            权益<em className="font-serif-accent italic">一览</em>
          </span>
        }
        subtitle="各档方案的核心权益，支持与体验一目了然。"
      >
        <div className="overflow-x-auto rounded-check border border-edge bg-cloud shadow-whisper">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <caption className="sr-only">雨幕赞助方案的权益对照表</caption>
            <thead>
              <tr className="border-b border-edge">
                <th scope="col" className="px-6 py-4 font-medium text-mist">权益</th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="px-6 py-4 text-center font-medium text-ink">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPerks.map((perk) => (
                <tr key={perk} className="border-t border-edge">
                  <th scope="row" className="px-6 py-3 font-normal text-mist">{perk}</th>
                  {plans.map((p) => (
                    <td key={p.id} className="px-6 py-3 text-center">
                      {p.perks.includes(perk)
                        ? <Icon name="check" className="mx-auto h-4 w-4 text-meadow" />
                        : <span aria-hidden="true" className="text-soft/60">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        className="mt-16"
        kicker="指引"
        title="联系我们"
        subtitle="赞助与回馈事宜，通过以下渠道与我们联系，明细以站内与群内公告为准。"
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
        <p className="mt-4 text-sm leading-relaxed text-mist">
          这些渠道仅用于沟通赞助明细与回馈发放，请勿重复添加；回馈规则以站内公告与群公告为准。
        </p>
      </Section>
    </Container>
  )
}
