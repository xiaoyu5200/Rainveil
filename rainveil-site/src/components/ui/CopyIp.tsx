import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

type CopyStatus = 'idle' | 'copied' | 'failed'

export function CopyIp({ ip, className }: { ip: string; className?: string }) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  function fallbackCopy(): boolean {
    const textarea = document.createElement('textarea')
    textarea.value = ip
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  }

  async function copy() {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(ip)
        ok = true
      }
    } catch {
      ok = false
    }
    if (!ok) {
      try {
        ok = fallbackCopy()
      } catch {
        ok = false
      }
    }
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setStatus(ok ? 'copied' : 'failed')
    timerRef.current = window.setTimeout(() => setStatus('idle'), 1600)
  }

  const label = status === 'copied' ? '已复制' : status === 'failed' ? '复制失败' : '复制'

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`relative inline-flex items-center justify-center rounded-pill border border-edge bg-cloud px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-mist ${className ?? ''}`}
    >
      <span className="font-mono">{ip}</span>
      <span aria-hidden="true" className="absolute right-3 text-mist">
        <Icon name="copy" className="h-4 w-4" />
      </span>
      <span className="sr-only">{label}</span>
    </button>
  )
}
