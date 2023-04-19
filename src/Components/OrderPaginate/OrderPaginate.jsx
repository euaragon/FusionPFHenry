import { useState } from "react";
import { useSelector } from "react-redux";
import { orderByPrice } from "../../Redux/Actions";
import { useDispatch } from "react-redux";

export default function OrderPaginate(props) {
  const dispatch = useDispatch();

  var [currentPage, setCurrentPage] = useState(1);

  const allProducts = useSelector((state) => state.products);

  const prodPerPage = 6; // este estado local setea cuantas cartas entran por pagina
  //const indexLastProd = currentPage * prodPerPage;
  //const indexFirstProd = indexLastProd - prodPerPage;
  //const currentProd = allProducts.slice(indexFirstProd, indexLastProd);
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allProducts.length / prodPerPage); i++) {
    pageNumbers.push(i);
  }
   
  const paginado = (pageNumber) => {
    props.setCurrentPage(pageNumber); 
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginado(currentPage + 1);
      currentPage = currentPage + 1
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginado(currentPage - 1);
      currentPage = currentPage - 1
    }
  };

  const handleSelect = (e) => {
    dispatch(orderByPrice(e.target.value))
  }






  return (
    <div className="order-paginate">
      <h5>Tenemos {allProducts.length} zapatillas!</h5>
      <div className="ordenar">
        <h5>Ordenar Por</h5>
        <select defaultValue="Seleccione" onChange={(e) => handleSelect(e)}>
          <option disabled >Seleccione</option>
          <option value="Menor Precio">Menor Precio</option>
          <option value="Mayor Precio">Mayor Precio</option>
        </select>
      </div>

      <nav className="paginado">
   
    <ul>
        <li>
          <button onClick={handlePrevPage} >
          {"<<"}
          </button>
        </li>
      <h5>Pagina {currentPage} de {pageNumbers.length}</h5>
        <li>
          <button
            onClick={handleNextPage}
           
          >
            {">>"}
          </button>
        </li>
      </ul>
      </nav>
    </div>
  );
}
