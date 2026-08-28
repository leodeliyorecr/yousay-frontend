import { useParams } from 'react-router-dom'

export default function BusinessCardView() {
  const { code } = useParams<{ code: string }>()

  if (!code) return null

  return (
    <iframe
      src={`/api/bc/${code}/html`}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none'
      }}
      title="Tarjeta de Presentación"
    />
  )
}