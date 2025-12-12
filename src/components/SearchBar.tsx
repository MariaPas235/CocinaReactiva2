import { useState } from 'react'
import './SearchBar.css'
import type { Recipe } from '../types'

interface SearchBarProps {
  recipes: Recipe[]
  onSelect: (id: string | null) => void
}

//recibe todas las recetas para buscat y una función onSelect que se ejecuta al seleccionar la receta 

function SearchBar({ recipes, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('') //texto que el usuario escribe

  const results = recipes.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))

  //recorre todas las recetas y devuelve las que contienen el texto excrito

  return (
    <div className="search-bar">
      <input className="search-bar__input" placeholder="Buscar receta..." value={query} onChange={(e) => setQuery(e.target.value)} /> {/*input para escribir la búsqueda, actualiza el estado query al cambiar */}
      {query && (
        <div className="search-bar__results">
          {results.length === 0 ? <p className="muted">Sin resultados</p> : results.map((r) => (
            <button key={r.id} className="search-bar__item" onClick={() => { onSelect(r.id); setQuery('') }}>{r.title}</button> //por cada receta que coincida, crea un boton con el título
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
