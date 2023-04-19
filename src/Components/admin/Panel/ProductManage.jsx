import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, postProducts } from "../../../Redux/Actions";
import CardAdmin from "./CardAdmin/CardAdmin";
import UploadWidget from "../../UploadWidget/UploadWidget";
import OrderPaginate from "../../OrderPaginate/OrderPaginate";
import ExportExcel from "react-export-excel";
import Swal from "sweetalert2";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelFile.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelFile.ExcelColumn;

export default function ProductManage() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [showPopup, setShowPopup] = useState(false);

  const [productData, setProductData] = useState({
    title: "",
    code: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    productState:"",
    marca: "",
    talle: "",
    color: "",
    category: "",
  });

  function onUpload(url) {
    setProductData({ ...productData, image: url });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(postProducts(productData));
    setShowPopup(false);
    Swal.fire("Producto agregado correctamente","ya se puede mostrar en la web","success")
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const prodPerPage = 6;
  const indexLastProd = currentPage * prodPerPage;
  const indexFirstProd = indexLastProd - prodPerPage;

  let currentProd = allProducts;

  currentProd = currentProd.slice(indexFirstProd, indexLastProd);

  return (
    <div className="admin-content blanco">
      <h1>PRODUCTOS</h1>
      <button onClick={() => setShowPopup(true)}>(+) AGREGAR PRODUCTO</button>
      <OrderPaginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {allProducts && (
        <ExcelFile
          element={<button>Exportar a Excel</button>}
          filename="Productos"
        >
          <ExcelSheet data={allProducts} name="Productos">
            <ExcelColumn label="title" value={(col) => col.title} />
            <ExcelColumn label="price" value={(col) => col.price} />
            <ExcelColumn label="stock" value={(col) => col.stock} />
            <ExcelColumn
              label="marca"
              value={(col) => col.MarcaProducts[0].name}
            />
          </ExcelSheet>
        </ExcelFile>
      )}
      <div className="content-prod">
        {currentProd?.map((p) => {
          return (
            <CardAdmin
              currentPage={currentPage}
              key={p.id}
              id={p.id}
              title={p.title}
              stock={p.stock}
              price={p.price}
              image={p.image}
              marca={p.MarcaProducts[0].name}
            />
          );
        })}
      </div>
      {showPopup && (
        <div className="popup prod-popup">
          <h1>CARGÁ TU NUEVO PRODUCTO!</h1>
          <input type="text" placeholder="Marca" name="marca" onChange={handleChange} />
          <input type="text" placeholder="Título" name="title" onChange={handleChange} />
          <input type="text" placeholder="Código del artículo" name="code" onChange={handleChange} />
          <input type="text" placeholder="Precio (solo numero)" name="price" onChange={handleChange} />
          <div>
            <small>Stock </small>&nbsp;&nbsp;
            <input className="number" type="number" name="stock" onChange={handleChange} />
          </div>
          <input type="text" placeholder="Talles (separados por coma)" name="talle" onChange={handleChange} />
          <input type="text" placeholder="Estado" name="productState" onChange={handleChange} />
          <input type="text" placeholder="Categoría" name="category" onChange={handleChange} />
          <input type="text" placeholder="Color" name="color" onChange={handleChange} />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            placeholder="Descripción"
            onChange={handleChange}
          ></textarea>
          <UploadWidget onUpload={onUpload} />
          <button onClick={handleSubmit}>Enviar</button>
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}
