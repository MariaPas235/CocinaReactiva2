import React, { useState } from 'react'
import './SearchBar.css'
import type { Recipe } from '../types'

type Props = {
  recipes: Recipe[]
  onSelect: (id: string | null) => void
}

const SearchBar: React.FC<Props> = ({ recipes, onSelect }) => {
  const [query, setQuery] = useState('')

  const results = recipes.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="searchbar">
      <input placeholder="Buscar receta..." value={query} onChange={(e) => setQuery(e.target.value)} />
      {query && (
        <div className="search-results">
          {results.length === 0 ? <p className="muted">Sin resultados</p> : results.map((r) => (
            <button key={r.id} className="search-item" onClick={() => { onSelect(r.id); setQuery('') }}>{r.title}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
