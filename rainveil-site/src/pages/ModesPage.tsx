import { Link } from 'react-router'
import { modes } from '../content/modes'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Icon } from '../components/ui/Icon'

export function ModesPage() {
  return (
    <Container>
      <Section
        className="py-16"
        kicker="玩法"
        title={
          <span>
            在Rainveil里<em className="font-serif-accent italic">体验</em>每一种玩法
          </span>
        }
        subtitle="主线、领地、副本与经济，构成Rainveil世界的四大支柱。"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {modes.map((m) => (
            <Card key={m.id} as="article">
              <h3 className="text-lg font-semibold text-ink">{m.title}</h3>
              <p className="mt-2 text-mist">{m.desc}</p>
              <ul className="mt-4 space-y-2">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-mist">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-soft" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Link
          to="/modes/fishing"
          className="group mt-4 flex items-center gap-4 rounded-check border border-edge bg-cloud p-6 shadow-whisper transition-shadow hover:shadow-float"
        >
          <div className="flex flex-none items-center gap-1.5">
            {['', '_silver_star', '_golden_star'].map((suffix) => (
              <img
                key={suffix}
                src={`/fishing/fish/tuna_fish${suffix}.png`}
                alt="金枪鱼"
                className="h-14 w-14 flex-none rounded-check border border-edge/70 bg-sky/60 object-contain p-1 [image-rendering:pixelated]"
              />
            ))}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-ink">钓鱼玩法</h3>
              <Badge tone="citrus">已开放</Badge>
            </div>
            <p className="mt-1 text-mist">16 种鱼、五档鱼竿、鱼饵鱼钩与图腾，以及围绕鱼市的经济循环。</p>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-signal">
              查看完整攻略
              <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </Section>
    </Container>
  )
}
