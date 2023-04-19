import { useEffect, useState } from "react";
import {
  getBrand,
  filterByBrand,
  getSize,
  filterBySize,
  getPrice,
  priceRangeSelector,
  getProducts,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";

export default function Filters() {
  const dispatch = useDispatch();

  const allBrands = useSelector((state) => state.brands);
  const allSizes = useSelector((state) => state.sizes);
  const allPrices = useSelector((state) => state.prices);

  const minPrice = allPrices ? allPrices[0] : 0;
  const maxPrice = allPrices ? allPrices[allPrices.length - 1] : 0;

  const [value, setValue] = useState([minPrice, maxPrice]);

  function valuetext(value) {
    return `$${value}`;
  }

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSize());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPrice());
  }, [dispatch]);

    const [searchBrand, setSearchBrand] = useState("");
  const [searchSize, setSearchSize] = useState("");

  const handleSearchBrand = (e) => {
    setSearchBrand(e.target.value);
  };
  const handleSearchSize = (e) => {
    setSearchSize(e.target.value);
  };

  const filteredBrands = allBrands?.filter((brand) =>
    brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const filteredSizes = allSizes?.filter((size) =>
    size.toLowerCase().includes(searchSize.toLowerCase())
  );

  const handleBrandFilter = (e) => {
    if (e.target.checked) {
      dispatch(filterByBrand(e.target.value));
    } else {
      dispatch(filterByBrand(""));
    }
  };

  const handleSizeFilter = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      dispatch(filterBySize(value));
    } else {
      dispatch(filterBySize(""));
    }
  };

  /* esto es parte del slider de precios  */

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRangeSelector = () => {
    dispatch(priceRangeSelector({ minPrice: value[0], maxPrice: value[1] }));
  };

  const valueLabelFormat = (value) => {
    return `$${value}`;
  };

  /* esto es parte del slider de precios  */

  const fetchProducts = () => {
    window.location.reload();
  };

  const handleBorrarFiltros = async () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    await dispatch(filterByBrand(""));
    await dispatch(filterBySize(""));

    fetchProducts(); 
  };

  useEffect(() => {
    dispatch(filterByBrand(searchBrand));
  }, [searchBrand, dispatch]);

  useEffect(() => {
    dispatch(filterBySize(searchSize));
  }, [searchSize, dispatch]);


  

  return (
    <div className="filtros">
      <div className="filtro-adentro">
        <h3>MARCA</h3>
        <input
          type="text"
          placeholder="Buscar por marca..."
          value={searchBrand}
          onChange={handleSearchBrand}
        />
        <ul>
          {filteredBrands?.map((marca) => (
            <li key={marca}>
              <input
                id={marca}
                type="checkbox"
                value={marca}
                onClick={handleBrandFilter}
              />
              {"    "}
              {marca}
            </li>
          ))}
        </ul>
        {/* <button onClick={handleBrandFilter}>APLICAR</button> */}
      </div>

      <div className="filtro-adentro">
        <h3>TALLE</h3>
        <input
          type="text"
          placeholder="Buscar por talle..."
          value={searchSize}
          onChange={handleSearchSize}
        />
        <ul>
          {filteredSizes?.map((talle) => (
            <li key={talle}>
              <input
                id={talle}
                className="cb"
                type="checkbox"
                value={talle}
                onClick={handleSizeFilter}
              />
              {"    "}
              {talle}
            </li>
          ))}
        </ul>
        {/* <button onClick={handleSizeFilter}>APLICAR</button> */}
      </div>

      <div className="filtro-adentro">
        <h3>RANGO DE PRECIOS</h3>
        <Slider
          className="precios"
          step={1000}
          getAriaLabel={() => "Rango de Precio"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          min={minPrice}
          max={maxPrice}
        />
        <button onClick={(e) => handleRangeSelector(e)}>APLICAR</button>

        <button onClick={(e) => handleBorrarFiltros(e)}>BORRAR FILTROS</button>

      </div>
    </div>
  );
}
