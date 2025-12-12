import './IconButton.css'

interface IconButtonProps {
  color?: string
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  onClick?: () => void // si quieres manejar clics
}

function IconButton({ color = 'var(--accent)', size = 'md', children, onClick }: IconButtonProps) {
  const pad = size === 'sm' ? '6px 8px' : size === 'lg' ? '10px 14px' : '8px 12px'

  return (
    <button
      onClick={onClick}
      className="icon-button"
      style={{ background: color, color: '#fff', borderRadius: 6, padding: pad, cursor: 'pointer' }}
    >
      {children}
    </button>
  )
}

export default IconButton
