import type { Recipe } from '../types' // importa el type receta 
import Tag from './Tag' // importa el Tag 
import IconButton from './IconButton' // importa el IconButton
import './RecipeCard.css' // importa el css

interface RecipeCardProps {    
  recipe: Recipe  // la receta
  onSelect: (id: string) => void // función para seleccionar receta
  onDelete: (id: string) => void // función para borrar receta
  onToggleFavorite: (id: string) => void // función para marcar/desmarcar como favorita
  ingredientsToShow?: number // opcional: cuántos ingredientes mostrar en la tarjeta
}

function RecipeCard({ recipe, onSelect, onDelete, onToggleFavorite, ingredientsToShow = 5 }: RecipeCardProps) {   
  const preview = recipe.ingredients.slice(0, ingredientsToShow) // solo los primeros N ingredientes según la prop
  const emoji = recipe.category === 'Postre' ? '🍰' 
              : recipe.category === 'Desayuno' ? '🥐' 
              : recipe.category === 'Cena' ? '🍽️' 
              : '🍲' // emoji según categoría

  return (
    <article className={`recipe-card ${recipe.favorite ? 'fav' : ''}`}>
      <div className="recipe-card__top">
        <div className="recipe-card__image" onClick={() => onSelect(recipe.id)}>
          <div className="recipe-card__emoji">{emoji}</div>
        </div>
        <div className="recipe-card__meta"> 
          <div className="recipe-card__header" onClick={() => onSelect(recipe.id)}>
            <h3 className="recipe-card__title">{recipe.title}</h3>
            <Tag text={recipe.category} />
          </div>
          <p className="muted small">{recipe.ingredients.length} ingredientes · {recipe.servings} raciones</p>
          <div className="recipe-card__chips">
            {preview.map((ing, i) => <span key={i} className="recipe-card__chip">{ing}</span>)}
            {recipe.ingredients.length > preview.length && (
              <span className="recipe-card__chip">+{recipe.ingredients.length - preview.length}</span>
            )}
          </div>
        </div>
      </div>

      <div className="recipe-card__actions">
        <IconButton 
          onClick={() => onToggleFavorite(recipe.id)} 
          color={recipe.favorite ? 'var(--accent-3)' : 'var(--accent)'} 
          size="sm"
        >
          {recipe.favorite ? '★ Favorita' : '☆ Favorita'}
        </IconButton>
        <IconButton 
          onClick={() => onDelete(recipe.id)} 
          color="#e63946" 
          size="sm"
        >
          Borrar
        </IconButton>
      </div>
    </article>
  )
}

export default RecipeCard
