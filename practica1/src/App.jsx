import './App.css'
import Buscador from './components/Buscador.jsx'
import Favoritos from './components/Favoritos.jsx'

export default function App() {
  return (
    <div className='main'>
      <Buscador></Buscador>

      <Favoritos></Favoritos>
    </div>
  )
}
