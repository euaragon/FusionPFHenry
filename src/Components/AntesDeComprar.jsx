import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatosUser,
  getFav,
  getUserCart,
  mercadoPago,
} from "../Redux/Actions";


function AntesDeComprar() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);
  const loginUserId = loginUser.id;
  const item = useSelector((state) => state.item);
  const dataUser = useSelector((state) => state.dataUser);
  const descuento = useSelector((state) => state.promotions);

  const [datoModificado, setDatoModificado] = useState({
    number: "",
    address: "",
  });

  const totalPrice = item.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const [modificarTelefono, setModificarTelefono] = useState(false);
  const [modificarDireccion, setModificarDireccion] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  
  useEffect(() => {
    try {
      if (descuento?.discount) {
        //reviso si tengo un codigo y si ese codigo pertene a un descuento de promo
        const porcentaje = descuento.discount / 100;
        let iten = item.map((dato) => {
          return {
            id: dato.id,
            code: dato.code,
            title: dato.title,
            image: dato.image,
            price: dato.price - (dato.price * porcentaje),
            marca: dato.marca,
            size: dato.talle,
            qty: dato.qty,
          };
        });
        setPromoCode(iten);
      }
    } catch (error) {
      console.log("errorPromo", error);
    }
  }, [descuento, totalPrice]);

  useEffect(() => {
    const getCartAndFav = async () => {
      await dispatch(getUserCart(loginUserId));
      await dispatch(getFav(loginUserId));
      await dispatch(getDatosUser(loginUserId));
    };
    getCartAndFav();
  }, [dispatch, loginUserId]);

  const handlePhoneChange = (event) => {
    setModificarTelefono(true);
    setDatoModificado({ ...datoModificado, number: event.target.value });
  };

  const handleAddressChange = (event) => {
    setModificarDireccion(true);
    setDatoModificado({ ...datoModificado, address: event.target.value });
  };

  const handleModificarSubmitTelefono = (event) => {
    event.preventDefault();
    setModificarTelefono(false);
  };
  const handleModificarSubmitDireccion = (event) => {
    event.preventDefault();
    setModificarDireccion(false);
  };

  //para verificar que va a mandar items, si tengo promo manda promoCode, sino el item normal
  let items = descuento ? promoCode : item
  let promo = promoCode ? true : false
  let code = promoCode ? descuento.code : false
  let id = promoCode ? descuento.id : false

  const handleCompraClick = async () => {
    try {
      await dispatch(
        mercadoPago(items,{promo: promo, code: code, id: id }, {
          phone: {
            number: datoModificado.number
              ? parseInt(datoModificado.number)
              : dataUser.number,
          },
          address: {
            street_name: datoModificado.address
              ? datoModificado.address
              : dataUser.address,
          },
          email: loginUser.email,
          name: dataUser.name,
          surname: dataUser.last_name,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="centrar">
      <h1>RESUMEN DE TU COMPRA</h1>
      
      {items &&
        items.map((item) => (
          <div className="zapato-fav" key={item.code}>
            <img src={item.image} alt="zapato" />
            <div className="zapato-dataUser">
              <p>
                <strong>{item.marca.toUpperCase()}</strong>
                <br />
                {item.title}
              </p>
              <p>Talle: {item.talle}</p>
              <div className="sel-cant">
                <p>
                  Cantidad <b>{item.qty}</b>
                </p>
              </div>
            </div>
            <div className="zapato-precio">
              <h2>Precio</h2>
              <h2>${item.price.toLocaleString("de-De")}</h2>
            </div>
          
          </div>
        ))}
          <div className="margenes">
          <button className="mas-aire" onClick={handleCompraClick}>COMPRAR</button>
          </div>
      <h1> DATOS DE ENTREGA</h1>
      <h4>Nombre y Apellido: {`${dataUser.name} ${dataUser.last_name}`}</h4>
      <p>Email: {loginUser.email}</p>
      {modificarTelefono ? (
        <div>
          <label htmlFor="number">Nuevo número:</label>
          <input
            id="number"
            type="tel"
            name={datoModificado.number}
            onChange={handlePhoneChange}
          />
          <button onClick={handleModificarSubmitTelefono}>Guardar cambios</button>
        </div>
      ) : (
        <div>
          
          <button className="sin-relleno" onClick={() => setModificarTelefono(true)}><p className="sin-relleno">Teléfono: {datoModificado.number || dataUser.phone}</p></button>
        </div>
      )}
      {modificarDireccion ? (
        <div>
          <label htmlFor="address">Nueva dirección:</label>
          <input
            id="address"
            type="text"
            value={datoModificado.address}
            onChange={handleAddressChange}
          />
          <button onClick={handleModificarSubmitDireccion}>Guardar cambios</button>
        </div>
      ) : (
        <div>
         
          <button className="sin-relleno" onClick={() => setModificarDireccion(true)}> <p className="sin-relleno">Dirección: {datoModificado.address || dataUser.address}</p></button>
        </div>
      )}

    </div>
  );
}

export default AntesDeComprar;
