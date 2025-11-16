import '../styles/ShowCard.css'
import { CiHeart, CiStar } from "react-icons/ci";

export default function ShowCard({ showData, onFavorite, isFavorite, onShowDetail }) {

    // Sacamos los datos que nos da el padre.
    const { name, image, id } = showData
    // Si no hay imagen disponible para la serie no podemos acceder a "image.medium" por lo que ponemos cualquier valor, por ejemplo "Null".
    const imageUrl = image ? image.medium : "Null"

    const Icon = isFavorite ? CiStar : CiHeart;
    const buttonText = isFavorite ? "Quitar Favorito" : "Añadir Favorito";

    const handleCardClick = () => {
        if (onShowDetail) onShowDetail(id);
    };

    return (
        <div className='show-card' onClick={handleCardClick}>
            <img src={imageUrl} alt={name} className="show-image" />
            <div className='show-details'>
                <h1 className="show-name">{name}</h1>

                <button
                    className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
                    onClick={(e) => {
                        // Para que no abra el modal al pulsar "favoritos".
                        e.stopPropagation()
                        // Enviamos los datos al padre.
                        onFavorite(showData)
                    }}
                >
                    <Icon className="favorite-icon" />
                    {buttonText}
                </button>
            </div>
        </div>
    )
}