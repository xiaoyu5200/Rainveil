import { foodCategories } from '../../content/farming'
import { Badge } from '../../components/ui/Badge'
import { Block, DishCard } from './_shared'

export function FarmingFoodsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-check border border-edge bg-cloud p-5 shadow-whisper">
        <div className="mb-3 flex items-center gap-2">
          <Badge tone="signal">滋养效果</Badge>
        </div>
        <p className="text-sm text-mist">
          汤饭、拼盘与盛宴等菜肴会附带「滋养」效果：持续期间你不会消耗饥饿值（除非需要借以恢复生命值）。持续时间越长，越适合下矿、远征等长时间活动。
        </p>
      </div>

      {foodCategories.map((cat) => (
        <Block key={cat.key} title={cat.label}>
          <p className="mb-4 -mt-2 text-sm text-mist">{cat.desc}</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cat.dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </Block>
      ))}
    </div>
  )
}
