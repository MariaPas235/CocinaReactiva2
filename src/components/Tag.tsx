import React from 'react'
import './Tag.css'

type Props = {
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

const Tag: React.FC<Props> = ({ text, color }) => {
  const bg = color ?? categoryColors[text] ?? 'var(--accent)'
  return (
    <span className="tag" style={{ background: bg }}>
      {text}
    </span>
  )
}

export default Tag
