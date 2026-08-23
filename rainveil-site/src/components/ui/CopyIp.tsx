import { useState } from 'react'
export function CopyIp({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    await navigator.clipboard.writeText(ip)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-pill border border-edge bg-cloud px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-mist">
      <span className="font-mono">{ip}</span>
      <span className="text-mist">{copied ? '已复制' : '复制'}</span>
    </button>
  )
}
