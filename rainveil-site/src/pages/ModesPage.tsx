import { modes } from '../content/modes'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'

export function ModesPage() {
  return (
    <Container>
      <Section
        className="py-16"
        kicker="玩法"
        title={
          <span>
            在雨幕里<em className="font-serif-accent italic">体验</em>每一种玩法
          </span>
        }
        subtitle="主线、领地、副本与经济，构成雨幕世界的四大支柱。"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {modes.map((m) => (
            <Card key={m.id}>
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
      </Section>
    </Container>
  )
}
