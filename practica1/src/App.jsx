import './App.css'
import Buscador from './components/Buscador.jsx'
import Favoritos from './components/Favoritos.jsx'
import ShowCard from './components/ShowCard.jsx'
import Modal from './components/Modal.jsx'
import { useState, useEffect } from 'react'

// Función para obtener favoritos de localStorage
const getInitialFavs = () => {
  try {
    const storedFavs = localStorage.getItem("favorito");
    return storedFavs ? JSON.parse(storedFavs) : [];
  } catch (e) {
    console.error("Error cargando los favoritos:", e);
    return [];
  }
};

export default function App() {

  const [showData, setShowData] = useState([])
  const [query, setQuery] = useState('')
  const [favoritosList, setFavoritosList] = useState(getInitialFavs)
  const [selectedShow, setSelectedShow] = useState(null)

  // Sincronizar favoritos con localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favorito", JSON.stringify(favoritosList));
  }, [favoritosList]);

  // Función de Búsqueda
  function handleSearch(newQuery) {
    setQuery(newQuery)
  }

  // Añadir o quitar favoritos
  function handleFavorite(show) {
    const oldList = favoritosList;
    let newList;

    let isFavorite = oldList.some(fav => fav.id === show.id)

    if (isFavorite) {
      newList = oldList.filter(fav => fav.id !== show.id);
    }
    else {
      const newFavorite = { id: show.id, name: show.name };
      newList = [...oldList, newFavorite];
    }

    setFavoritosList(newList);
  }

  // Funciones del Modal
  async function openModal(showId) {
    try {
      const resultado = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      const data = await resultado.json();
      setSelectedShow(data);
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  }

  // Cerrar Modal
  function closeModal() {
    setSelectedShow(null);
  }

  // Llamada a la API
  useEffect(() => {
    if (query.trim() === '') {
      setShowData([]);
      return;
    }

    const URL = `https://api.tvmaze.com/search/shows?q=${query}`

    fetch(URL)
      .then(result => result.json())
      .then(data => setShowData(data))
      .catch(error => console.error("Error accediendo a los datos:", error))

  }, [query]);

  return (
    <div className='main'>
      <div className='left-section'>
        <Buscador onSearch={handleSearch}></Buscador>
        <div className='results-container'>
          {showData.map((item) => (
            <ShowCard
              key={item.show.id}
              showData={item.show}
              onFavorite={handleFavorite}
              onShowDetail={openModal}
              isFavorite={favoritosList.some(fav => fav.id === item.show.id)}
            />
          ))}
        </div>

      </div>
      <Favoritos favoritosList={favoritosList}></Favoritos>

      {/*Si hay una serie seleccionada se renderiza el componente Modal, sino no*/}
      {selectedShow && (
        <Modal
          show={selectedShow}
          onClose={closeModal}
        />
      )}
    </div>
  )
}