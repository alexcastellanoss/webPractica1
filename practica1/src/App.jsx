import './App.css'
import Buscador from './components/Buscador.jsx'
import Favoritos from './components/Favoritos.jsx'

export default function App() {
  return (
    <div className='main'>
      <div className='header'>
        <Buscador></Buscador>
      </div>
      <Favoritos></Favoritos>
    </div>
  )
}
