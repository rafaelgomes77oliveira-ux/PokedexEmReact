import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import TrainerCard from './TrainerCard'
import './Trainers.css'

function TrainerList({ trainers, selectedTrainerId, currentPokemonId, onSelectPokemon }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('nome')

  const query = search.trim().toLowerCase()
  const visibleTrainers = trainers
    .filter((trainer) =>
      trainer.nome.toLowerCase().includes(query) ||
      trainer.pokemon.some((p) => p.nome.toLowerCase().includes(query)),
    )
    .toSorted((a, b) =>
      sortBy === 'insignias'
        ? b.insignias - a.insignias
        : a.nome.localeCompare(b.nome),
    )

  return (
    <div className='trainer-view'>
      <div className='trainer-toolbar'>
        <label className='trainer-search'>
          <FaSearch />
          <input
            type='text'
            placeholder='Buscar treinador ou Pokémon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='nome'>Ordenar por nome</option>
          <option value='insignias'>Ordenar por insígnias</option>
        </select>
      </div>

      {visibleTrainers.length === 0 ? (
        <p className='empty trainer-empty'>Nenhum treinador encontrado.</p>
      ) : (
        <div className='trainer-grid'>
          {visibleTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              highlighted={trainer.id === selectedTrainerId}
              currentPokemonId={currentPokemonId}
              onSelectPokemon={onSelectPokemon}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TrainerList
