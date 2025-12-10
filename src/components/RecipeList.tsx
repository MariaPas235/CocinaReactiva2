// simple function component; no default React import required with modern JSX
import type { Recipe } from '../types'
import RecipeCard from './RecipeCard'
import './RecipeList.css'

interface RecipeListProps {
  recipes: Recipe[]
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onToggleFavorite: (id: string) => void
}

function RecipeList({ recipes, onSelect, onDelete, onToggleFavorite }: RecipeListProps) {
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
