import '../styles/Favoritos.css'

export default function Favoritos({ favoritosList }) {
    return (
        <div className="favoritos">
            <b>Favoritos ({favoritosList.length}):</b>
            <ul className="favoritos-list">
                {favoritosList.map(fav => (
                    <li key={fav.id}>- {fav.name}</li>
                ))}
            </ul>
        </div>
    )
}