import React from "react";
import { NavLink } from "react-router-dom";

function Failure() {

  return (
    <div className="relleno">
      <h1>Falló la Compra</h1>
      <br />
      <h4>Algó pasó que no pudimos registrar tu pago</h4>
      <NavLink to={"/terminarCompra"}>
        <button className="favs">Volver a tu compra</button>
      </NavLink>
    </div>
  )
}


export default Failure;
