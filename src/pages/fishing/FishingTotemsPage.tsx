import { lazy, Suspense } from 'react'
import { totems } from '../../content/fishing'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Block, Info } from './_shared'

// three.js 体积较大，懒加载，仅在进入图腾页时才下载对应 chunk
const ModelViewer = lazy(() =>
  import('../../components/ui/ModelViewer').then((m) => ({ default: m.ModelViewer })),
)

export function FishingTotemsPage() {
  return (
    <Block title="钓鱼图腾">
      <div className="grid gap-4 md:grid-cols-2">
        {totems.map((totem) => (
          <Card as="article" key={totem.id}>
            <h3 className="mb-1 text-lg font-semibold text-ink">{totem.name}</h3>
            <p className="text-sm text-mist">{totem.desc}</p>
            <dl className="mt-4 divide-y divide-edge/60">
              <Info label="效果">
                {totem.effects.map((e) => (
                  <Badge key={e} tone="signal">
                    {e}
                  </Badge>
                ))}
              </Info>
              <Info label="激活方式">{totem.activate}</Info>
              <Info label="持续时间">{totem.duration}</Info>
              <Info label="作用范围">{totem.radius}</Info>
              <Info label="激活消耗">{totem.cost}</Info>
            </dl>
            {totem.model ? (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold text-ink">3D 预览</h4>
                <Suspense
                  fallback={
                    <div className="h-96 w-full animate-pulse rounded-check border border-edge/70 bg-sky/40" />
                  }
                >
                  <ModelViewer
                    src={totem.model}
                    alt={`${totem.name} 3D 模型`}
                    className="h-96 w-full overflow-hidden rounded-check border border-edge/70 bg-sky/40"
                  />
                </Suspense>
              </div>
            ) : null}
            <div className="mt-4 rounded-check border border-edge/70 bg-sky/40 p-3">
              <h4 className="mb-2 text-sm font-semibold text-ink">建造结构</h4>
              <ol className="space-y-1.5">
                {totem.structure.map((layer) => (
                  <li key={layer.label} className="text-sm">
                    <span className="font-medium text-ink">{layer.label}：</span>
                    <span className="text-mist">{layer.blocks}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        ))}
      </div>
    </Block>
  )
}
