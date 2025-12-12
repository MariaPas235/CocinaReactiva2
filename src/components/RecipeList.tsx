import type { Recipe } from '../types'
import RecipeCard from './RecipeCard'
import './RecipeList.css'

interface RecipeListProps {
  recipes: Recipe[] // array de recetas a mostrar
  onSelect: (id: string) => void //función para seleccionar una receta 
  onDelete: (id: string) => void //función para eliminar una receta 
  onToggleFavorite: (id: string) => void //función para añadir a favoritos 
}

function RecipeList({ recipes, onSelect, onDelete, onToggleFavorite }: RecipeListProps) { //componente que muestra la lista de recetas 
  if (recipes.length === 0) return <p className="muted">No hay recetas. Añade la primera receta.</p> //si la lista está vacía muestra mensaje 

  return (
    <section className="recipe-list"> 
      {recipes.map((r) => ( 
        <RecipeCard key={r.id} recipe={r} onSelect={onSelect} onDelete={onDelete} onToggleFavorite={onToggleFavorite} ingredientsToShow={3} /> //mapea cada receta y las muestra en el RecipeCard
      ))}
    </section>
  )
}

export default RecipeList
