import { loot } from '../../content/fishing'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Block, Pixel } from './_shared'

export function FishingLootPage() {
  return (
    <Block title="特殊战利品">
      <Card as="article">
          <div className="mb-4 flex items-center gap-3">
            <Pixel
              src="/fishing/enchanted_book.png"
              alt="附魔书"
              className="h-12 w-12 rounded-check border border-edge/70 bg-sky/60 p-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-ink">附魔书</h3>
                <Badge tone="signal">战利品</Badge>
              </div>
              <p className="mt-1 text-sm text-mist">{loot.enchantBook.intro}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {loot.enchantBook.pools.map((pool) => (
              <div key={pool.label}>
                <h4 className="mb-2 text-sm font-semibold text-ink">{pool.label}</h4>
                <ul className="flex flex-col gap-1.5">
                  {pool.items.map(([name, level]) => (
                    <li
                      key={name}
                      className="flex items-center justify-between gap-4 rounded-check border border-edge/60 bg-sky/40 px-3 py-2"
                    >
                      <div className="flex items-center gap-3">
                        <Pixel src="/fishing/enchanted_book.png" alt="附魔书" className="h-12 w-12" />
                        <span className="text-sm text-mist">{name}</span>
                      </div>
                      <span className="rounded-pill bg-cloud px-2.5 py-1 text-xs text-soft">等级 {level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
      </Card>
    </Block>
  )
}
