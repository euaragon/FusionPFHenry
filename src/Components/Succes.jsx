import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { crearOrdenDeCompra, getPromo, putPromo, statusMercadoPago } from "../Redux/Actions";
import success from "./images/success.jpg"

function Succes() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const compraId = params.get("collection_id");
  const dispatch = useDispatch();

  const datos = useSelector((state) => state.getMercadoPago);
  const datosCompra = useSelector((state) => state.postMercadoPago);
  const loginUserId = useSelector((state) => state.loginUser.id);
  const promotionId = datosCompra.metadata.id;
  const code = datosCompra.metadata.code;


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(statusMercadoPago(compraId));
      if(code) await dispatch(getPromo(code));
    };
    fetchData();
  }, [compraId, dispatch]);

  useEffect(() => {
    if (datos && datosCompra) {
      const orden = {
        address: datosCompra.payer.address.street_name,
        promotion: datosCompra.metadata.promo,
        payment: datos.payment_method,
        orderStatus: datos.status,
        total: datos.transaction_amount,
      };

      const mandarOreden = async () => {
         if(code) await dispatch(putPromo(promotionId, loginUserId))
        await dispatch(crearOrdenDeCompra(loginUserId, orden));
        localStorage.removeItem("mercadoPago")
      };

      mandarOreden();
    }
  }, [datos, datosCompra, dispatch, loginUserId]);

  return (
    <div className="relleno">
      <img src={success} alt="compra exitosa" />
      <h1>Gracias por tu compra!</h1>
      <h4>¡Te enviamos un correo con el detalle de tu pedido!</h4>
    </div>
  );
}

export default Succes;
