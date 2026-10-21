import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import pokedexJson from './data/pokedex-data.json'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <header id='main-title'>
        <h1>Melhor Pokedex de todas</h1>
      </header>
      <pre>{JSON.stringify(pokedexJson,null,2)}</pre>
      <div ></div>
    </>
  )
}

export default App
