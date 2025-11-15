import './App.css'
import Buscador from './components/Buscador.jsx'
import Favoritos from './components/Favoritos.jsx'
import ShowCard from './components/ShowCard.jsx'
import Modal from './components/Modal.jsx'
import { useState, useEffect } from 'react'

export default function App() {

  const [query, setQuery] = useState('')
  const [favoritosList, setFavoritosList] = useState(getInitialFavs)

  // Sincronizar favoritos con localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritosList));
  }, [favoritosList]);

  // Función de Búsqueda
  function handleSearch(newQuery) {
    setQuery(newQuery)
  }



  return (
    <div className='main'>
      <div className='left-section'>
        <Buscador onSearch={handleSearch}></Buscador>
        <div className='results-container'>
          <ShowCard></ShowCard>
        </div>

      </div>
      <Favoritos favoritosList={favoritosList}></Favoritos>
      <Modal></Modal>
    </div>
  )
}