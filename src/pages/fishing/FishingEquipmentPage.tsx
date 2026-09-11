import { rods, baits, hooks } from '../../content/fishing'
import { EquipCard, Block } from './_shared'

export function FishingEquipmentPage() {
  return (
    <div className="flex flex-col gap-10">
      <Block title="鱼竿装备">
        <div className="grid gap-4 md:grid-cols-2">
          {rods.map((rod) => (
            <EquipCard
              key={rod.id}
              name={rod.name}
              desc={rod.desc}
              effects={rod.effects}
              img={`/fishing/rod/${rod.id}.png`}
              badge={`耐久 ${rod.durability}`}
            />
          ))}
        </div>
      </Block>

      <Block title="鱼饵">
        <div className="grid gap-4 md:grid-cols-2">
          {baits.map((bait) => {
            const isVanilla = bait.id === 'BOOK'
            return (
              <EquipCard
                key={bait.id}
                name={bait.name}
                desc={bait.desc}
                effects={bait.effects}
                img={isVanilla ? '/fishing/bait/book.png' : `/fishing/bait/${bait.id}.png`}
                badge={isVanilla ? '原版物品' : undefined}
              />
            )
          })}
        </div>
      </Block>

      <Block title="鱼钩">
        <div className="grid gap-4 md:grid-cols-2">
          {hooks.map((hook) => (
            <EquipCard
              key={hook.id}
              name={hook.name}
              desc={hook.desc}
              effects={hook.effects}
              img={`/fishing/hook/${hook.id}.png`}
              badge={`耐久 ${hook.durability}`}
            />
          ))}
        </div>
      </Block>
    </div>
  )
}
