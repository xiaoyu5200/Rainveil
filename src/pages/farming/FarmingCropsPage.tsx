import { crops, wildCrops, soil } from '../../content/farming'
import { RECIPES } from '../../content/farmingRecipes'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Block, CropCard, Pixel } from './_shared'
import { RecipeGrid } from './RecipeCard'

const organicCompostRecipe = RECIPES.find((r) => r.id === 'farmersdelight:organic_compost')

export function FarmingCropsPage() {
  return (
    <div className="flex flex-col gap-10">
      <Block title="可种植作物">
        <div className="grid gap-4 md:grid-cols-2">
          {crops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      </Block>

      <Block title="野生作物">
        <p className="mb-4 -mt-2 text-sm text-mist">
          新作物在野外均有对应野生形态，采集即可获得作物或种子，无需开局依赖交易。
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {wildCrops.map((w) => (
            <article key={w.id} className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Pixel src={`/farming/${w.texture}`} alt={w.name} className="h-12 w-12" />
                  <h3 className="text-lg font-semibold text-ink">{w.name}</h3>
                </div>
                <Badge tone="citrus">{w.biome}</Badge>
              </div>
              <p className="text-sm text-mist">{w.desc}</p>
              <p className="mt-3 text-xs text-soft">
                掉落：
                {w.drops.map((d) => (
                  <span key={d} className="ml-1.5 inline-block rounded-pill bg-sky px-2 py-0.5 text-mist">
                    {d}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </Block>

      <Block title="土壤与堆肥">
        <div className="grid gap-4 md:grid-cols-3">
          <Card as="article" className="md:col-span-1">
            <div className="mb-3 flex items-center gap-3">
              <Pixel src={`/farming/${soil.compost.texture}`} alt={soil.compost.name} className="h-12 w-12" />
              <h3 className="text-lg font-semibold text-ink">{soil.compost.name}</h3>
            </div>
            <p className="text-sm text-mist">{soil.compost.desc}</p>
            <div className="mt-4 rounded-check border border-edge/70 bg-sky/40 p-3">
              <p className="mb-2 text-xs font-semibold text-ink">合成表</p>
              {organicCompostRecipe ? (
                <div className="rounded-check bg-cloud p-2 shadow-whisper">
                  <RecipeGrid compact recipe={organicCompostRecipe} />
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {soil.compost.recipe.map((r) => (
                    <span key={r} className="rounded-pill bg-cloud px-2.5 py-1 text-xs text-mist">
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Card as="article" className="md:col-span-2">
            <h3 className="mb-3 text-lg font-semibold text-ink">分解与催化</h3>
            <p className="text-sm text-mist">
              有机堆肥会随随机刻缓慢分解，8 个阶段后变成{soil.richSoil.name}。以下条件会加快分解：
            </p>
            <ul className="mt-3 space-y-2 text-sm text-mist">
              {['有日光照射（亮度 ≥ 12）', '周围有水', '周围有蘑菇 / 灰化土 / 菌丝 / 其它堆肥作为催化物'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-meadow" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-check border border-edge/70 bg-sky/40 p-3">
                <Pixel src={`/farming/${soil.richSoil.texture}`} alt={soil.richSoil.name} className="h-10 w-10" />
                <div>
                  <p className="text-sm font-medium text-ink">{soil.richSoil.name}</p>
                  <p className="text-xs text-mist">{soil.richSoil.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-check border border-edge/70 bg-sky/40 p-3">
                <Pixel src={`/farming/${soil.richFarmland.texture}`} alt={soil.richFarmland.name} className="h-10 w-10" />
                <div>
                  <p className="text-sm font-medium text-ink">{soil.richFarmland.name}</p>
                  <p className="text-xs text-mist">{soil.richFarmland.desc}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Block>

      <Block title="蘑菇菌落">
        <div className="grid gap-4 md:grid-cols-2">
          {soil.colonies.map((c) => (
            <Card as="article" key={c.name}>
              <div className="mb-3 flex items-center gap-3">
                <Pixel src={`/farming/${c.texture}`} alt={c.name} className="h-12 w-12" />
                <h3 className="text-lg font-semibold text-ink">{c.name}</h3>
              </div>
              <p className="text-sm text-mist">{c.desc}</p>
            </Card>
          ))}
        </div>
      </Block>
    </div>
  )
}
