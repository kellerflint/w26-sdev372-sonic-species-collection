import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SpeciesDropdown from './components/Dropdown'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SpeciesDropdown />
    </>
  )
}

export default App
