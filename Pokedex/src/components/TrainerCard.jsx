import { useEffect, useRef } from 'react'
import { FaMedal } from 'react-icons/fa'

const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
const MAX_BADGES = 8

function TrainerCard({ trainer, highlighted, currentPokemonId, onSelectPokemon }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (highlighted) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlighted])

  return (
    <article ref={cardRef} className={`trainer-card ${highlighted ? 'highlighted' : ''}`}>
      <header className='trainer-card-header'>
        <div className='trainer-avatar'>{trainer.nome[0]}</div>
        <div>
          <h3>{trainer.nome}</h3>
          <span className='trainer-role'>{trainer.papel}</span>
        </div>
      </header>

      <div className='trainer-badges' title={`${trainer.insignias} insígnias`}>
        {Array.from({ length: MAX_BADGES }, (_, i) => (
          <FaMedal key={i} className={i < trainer.insignias ? 'earned' : ''} />
        ))}
        <span>{trainer.insignias}</span>
      </div>

      <ul className='trainer-pokemon'>
        {trainer.pokemon.map((p) => (
          <li key={p.id}>
            <button
              className={p.id === currentPokemonId ? 'current' : ''}
              onClick={() => onSelectPokemon(p.id)}
              title={`Ver ${p.nome}`}
            >
              <img src={`${SPRITE_URL}/${p.id}.png`} alt={p.nome} loading='lazy' />
              <span>{p.nome}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default TrainerCard
