import '../styles/Buscador.css'
import { IoSearch } from "react-icons/io5"
import { useState } from 'react'

export default function Buscador({ onSearch }) {

    const [query, setQuery] = useState(' ')

    function handleSubmit(e) {
        e.preventDefault()
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
