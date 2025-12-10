import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="brand-emoji">🍳</div>
          <h1>Cocina Reactiva — Gestor de Recetas</h1>
        </div>
        <p className="subtitle">Añade, gestiona y visualiza tus recetas favoritas</p>
      </div>
    </header>
  )
}

export default Header
