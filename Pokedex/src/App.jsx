import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaDice, FaMedal, FaMoon, FaSearch, FaSun, FaUsers } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdCatchingPokemon } from 'react-icons/md'
import TrainerList from './components/TrainerList'
import trainers from './data/trainers.json'
import pokedex from './data/pokedex-data.json'
import './App.css'

const TOTAL_POKEMON = pokedex.pokemon.length
const SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const STAT_NAMES = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Atq. Esp.',
  specialDefense: 'Def. Esp.',
  speed: 'Velocidade',
}

const TYPE_NAMES = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', grass: 'Planta',
  electric: 'Elétrico', ice: 'Gelo', fighting: 'Lutador', poison: 'Venenoso',
  ground: 'Terra', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio',
  steel: 'Aço', fairy: 'Fada',
}

function App() {
  const [pokemonId, setPokemonId] = useState(1)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [shiny, setShiny] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('pokedex')
  const [selectedTrainerId, setSelectedTrainerId] = useState(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.target.tagName === 'INPUT' || view !== 'pokedex') return
      if (e.key === 'ArrowLeft') goPrevious()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  function goTo(id) {
    setError(null)
    setPokemonId(id)
    setView('pokedex')
  }

  function toggleView() {
    setSelectedTrainerId(null)
    setView((v) => (v === 'pokedex' ? 'trainers' : 'pokedex'))
  }

  function openTrainer(trainerId) {
    setSelectedTrainerId(trainerId)
    setView('trainers')
  }

  function goPrevious() {
    goTo(pokemonId === 1 ? TOTAL_POKEMON : pokemonId - 1)
  }

  function goNext() {
    goTo(pokemonId === TOTAL_POKEMON ? 1 : pokemonId + 1)
  }

  function drawPokemon() {
    let id
    do {
      id = Math.floor(Math.random() * TOTAL_POKEMON) + 1
    } while (id === pokemonId)
    goTo(id)
  }

  function handleSearch(e) {
    e.preventDefault()
    const query = search.trim().toLowerCase()
    if (!query) return

    const number = Number(query)
    if (Number.isInteger(number)) {
      if (number >= 1 && number <= TOTAL_POKEMON) {
        goTo(number)
        setSearch('')
      } else {
        setError(`Digite um número entre 1 e ${TOTAL_POKEMON}`)
      }
      return
    }

    const found = pokedex.pokemon.find((p) => p.name.toLowerCase() === query)
    if (found) {
      goTo(found.id)
      setSearch('')
    } else {
      setError(`"${search}" não encontrado`)
    }
  }

  const pokemon = pokedex.pokemon.find((p) => p.id === pokemonId)
  const shinyPath = shiny ? '/shiny' : ''
  const artwork = `${SPRITE_URL}/other/official-artwork${shinyPath}/${pokemonId}.png`
  const pixelSprite = `${SPRITE_URL}${shinyPath}/${pokemonId}.png`
  const pixelSpriteBack = `${SPRITE_URL}/back${shinyPath}/${pokemonId}.png`
  const stats = Object.entries(pokemon.stats)
  const totalStats = stats.reduce((sum, [, value]) => sum + value, 0)
  const mainType = pokemon.types[0].name.toLowerCase()
  const pokemonTrainers = trainers.filter((t) => t.pokemon.some((p) => p.id === pokemonId))

  return (
    <main className={`main ${darkMode ? 'dark' : ''}`}>
      <div className='pokedex-box'>
        <header className='pokedex-box-header'>
          <div className='pokedex-title'>
            <span className='pokedex-light' />
            <div className='pokedex-leds'>
              <span className='led led-red' />
              <span className='led led-yellow' />
              <span className='led led-green' />
            </div>
            <h2 className='poke-title'>Pokédex</h2>
          </div>
          <div className='pokedex-box-header-elements'>
            <label className='dark-toggle' htmlFor='dark-mode' title='Alternar tema'>
              <input
                id='dark-mode'
                type='checkbox'
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className='toggle-track'>
                <span className='toggle-thumb'>{darkMode ? <FaMoon /> : <FaSun />}</span>
              </span>
            </label>
            <button className='draw-button' onClick={toggleView}>
              {view === 'pokedex'
                ? <><FaUsers /> <span className='button-label'>Treinadores</span></>
                : <><MdCatchingPokemon /> <span className='button-label'>Pokédex</span></>}
            </button>
            <button className='draw-button' onClick={drawPokemon}>
              <FaDice /> <span className='button-label'>Sortear</span>
            </button>
          </div>
        </header>

        <div className='pokedex-elements'>
          <header className='pokedex-elements-header'>
            <form className='search-form' onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Nome ou número'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type='submit' className='icon-button' aria-label='Buscar'>
                <FaSearch />
              </button>
            </form>
            <p>{pokemonId} de {TOTAL_POKEMON}</p>
            <div className='config'>
              <button
                className={`icon-button config-button ${showConfig ? 'open' : ''}`}
                onClick={() => setShowConfig((v) => !v)}
                aria-label='Configurações'
                title='Configurações'
              >
                <IoSettingsSharp />
              </button>
              {showConfig && (
                <div className='config-panel'>
                  <label htmlFor='shiny'>
                    <input
                      id='shiny'
                      type='checkbox'
                      checked={shiny}
                      onChange={(e) => setShiny(e.target.checked)}
                    />
                    Versão shiny
                  </label>
                </div>
              )}
            </div>
          </header>

          {error && (
            <div className='pokedex-error'>
              <span>{error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {view === 'trainers' ? (
            <TrainerList
              trainers={trainers}
              selectedTrainerId={selectedTrainerId}
              currentPokemonId={pokemonId}
              onSelectPokemon={goTo}
            />
          ) : (
            <div className='pokedex-content'>
              <aside className='pokedex-elements-images'>
                <div className={`artwork type-${mainType}`}>
                  <span className='poke-number'>
                    #{String(pokemon.id).padStart(3, '0')}
                  </span>
                  <img src={artwork} alt={pokemon.name} />
                </div>
                <div className='sprites'>
                  <img src={pixelSprite} alt={`${pokemon.name} de frente`} />
                  <img src={pixelSpriteBack} alt={`${pokemon.name} de costas`} />
                </div>
                <h1 className='poke-name'>{pokemon.name}</h1>
                <div className='types'>
                  {pokemon.types.map((type) => {
                    const key = type.name.toLowerCase()
                    return (
                      <span key={type.id} className={`type type-${key}`}>
                        {TYPE_NAMES[key] ?? type.name}
                      </span>
                    )
                  })}
                </div>
              </aside>

              <section className='pokedex-elements-info'>
                <h4>Atributos base</h4>
                <ul className='stats'>
                  {stats.map(([name, value]) => (
                    <li key={name}>
                      <span className='stat-name'>{STAT_NAMES[name]}</span>
                      <span className='stat-value'>{value}</span>
                      <div className='stat-bar'>
                        <div
                          className={`stat-fill type-${mainType}`}
                          style={{ width: `${Math.min(value / 180, 1) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <section className='total'>
                  <h3>Total</h3>
                  <h2>{totalStats}</h2>
                </section>
                <section className='trainers'>
                  <h4>Treinadores</h4>
                  {pokemonTrainers.length === 0 ? (
                    <p className='empty'>Nenhum treinador possui este Pokémon.</p>
                  ) : (
                    <ul>
                      {pokemonTrainers.map((trainer) => (
                        <li key={trainer.id}>
                          <button onClick={() => openTrainer(trainer.id)} title={`Ver ${trainer.nome}`}>
                            {trainer.nome}
                            <span className='trainer-chip-badges'>
                              <FaMedal /> {trainer.insignias}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </section>
            </div>
          )}
        </div>

        <div className='pokedex-footer'>
          <button onClick={goPrevious}><FaChevronLeft /> Anterior</button>
          <button onClick={goNext}>Próximo <FaChevronRight /></button>
        </div>
      </div>
    </main>
  )
}

export default App
