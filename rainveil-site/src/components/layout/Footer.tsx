import { site } from '../../content/site'
export function Footer() {
  return (
    <footer className="border-t border-edge py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-mist">
        <span>{site.name} · {site.version} · {site.ip}</span>
        <span>
          {site.community.map((c) => (
            <span key={c.label} className="mr-4">{c.label}: {c.value}</span>
          ))}
        </span>
      </div>
    </footer>
  )
}
