import { site } from '../content/site'
import { Section } from '../components/ui/Section'
import { CopyIp } from '../components/ui/CopyIp'
import { PillButton } from '../components/ui/PillButton'
import { Container } from '../components/ui/Container'

export function HomePage() {
  return (
    <Container>
      <Section
        className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center"
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
    </Container>
  )
}
