import { fish, loot } from '../../content/fishing'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Icon } from '../../components/ui/Icon'
import { FishTile, Pixel } from './_shared'

export function FishingFishPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2">
        {fish.map((f) => (
          <FishTile key={f.id} fish={f} />
        ))}
      </div>

      <Card as="article">
        <div className="mb-3 flex items-center gap-2">
          <Icon name="sparkle" className="h-5 w-5 text-citrus" />
          <h3 className="text-lg font-semibold text-ink">特殊鱼</h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <Pixel
              src={`/fishing/fish/${loot.rainbowFish.texture}.png`}
              alt={loot.rainbowFish.name}
              className="h-14 w-14 rounded-check border border-edge/70 bg-sky/60 p-1"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-ink">{loot.rainbowFish.name}</h4>
                <Badge tone="signal">特殊钓法</Badge>
              </div>
              <p className="mt-0.5 text-sm text-mist">{loot.rainbowFish.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Pixel
              src={`/fishing/fish/${loot.radioactive.texture}.png`}
              alt={loot.radioactive.name}
              className="h-14 w-14 rounded-check border border-edge/70 bg-sky/60 p-1"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-ink">{loot.radioactive.name}</h4>
                <Badge tone="citrus">垃圾</Badge>
              </div>
              <p className="mt-0.5 text-sm text-mist">{loot.radioactive.desc}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
