import '../styles/Buscador.css'
import { IoSearch } from "react-icons/io5"
import { useState } from 'react'

export default function Buscador({ onSearch }) {

    // Lo que el usuario escribe.
    const [query, setQuery] = useState('')

    // Cuando el usuario envía el formulario.
    function handleSubmit(e) {
        e.preventDefault()
        // Llamamos al padre y le pasamos lo que el usuario ha escrito.
        onSearch(query)
    }

    return (
        <form className='form-buscador' onSubmit={handleSubmit}>
            <input
                id='input'
                className='input-buscador'
                type='text'
                placeholder='Buscar...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className='button' type='submit'>
                <IoSearch id='icono' />
            </button>
        </form>
    )
}
