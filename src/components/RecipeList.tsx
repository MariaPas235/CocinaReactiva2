import React from 'react'
import type { Recipe } from '../types'
import RecipeCard from './RecipeCard'
import './RecipeList.css'

type Props = {
  recipes: Recipe[]
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

const RecipeList: React.FC<Props> = ({ recipes, onSelect, onDelete, onToggleFavorite }) => {
  if (recipes.length === 0) return <p className="muted">No hay recetas. Añade la primera receta.</p>

  return (
    <section className="recipe-list">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onSelect={onSelect} onDelete={onDelete} onToggleFavorite={onToggleFavorite} />
      ))}
    </section>
  )
}

export default RecipeList
