import type { ReactNode } from 'react'
export function PillButton({ children, variant = 'primary', className, ...props }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles = {
    primary: 'bg-ink text-cloud hover:bg-ink/90',
    secondary: 'border border-edge bg-cloud text-ink hover:border-mist',
    ghost: 'text-mist hover:text-ink',
  }[variant]
  return (
    <button {...props} className={`inline-flex items-center gap-2 rounded-pill px-6 py-3 text-sm font-medium transition-colors ${styles} ${className ?? ''}`}>
      {children}
    </button>
  )
}
