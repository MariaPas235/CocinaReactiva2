import './Tag.css'

interface TagProps {
  text: string
  color?: string
}

// colores por categoría
const categoryColors: { [key: string]: string } = {
  Desayuno: '#da8e1bed',
  Principal: '#179942ff',
  Entrada: '#dc462fff',
  Postre: '#c77dff',
  Cena: '#61add6ff',
}

function Tag({ text, color }: TagProps) {
  const bg = color || categoryColors[text] || 'var(--accent)'
  return (
    <span className="tag" style={{ background: bg }}>
      {text}
    </span>
  )
}

export default Tag
