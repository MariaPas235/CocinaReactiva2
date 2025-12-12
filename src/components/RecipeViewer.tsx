import { useState } from 'react'
import './RecipeViewer.css'
import type { Recipe } from '../types'
import IconButton from './IconButton'
import RecipeForm from './RecipeForm'

interface RecipeViewerProps {
  recipe: Recipe | null
  onUpdate: (id: string, patch: Partial<Recipe>) => void
  onToggleFavorite?: (id: string) => void
}

function RecipeViewer({ recipe, onUpdate, onToggleFavorite }: RecipeViewerProps) {
  // hooks siempre al inicio
  const [localServings, setLocalServings] = useState<number>(recipe?.servings ?? 0)
  const [isEditing, setIsEditing] = useState(false)
  const [checked, setChecked] = useState<boolean[]>(
    () => {
      if (!recipe) return []
      try {
        const key = `ingredients-checked-${recipe.id}`
        const raw = localStorage.getItem(key)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            const arr = parsed.slice(0, recipe.ingredients.length)
            while (arr.length < recipe.ingredients.length) arr.push(false)
            return arr
          }
        }
      } catch {
        // ignoramos errores de localStorage
      }
      return new Array(recipe.ingredients.length).fill(false)
    }
  )

  if (!recipe) return <div className="recipe-viewer recipe-viewer--empty">Selecciona una receta para ver los detalles</div>

  // 🔹 Sincronizamos localServings con recipe.servings si cambia la receta
  if (!isEditing && recipe && localServings !== recipe.servings) {
    setLocalServings(recipe.servings)
  }

  const handleUpdate = (patch: Partial<Recipe>) => {
    onUpdate(recipe.id, patch)
    setIsEditing(false)
  }

  const toggleChecked = (index: number) => {
    setChecked(prev => {
      const next = [...prev]
      next[index] = !next[index]
      try {
        localStorage.setItem(`ingredients-checked-${recipe.id}`, JSON.stringify(next))
      } catch {
        // ignoramos errores de localStorage
      }
      return next
    })
  }

  return (
    <div className="recipe-viewer" key={recipe.id}>
      <div className="recipe-viewer__header">
        <h2>{recipe.title}</h2>
        <div className="recipe-viewer__actions">
          {!isEditing && (
            <>
              <IconButton onClick={() => setIsEditing(true)} color="var(--accent-2)" size="sm">Editar</IconButton>
              <IconButton 
                onClick={() => onToggleFavorite?.(recipe.id)} 
                color={recipe.favorite ? 'var(--accent-3)' : 'var(--accent)'} 
                size="sm"
              >
                {recipe.favorite ? '★ Favorita' : '☆ Favorita'}
              </IconButton>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <>
          <p className="muted">Categoría: {recipe.category}</p>
          <div className="recipe-viewer__servings">
            <button onClick={() => {
              const v = Math.max(1, localServings - 1)
              setLocalServings(v)
              onUpdate(recipe.id, 
                { servings: v })
            }}>-</button>

            <strong>{localServings} raciones</strong>

            <button onClick={() => {
              const v = localServings + 1
              setLocalServings(v)
              onUpdate(recipe.id, { servings: v })
            }}>+</button>
          </div>

          <h3>Ingredientes</h3>
          <ul className="recipe-viewer__ingredients">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="recipe-viewer__ingredient">
                <label className="recipe-viewer__ingredient-label">
                  <input type="checkbox" checked={!!checked[i]} onChange={() => toggleChecked(i)} />
                  <span className="recipe-viewer__ingredient-text">{ing}</span>
                </label>
              </li>
            ))}
          </ul>

          <h3>Preparación</h3>
          <p>{recipe.steps}</p>
        </>
      ) : (
        <RecipeForm recipe={recipe} onUpdate={handleUpdate} onClose={() => setIsEditing(false)} />
      )}
    </div>
  )
}

export default RecipeViewer
