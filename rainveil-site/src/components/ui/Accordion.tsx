import { useState, type ReactNode } from 'react'
import { Icon } from './Icon'

export interface AccordionItem {
  title: string
  content: ReactNode
}

export function Accordion({
  items,
  openIndex,
  defaultOpenIndex = null,
  onToggle,
}: {
  items: AccordionItem[]
  openIndex?: number | null
  defaultOpenIndex?: number | null
  onToggle?: (nextIndex: number | null) => void
}) {
  const [internalOpen, setInternalOpen] = useState<number | null>(defaultOpenIndex)
  const isControlled = openIndex !== undefined
  const open = isControlled ? openIndex : internalOpen

  function handleToggle(index: number) {
    const next = open === index ? null : index
    if (isControlled) onToggle?.(next)
    else setInternalOpen(next)
  }

  return (
    <div className="divide-y divide-edge overflow-hidden rounded-check border border-edge bg-cloud shadow-whisper">
      {items.map((item, index) => {
        const isOpen = open === index
        const buttonId = `accordion-button-${index}`
        const panelId = `accordion-panel-${index}`
        return (
          <div key={item.title}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink transition-colors hover:bg-sky focus-visible:shadow-[var(--ring-focus)]"
              >
                <span>{item.title}</span>
                <Icon
                  name="chevron-down"
                  className={`h-4 w-4 shrink-0 text-soft transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 text-sm leading-relaxed text-mist"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
