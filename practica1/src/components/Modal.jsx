import '../styles/Modal.css'

export default function Modal({ show, onClose }) {

    // Si no hay imagen disponible para la serie no podemos acceder a "image.medium" por lo que ponemos cualquier valor, por ejemplo "Null".
    const imageUrl = show.image ? show.image.original : "Null";

    // Quitamos las etiquetas de los resúmenes.
    const resumenLimpio = show.summary ? show.summary.replace(/<[^>]*>/g, '') : 'No hay resumen disponible.';

    return (
        // Al hacer click fuera cerramos modal.
        <div className="modal" onClick={onClose}>
            {/* El div interno es el contenido, detenemos la propagación para que al hacer clic no cierre el modal */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{show.name}</h2>
                <img src={imageUrl} alt={show.name} className="modal-image" />
                <p>{resumenLimpio}</p>
                <button onClick={onClose} className="modal-close-button">Cerrar</button>
            </div>
        </div>
    );
}