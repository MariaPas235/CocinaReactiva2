import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RecipeList from './components/RecipeList'
import RecipeForm from './components/RecipeForm'
import RecipeViewer from './components/RecipeViewer'
import SearchBar from './components/SearchBar'
import type { Recipe } from './types'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 'r1',
      title: 'Tortilla de Patatas',
      category: 'Desayuno',
      ingredients: ['Huevos', 'Patatas', 'Cebolla', 'Aceite', 'Sal'],
      steps: 'Pelar y freír patatas; batir huevos; mezclar y cuajar.',
      servings: 4,
      favorite: true,
    },
    {
      id: 'r2',
      title: 'Pasta al Pesto',
      category: 'Cena',
      ingredients: ['Pasta', 'Albahaca', 'Piñones', 'Ajo', 'Queso', 'Aceite'],
      steps: 'Triturar ingredientes y mezclar con la pasta cocida.',
      servings: 2,
      favorite: false,
    },
  ])

  const [selectedId, setSelectedId] = useState<string | null>(recipes[0]?.id ?? null)
  const [showForm, setShowForm] = useState(false)

  const addRecipe = (r: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = { ...r, id: `r${Date.now()}` }
    setRecipes((prev) => [newRecipe, ...prev])
    setSelectedId(newRecipe.id)
  }

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((p) => p.id !== id))
    setSelectedId((cur) => (cur === id ? null : cur))
  }

  const toggleFavorite = (id: string) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r)))
  }

  const updateRecipe = (id: string, patch: Partial<Recipe>) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const selectedRecipe = recipes.find((r) => r.id === selectedId) ?? null

  return (
    <div id="app-root">
      <Header />
      <main>
        <section className="left">
          <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
            <SearchBar onSelect={setSelectedId} recipes={recipes} />
            {!showForm && (
              <button className="add-recipe-btn" onClick={() => setShowForm(true)}>➕ Añadir receta</button>
            )}
          </div>

          {showForm && (
            <RecipeForm onAdd={addRecipe} onClose={() => setShowForm(false)} />
          )}

          <RecipeList
            recipes={recipes}
            onSelect={setSelectedId}
            onDelete={deleteRecipe}
            onToggleFavorite={toggleFavorite}
          />
        </section>
        <aside className="right">
          <RecipeViewer recipe={selectedRecipe} onUpdate={updateRecipe} onToggleFavorite={toggleFavorite} />
        </aside>
      </main>
      <Footer />
    </div>
  )
}

export default App
