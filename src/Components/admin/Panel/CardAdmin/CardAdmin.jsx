import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  modifyProductPrice,
  modifyProductImage,
  modifyProductStock,
} from "../../../../Redux/Actions";
import Swal from "sweetalert2";
import UploadWidget from "../../../UploadWidget/UploadWidget";

export default function CardAdmin({ id, title, price, image, marca, stock }) {
  const dispatch = useDispatch();

  const [newPrice, setNewPrice] = useState(price);
  const [newStock, setNewStock] = useState(stock);
  const [newImage, setNewImage] = useState(image);
  const [showPopup, setShowPopup] = useState(false);

  function handleModifyPrice() {
    Swal.fire({
      title: "Ingrese el nuevo precio:",
      input: "text",
      inputValue: newPrice,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const inputPrice = parseFloat(result.value);
        if (isNaN(inputPrice)) {
          Swal.fire("Error", "Ingrese un valor numérico válido", "error");
        } else if (inputPrice === price) {
          Swal.fire("Advertencia", "El precio es el mismo", "warning");
        } else {
          dispatch(modifyProductPrice(id, inputPrice)).then(() => {
            setNewPrice(inputPrice);
            Swal.fire(
              "Precio modificado",
              `El precio ha sido actualizado a $${inputPrice.toLocaleString(
                "de-DE"
              )}.-`,
              "success"
            );
          });
        }
      }
    });
  }

  function handleModifyImage(url) {
    image = url;
    setNewImage(url);

    Swal.fire("Imagen modificada", `Se cambio la imagen`, "success");

    dispatch(modifyProductImage(id, image));
  }

  function handleModifyStock() {
    Swal.fire({
      title: "Ingrese el stock disponible:",
      input: "text",
      inputValue: newStock,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const inputStock = parseFloat(result.value);
        if (isNaN(inputStock)) {
          Swal.fire("Error", "Ingrese un valor numérico válido", "error");
        } else if (inputStock === price) {
          Swal.fire("Advertencia", "El precio es el mismo", "warning");
        } else {
          dispatch(modifyProductStock(id, inputStock)).then(() => {
            setNewStock(inputStock);
            Swal.fire(
              "Stock modificado",
              `El stock ha sido actualizado a ${inputStock} unidades`,
              "success"
            );
          });
        }
      }
    });
  }

  return (
    <div className="card admin-card">
      {showPopup && (
        <div className="image-popup">
          <UploadWidget onUpload={handleModifyImage} />
          <button onClick={() => setShowPopup(false)}>Cerrar</button>
        </div>
      )}
      <button onClick={() => setShowPopup(true)}>
        <img src={newImage} alt={title} />
      </button>
      <h4 className="marca">{marca.toUpperCase()}</h4>
      <h5>{title}</h5>
      <button onClick={handleModifyPrice}>
        <h5>${Number(newPrice).toLocaleString("de-DE")}.- </h5>
      </button>
      <button onClick={handleModifyStock}>
        <h5>Stock: {newStock}</h5>
      </button>
    </div>
  );
}
