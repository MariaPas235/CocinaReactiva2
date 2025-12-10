import React from 'react'
import type { Recipe } from '../types'
import Tag from './Tag'
import IconButton from './IconButton'
import './RecipeCard.css'

type Props = {
  recipe: Recipe
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

const RecipeCard: React.FC<Props> = ({ recipe, onSelect, onDelete, onToggleFavorite }) => {
  const preview = recipe.ingredients.slice(0, 3)
  const emoji = recipe.category === 'Postre' ? '🍰' : recipe.category === 'Desayuno' ? '🥐' : recipe.category === 'Cena' ? '🍽️' : '🍲'

  return (
    <article className={`recipe-card ${recipe.favorite ? 'fav' : ''}`}>
      <div className="card-top">
        <div className="thumb" onClick={() => onSelect(recipe.id)}>
          <div className="thumb-emoji">{emoji}</div>
        </div>
        <div className="card-meta">
          <div className="card-header" onClick={() => onSelect(recipe.id)}>
            <h3>{recipe.title}</h3>
            <Tag text={recipe.category} />
          </div>
          <p className="muted small">{recipe.ingredients.length} ingredientes · {recipe.servings} raciones</p>
          <div className="ingredients-chips">
            {preview.map((ing, i) => <span key={i} className="chip">{ing}</span>)}
            {recipe.ingredients.length > preview.length && <span className="chip">+{recipe.ingredients.length - preview.length}</span>}
          </div>
        </div>
      </div>

      <div className="card-actions">
        <IconButton onClick={() => onToggleFavorite(recipe.id)} color={recipe.favorite ? 'var(--accent-3)' : 'var(--accent)'} size="sm">
          {recipe.favorite ? '★ Favorita' : '☆ Favorita'}
        </IconButton>
        <IconButton onClick={() => onDelete(recipe.id)} color="#e63946" size="sm">Borrar</IconButton>
      </div>
    </article>
  )
}

export default RecipeCard
