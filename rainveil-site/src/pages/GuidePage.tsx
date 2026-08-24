import { site } from '../content/site'
import { ruleGroups } from '../content/rules'
import { faqs } from '../content/faq'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Accordion } from '../components/ui/Accordion'
import { CopyIp } from '../components/ui/CopyIp'
import { Icon } from '../components/ui/Icon'

const steps = [
  {
    title: '确认版本',
    body: (
      <>
        服务器当前运行于{' '}
        <code className="rounded-check border border-edge bg-cloud px-1.5 py-0.5 font-mono text-sm text-ink">
          {site.version}
        </code>
        ，请使用一致的客户端版本进入。
      </>
    ),
  },
  {
    title: '添加服务器',
    body: (
      <>
        在多人游戏界面点击「添加服务器」，自定义服务器名称，进入下一步填写地址。
      </>
    ),
  },
  {
    title: '填写地址并进入',
    body: (
      <>
        将服务器地址填写为 <span className="font-mono text-ink">{site.ip}</span>，完成后即可加入Rainveil。
      </>
    ),
  },
]

export function GuidePage() {
  return (
    <Container>
      <Section
        className="py-16"
        kicker="开始游玩"
        title={
          <span>
            三步进入<em className="font-serif-accent italic">Rainveil</em>
          </span>
        }
        subtitle="从确认版本到加入服务器，三步开启你的Rainveil之旅。"
      >
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-edge bg-cloud text-sm font-semibold text-ink shadow-whisper">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mist">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <CopyIp ip={site.ip} />
        </div>
      </Section>

      <Section kicker="规则" title="服务器规则" subtitle="维护良好的游戏环境，需要每一位玩家共同遵守。">
        <Accordion
          defaultOpenIndex={0}
          items={ruleGroups.map((g) => ({
            title: g.title,
            content: (
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-mist">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-soft" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ),
          }))}
        />
      </Section>

      <Section kicker="FAQ" title="常见问题">
        <Accordion
          items={faqs.map((f) => ({
            title: f.q,
            content: <p>{f.a}</p>,
          }))}
        />
      </Section>
    </Container>
  )
}
