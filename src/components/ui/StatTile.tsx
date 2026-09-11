export function StatTile({ label, value, hint }: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-soft">{label}</span>
      <span className="text-2xl font-semibold text-ink">{value}</span>
      {hint ? <span className="text-sm text-mist">{hint}</span> : null}
    </div>
  )
}
