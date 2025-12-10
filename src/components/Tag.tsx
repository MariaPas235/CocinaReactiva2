import './Tag.css'

interface TagProps {
  text: string
  color?: string
}

const categoryColors: Record<string, string> = {
  Desayuno: 'var(--accent-3)',
  Principal: 'var(--accent)',
  Entrada: 'var(--accent-2)',
  Postre: '#c77dff',
  Cena: 'var(--accent-2)',
}

function Tag({ text, color }: TagProps) {
  const bg = color ?? categoryColors[text] ?? 'var(--accent)'
  return (
    <span className="tag" style={{ background: bg }}>
      {text}
    </span>
  )
}

export default Tag
