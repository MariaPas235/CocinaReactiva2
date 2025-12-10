import { useState, useEffect } from 'react'
import './RecipeViewer.css'
import type { Recipe } from '../types'
import IconButton from './IconButton'

interface RecipeViewerProps {
  recipe: Recipe | null
  onUpdate: (id: string, patch: Partial<Recipe>) => void
  onToggleFavorite?: (id: string) => void
}

function RecipeViewer({ recipe, onUpdate, onToggleFavorite }: RecipeViewerProps) {
  const [localServings, setLocalServings] = useState<number>(recipe?.servings ?? 0)
  const [isEditing, setIsEditing] = useState(false)
  const [checked, setChecked] = useState<boolean[]>([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Principal')
  const [ingredientsText, setIngredientsText] = useState('')
  const [steps, setSteps] = useState('')

  useEffect(() => {
    setLocalServings(recipe?.servings ?? 0)
    if (recipe) {
      setTitle(recipe.title)
      setCategory(recipe.category)
      setIngredientsText(recipe.ingredients.join(', '))
      setSteps(recipe.steps)
      // initialize checked state for ingredients (persisted in localStorage per-recipe)
      try {
        const key = `ingredients-checked-${recipe.id}`
        const raw = localStorage.getItem(key)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            // ensure length matches
            const arr = parsed.slice(0, recipe.ingredients.length)
            while (arr.length < recipe.ingredients.length) arr.push(false)
            setChecked(arr)
          } else {
            setChecked(new Array(recipe.ingredients.length).fill(false))
          }
        } else {
          setChecked(new Array(recipe.ingredients.length).fill(false))
        }
      } catch (e) {
        setChecked(new Array(recipe.ingredients.length).fill(false))
      }
    }
  }, [recipe])

  if (!recipe) return <div className="recipe-viewer recipe-viewer--empty">Selecciona una receta para ver los detalles</div>

  const startEdit = () => {
    setIsEditing(true)
    setTitle(recipe.title)
    setCategory(recipe.category)
    setIngredientsText(recipe.ingredients.join(', '))
    setSteps(recipe.steps)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    if (recipe) {
      setTitle(recipe.title)
      setCategory(recipe.category)
      setIngredientsText(recipe.ingredients.join(', '))
      setSteps(recipe.steps)
    }
  }

  const submitEdit = (e: React.FormEvent) => {
    e.preventDefault()
    const ingredients = ingredientsText.split(',').map((s) => s.trim()).filter(Boolean)
    onUpdate(recipe.id, { title: title.trim(), category, ingredients, steps: steps.trim(), servings: localServings })
    setIsEditing(false)
  }

  const toggleChecked = (index: number) => {
    if (!recipe) return
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      try {
        localStorage.setItem(`ingredients-checked-${recipe.id}`, JSON.stringify(next))
      } catch (e) {
        // ignore localStorage errors
      }
      return next
    })
  }

  return (
    <div className="recipe-viewer">
      <div className="recipe-viewer__header">
        <h2>{recipe.title}</h2>
        <div className="recipe-viewer__actions">
          {!isEditing ? (
            <>
              <IconButton onClick={startEdit} color="var(--accent-2)" size="sm">Editar</IconButton>
              <IconButton onClick={() => { if (onToggleFavorite) onToggleFavorite(recipe.id) }} color={recipe.favorite ? 'var(--accent-3)' : 'var(--accent)'} size="sm">{recipe.favorite ? '★ Favorita' : '☆ Favorita'}</IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={submitEdit} color="var(--accent-2)" size="sm">Guardar</IconButton>
              <IconButton onClick={cancelEdit} color="#888" size="sm">Cancelar</IconButton>
            </>
          )}
        </div>
      </div>
      {!isEditing ? (
        <>
          <p className="muted">Categoría: {recipe.category}</p>
          <div className="recipe-viewer__servings">
            <button onClick={() => { const v = Math.max(1, localServings - 1); setLocalServings(v); onUpdate(recipe.id, { servings: v }) }}>-</button>
            <strong>{localServings} raciones</strong>
            <button onClick={() => { const v = localServings + 1; setLocalServings(v); onUpdate(recipe.id, { servings: v }) }}>+</button>
          </div>
          <h3>Ingredientes</h3>
          <ul className="recipe-viewer__ingredients">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className={`recipe-viewer__ingredient`}>
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
        <form className="recipe-viewer__edit" onSubmit={submitEdit}>
          <label>
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Categoría
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Desayuno</option>
              <option>Principal</option>
              <option>Entrada</option>
              <option>Postre</option>
              <option>Cena</option>
            </select>
          </label>
          <label>
            Ingredientes (separados por coma)
            <input value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} />
          </label>
          <label>
            Preparación
            <textarea value={steps} onChange={(e) => setSteps(e.target.value)} rows={4} />
          </label>
        </form>
      )}
    </div>
  )
}

export default RecipeViewer
