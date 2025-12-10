import type { ButtonHTMLAttributes } from 'react'
import './IconButton.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

function IconButton({ color = 'var(--accent)', size = 'md', children, ...rest }: IconButtonProps) {
  const pad = size === 'sm' ? '6px 8px' : size === 'lg' ? '10px 14px' : '8px 12px'
  return (
    <button
      {...rest}
      className="icon-button"
      style={{ background: color, color: '#fff', borderRadius: 6, padding: pad, cursor: 'pointer' }}
    >
      {children}
    </button>
  )
}

export default IconButton
