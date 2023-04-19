import { getProductsByName, getUserByName } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState();

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getProductsByName(name.toLowerCase().trim())); //lo pasamos a minusculas y elminiamos los espacios en blanco
    dispatch(getUserByName(name.toLowerCase().trim()));
    }

    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    }

  return (
    <div className="searchbar">
      <input
        value={name}
        onChange={(e) => handleInputChange(e)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Buscá tus zapas!"
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
