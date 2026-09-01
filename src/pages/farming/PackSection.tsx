import { useParams } from 'react-router'
import { getPack } from '../../content/packs'
import { PackBody } from './PackBody'
import { NotFoundPage } from '../NotFoundPage'

export function PackSection() {
  const { packKey } = useParams()
  const pack = packKey ? getPack(packKey) : undefined
  if (!pack) return <NotFoundPage />
  return <PackBody pack={pack} />
}
