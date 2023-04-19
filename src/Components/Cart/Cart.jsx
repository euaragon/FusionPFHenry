import { NavLink, useNavigate } from "react-router-dom";
import promos from "../images/promos.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  getDatosUser,
  getFav,
  getPromo,
  getUserCart,
} from "../../Redux/Actions";
import swal from "sweetalert";
import { useEffect, useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item);
  const loginUserId = useSelector((state) => state.loginUser.id);
  const dataUser = useSelector((state) => state.dataUser);
  const descuento = useSelector((state) => state.promotions);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("a ver desde el lado del cart", item, loginUserId);

  const totalPrice = item.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const [promoCode, setPromoCode] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [loginPromo, setLoginPromo] = useState(false);

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeSubmit = async () => {
    if (promoCode) {
      setLoginPromo(true);
      try {
        await dispatch(getPromo(promoCode));
      } catch (error) {
        //para mostrar los error que llegan del back
        let errorMessage = "Ocurrió un error";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const { error: errorCode } = error.response.data;
          switch (errorCode) {
            case "ERR_BAD_REQUEST":
              errorMessage = "Código de promoción inválido";
              break;
            default:
              errorMessage = "Código de promoción inhabilitado";
              break;
          }
        }
        swal("Error", errorMessage, "error");
        console.log("error", error.code);
      }
      setLoginPromo(false);
    }
  };

  useEffect(() => {
    try {
      if (promoCode && descuento?.discount) {
        //reviso si tengo un codigo y si ese codigo pertene a un descuento de promo
        const porcentaje = descuento.discount / 100;
        const newPrice = totalPrice - totalPrice * porcentaje;
        setNewPrice(newPrice);
      }
    } catch (error) {
      console.log("errorPromo", error);
    }
  }, [descuento, totalPrice]);

  useEffect(() => {
    const getCarFav = async () => {
      await dispatch(getDatosUser(loginUserId));
      await dispatch(getUserCart(loginUserId));
      await dispatch(getFav(loginUserId));
      localStorage.removeItem("mercadoPago");
    };
    getCarFav();
  }, [dispatch]);

  const handleDeleteFromCart = async (compraProductId) => {
    if (!token) {
      swal("Error", "Logueate para continuar!", "error");
      return navigate("/login");
    }
    await dispatch(deleteFromCart(compraProductId));
    await dispatch(getUserCart(loginUserId));
    swal("Producto eliminado", "Se elmininó del carrito", "success");
  };

  const handleSubmitUser = () => {
    if (!dataUser) {
      navigate("/userpanel");
      return swal(
        "Error",
        "Completa tus datos para terminar de comprar!",
        "error"
      );
    }
    return navigate("/terminarCompra");
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <div>
          <h3>CARRITO DE COMPRAS</h3>
          <p>{item.length} PRODUCTOS</p>
        </div>

        <button onClick={handleSubmitUser}>TERMINAR COMPRAR</button>
      </div>

      {item && item.length > 0 ? (
        item.map((e) => (
          <div className="zapato" key={e.code}>
            <img src={e.image} alt="zapato" />
            <div className="zapato-datos">
              <p>
                <strong>{e.marca.toUpperCase()}</strong>
                <br />
                {e.title}
              </p>
              <span>Código del artículo: {e.code}</span>
              <p>Talle: {e.talle}</p>
              <div className="sel-cant">
                <p>
                  Cantidad <b>{e.qty}</b>
                </p>
              </div>
              <button
                className="eliminar"
                onClick={() => handleDeleteFromCart(e.compraProductId)}
              >
                <small>eliminar</small>
              </button>
            </div>
            <div className="zapato-precio">
              <h2>Precio</h2>
              <h2>${e.price.toLocaleString("de-De")}</h2>
            </div>
          </div>
        ))
      ) : (
        <div className="zapato">
          <h1>TODAVIA NO HAY PRODUCTOS</h1>
        </div>
      )}

      <div className="cart-footer">
        <img src={promos} alt="" />
        <div className="ahora-si">
          {loginPromo ? (
            "buscando promo..."
          ) : (
            <h1>
              Total: $
              {newPrice
                ? newPrice.toLocaleString("de-De")
                : totalPrice.toLocaleString("de-De")}
            </h1>
          )}

          <button onClick={handleSubmitUser}>TERMINAR COMPRAR</button>

          <div className="centrar zapato-fav column">
            <label htmlFor="promoCode">¿Tenes un código promocional?</label>
            <input
              id="promoCode"
              type="text"
              name="code"
              onChange={handlePromoCodeChange}
            />
            <button onClick={handlePromoCodeSubmit}>Agregar código</button>
          </div>

          <NavLink to={"/"}>
            <button className="favs">Continuar comprando...</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
