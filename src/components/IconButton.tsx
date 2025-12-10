import React from 'react'
import './IconButton.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

const IconButton: React.FC<Props> = ({ color = 'var(--accent)', size = 'md', children, ...rest }) => {
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
