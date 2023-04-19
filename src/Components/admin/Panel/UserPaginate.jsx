import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserPaginate(props) {
  var [currentPage, setCurrentPage] = useState(1);

  const usuarios = useSelector((state) => state.users);

  const prodPerPage = 2; 
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuarios.length / prodPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginado = (pageNumber) => {
    props.setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginado(currentPage + 1);
      currentPage = currentPage + 1;
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginado(currentPage - 1);
      currentPage = currentPage - 1;
    }
  };

  return (
    <div className="order-paginate">
      <nav className="paginado">
        <ul>
          <li>
            <button className="blanco" onClick={handlePrevPage}>
              {"<<"}
            </button>
          </li>
          <h5>
            Pagina {currentPage} de {pageNumbers.length}
          </h5>
          <li>
            <button className="blanco" onClick={handleNextPage}>
              {">>"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
