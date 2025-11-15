import '../styles/ShowCard.css'
import { CiHeart, CiStar } from "react-icons/ci";

export default function ShowCard({ showData, onFavorite, isFavorite }) {

    const { name, image, id } = showData
    const imageUrl = image.medium

    const Icon = isFavorite ? CiStar : CiHeart;
    const buttonText = isFavorite ? "Quitar Favorito" : "Añadir Favorito";

    const handleCardClick = () => {

    };

    return (
        <div className='show-card' onClick={handleCardClick}>
            <img src={imageUrl} alt={name} className="show-image" />
            <div className='show-details'>
                <h1 className="show-name">{name}</h1>

                <button
                    className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
                    onClick={(e) => {
                        // Para que no suba al padre
                        e.stopPropagation()
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