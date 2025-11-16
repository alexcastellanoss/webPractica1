import './App.css'
import Buscador from './components/Buscador.jsx'
import Favoritos from './components/Favoritos.jsx'
import ShowCard from './components/ShowCard.jsx'
import Modal from './components/Modal.jsx'
import { useState, useEffect } from 'react'

// Función para obtener favoritos de localStorage al cargar la aplicación.
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

  // Lista de resultados de búsqueda.
  const [showData, setShowData] = useState([])

  // Texto que mete el usuario en el buscador.
  const [query, setQuery] = useState('')

  // Lista de favoritos, inicializada desde localStorage.
  const [favoritosList, setFavoritosList] = useState(getInitialFavs)

  // Objeto con la serie que se abre en el Modal.
  const [selectedShow, setSelectedShow] = useState(null)

  // Cada vez que favoritos cambian → guardamos en localStorage.
  useEffect(() => {
    localStorage.setItem("favorito", JSON.stringify(favoritosList));
  }, [favoritosList]);

  // Esta función se pasa al componente Buscador.
  // Cuando Buscador la llama, actualiza "query" en el padre.
  function handleSearch(newQuery) {
    setQuery(newQuery)
  }

  // Añadir o quitar favoritos.
  function handleFavorite(show) {
    const oldList = favoritosList;
    let newList;

    // Miramos si ya está en favoritos.
    let isFavorite = oldList.some(fav => fav.id === show.id)

    if (isFavorite) {
      // Quitar de favoritos.
      newList = oldList.filter(fav => fav.id !== show.id);
    }
    else {
      // Añadir a favoritos.
      const newFavorite = { id: show.id, name: show.name };
      newList = [...oldList, newFavorite];
    }

    setFavoritosList(newList);
  }

  // Abre el modal pidiendo información a la API.
  async function openModal(showId) {
    try {
      const resultado = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      const data = await resultado.json();
      setSelectedShow(data);
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  }

  // Cerrar Modal.
  function closeModal() {
    setSelectedShow(null);
  }

  // Cada vez que cambia "query" llamamos a la API.
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
              showData={item.show /*Datos de cada serie.*/}
              onFavorite={handleFavorite /*Función del padre que llama el hijo cuando se hace click en favoritos.*/}
              onShowDetail={openModal /*Abrir el modal desde el hijo.*/}
              isFavorite={favoritosList.some(fav => fav.id === item.show.id) /*Saber si está en favoritos o no.*/}
            />
          ))}
        </div>

      </div>
      <Favoritos favoritosList={favoritosList}></Favoritos>

      {/*Si hay una serie seleccionada se renderiza el componente Modal, sino no.*/}
      {selectedShow && (
        <Modal
          show={selectedShow} /*Datos de la serie a mostrar en el modal.*/
          onClose={closeModal}  /*Función para cerrar el modal.*/
        />
      )}
    </div>
  )
}