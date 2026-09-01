import { tools, knives } from '../../content/farming'
import { Block, KnifeCard, ToolCard } from './_shared'

export function FarmingEquipmentPage() {
  return (
    <div className="flex flex-col gap-10">
      <Block title="厨具">
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Block>

      <Block title="刀具">
        <p className="mb-4 -mt-2 text-sm text-mist">
          刀既是轻量近战武器，也是农夫乐事的核心工具——用它收割草类植物获得草秆，或对动物精准分割出更多肉块。
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {knives.map((knife) => (
            <KnifeCard key={knife.id} knife={knife} />
          ))}
        </div>
      </Block>
    </div>
  )
}
