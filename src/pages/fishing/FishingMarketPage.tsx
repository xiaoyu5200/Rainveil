import { market } from '../../content/fishing'
import { Card } from '../../components/ui/Card'
import { Icon } from '../../components/ui/Icon'

export function FishingMarketPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <Icon name="sparkle" className="mb-2 h-5 w-5 text-signal" />
          <h3 className="mb-1 text-lg font-semibold text-ink">价格公式</h3>
          <p className="text-sm text-mist">{market.priceFormula}</p>
        </Card>
        <Card>
          <Icon name="clock" className="mb-2 h-5 w-5 text-citrus" />
          <h3 className="mb-1 text-lg font-semibold text-ink">每日上限</h3>
          <p className="text-sm text-mist">单日最高可赚取 {market.dailyLimit} 金币，达到后停止结算。</p>
        </Card>
        <Card>
          <Icon name="globe" className="mb-2 h-5 w-5 text-meadow" />
          <h3 className="mb-1 text-lg font-semibold text-ink">出售方式</h3>
          <p className="text-sm text-mist">{market.sellMode}</p>
        </Card>
      </div>

      <div className="overflow-hidden rounded-check border border-edge bg-cloud shadow-whisper">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-sky text-left text-soft">
              <th className="px-4 py-3 font-medium">鱼类</th>
              <th className="px-4 py-3 font-medium">基础价</th>
            </tr>
          </thead>
          <tbody>
            {market.vanillaPrices.map((item) => (
              <tr key={item.name} className="border-t border-edge/60">
                <td className="px-4 py-3 text-mist">{item.name}</td>
                <td className="px-4 py-3 text-ink">{item.price} 币</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
