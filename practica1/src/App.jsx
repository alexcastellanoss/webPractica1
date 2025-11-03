import './App.css'

import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState(""); // estado inicial vacío

  const handleChange = (e) => {
    setInputValue(e.target.value); // actualizamos el estado con lo que escribimos
  };

  return (
    <div>
      <input
        value={inputValue}    // el input muestra lo que hay en el estado
        onChange={handleChange} // cuando escribes, llamamos a handleChange
        placeholder="Escribe algo"
      />
      <p>Has escrito: {inputValue}</p>
    </div>
  );
}
