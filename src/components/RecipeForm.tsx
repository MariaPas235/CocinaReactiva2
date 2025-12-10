import { useState } from 'react'
import './RecipeForm.css'
import type { Recipe } from '../types'

interface RecipeFormProps {
  onAdd: (r: Omit<Recipe, 'id'>) => void
  onClose?: () => void
}

function RecipeForm({ onAdd, onClose }: RecipeFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Principal')
  const [ingredientsText, setIngredientsText] = useState('')
  const [steps, setSteps] = useState('')
  const [servings, setServings] = useState(2)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const ingredients = ingredientsText.split(',').map((s) => s.trim()).filter(Boolean)
    onAdd({ title: title.trim(), category, ingredients, steps: steps.trim(), servings, favorite: false })
    setTitle('')
    setCategory('Principal')
    setIngredientsText('')
    setSteps('')
    setServings(2)
    if (onClose) onClose()
  }

  return (
    <form className="recipe-form" onSubmit={submit}>
      <h2>Añadir receta</h2>
      <label>
        Título
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Guiso de lentejas" />
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
        <input value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} placeholder="Huevos, Leche, Harina" />
      </label>
      <label>
        Preparación
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} rows={3} placeholder="Describe los pasos..." />
      </label>
      <label>
        Raciones
        <input type="number" min={1} value={servings} onChange={(e) => setServings(Number(e.target.value))} />
      </label>
      <div className="form-actions">
        <button type="submit">Añadir</button>
      </div>
    </form>
  )
}

export default RecipeForm
