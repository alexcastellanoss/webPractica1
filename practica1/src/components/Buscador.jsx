import '../styles/Buscador.css'
import { IoSearch } from "react-icons/io5";


export default function Buscador() {

    return (
        <form className='form-buscador'>
            <input
                id='input'
                className='input-buscador'
                type='text'
                placeholder='Buscar..'
            />
            <button className='button' type='submit'>
                <IoSearch id='icono' />
            </button>
        </form>
    )
}
