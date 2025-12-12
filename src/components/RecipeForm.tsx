import { useState } from 'react'
import './RecipeForm.css'
import type { Recipe } from '../types'

interface RecipeFormProps {
  onAdd?: (recipe: Recipe) => void       // añadir receta nueva
  onUpdate?: (recipe: Recipe) => void    // actualizar receta existente
  recipe?: Recipe | null                 // receta a editar
  onClose?: () => void                    // cerrar formulario
}

function RecipeForm({ onAdd, onUpdate, recipe, onClose }: RecipeFormProps) {
  const isEditing = !!recipe

  const [title, setTitle] = useState(recipe?.title ?? '')
  const [category, setCategory] = useState(recipe?.category ?? 'Principal')
  const [ingredientsText, setIngredientsText] = useState(
    recipe ? recipe.ingredients.join(', ') : ''
  )
  const [steps, setSteps] = useState(recipe?.steps ?? '')
  const [servings, setServings] = useState(recipe?.servings ?? 2)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const ingredients = ingredientsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    if (isEditing && recipe && onUpdate) {
      // actualizar receta existente
      const updatedRecipe: Recipe = {
        ...recipe,               // conservar id y favorite
        title: title.trim(),
        category,
        ingredients,
        steps: steps.trim(),
        servings
      }
      onUpdate(updatedRecipe)
    } else if (!isEditing && onAdd) {
      // añadir nueva receta
      const newRecipe: Recipe = {
        id: Date.now().toString(),
        title: title.trim(),
        category,
        ingredients,
        steps: steps.trim(),
        servings,
        favorite: false
      }
      onAdd(newRecipe)
    }

    onClose?.()
  }

  return (
    <form className="recipe-form" onSubmit={submit}>
      <h2>{isEditing ? 'Editar receta' : 'Añadir receta'}</h2>

      <label>
        Título
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ej. Guiso de lentejas"
        />
      </label>

      <label>
        Categoría
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Desayuno</option>
          <option>Principal</option>
          <option>Entrada</option>
          <option>Postre</option>
          <option>Cena</option>
        </select>
      </label>

      <label>
        Ingredientes (separados por coma)
        <input
          value={ingredientsText}
          onChange={e => setIngredientsText(e.target.value)}
          placeholder="Huevos, Leche, Harina"
        />
      </label>

      <label>
        Preparación
        <textarea
          value={steps}
          onChange={e => setSteps(e.target.value)}
          rows={3}
          placeholder="Describe los pasos..."
        />
      </label>

      <label>
        Raciones
        <input
          type="number"
          min={1}
          value={servings}
          onChange={e => setServings(Number(e.target.value))}
        />
      </label>

      <div className="form-actions">
        <button type="submit">{isEditing ? 'Guardar' : 'Añadir'}</button>
      </div>
    </form>
  )
}

export default RecipeForm
