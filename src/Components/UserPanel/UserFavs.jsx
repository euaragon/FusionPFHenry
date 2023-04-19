import { useDispatch, useSelector } from "react-redux";
import fav from "../images/cora.png";
import { deletFav, getFav } from "../../Redux/Actions";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert";

export default function UserFavs() {
  const itemFav = useSelector((state) => state.itemFav);
  const userId = useSelector((state) => state.loginUser.id);
  const dispatch = useDispatch();

  const deleteOneFav = async (userId, prodId) => {
    await dispatch(deletFav(userId, prodId));
    await dispatch(getFav(userId));
    Swal("Producto eliminado", "","success")
  };

  return (
    <div className="user-content">
      <div className="user-data">
        <img src={fav} alt="footwear-fusion" />
        <div className="data-list">
          <h6>MIS FAVORITOS</h6>

          {itemFav && itemFav.length > 0 ? (
            itemFav.map((e) => (
              <div className="zapato-fav" key={e.id}>
                 <NavLink to={`/product/${e.id}`}>
                <img src={e.image} alt={e.title} />
                 </NavLink>
                <div className="zapato-datos-fav">
                  <p>
                  <NavLink  to={`/product/${e.id}`}>
                    <strong>{e.marca.toUpperCase()}</strong>
                    </NavLink>
                    <br />
                    {e.title}
                  </p>
                  {/* <small>Código del artículo: {e.code}</small> */}
                  <p>Precio ${e.price.toLocaleString("de-De")}</p>
                </div>
                <div>
                  <div className="selecciones">
                    {/* <p>Cantidad: {e.qty}</p>
                   <p>Talle: {e.qty}</p> */}
                  </div>
                  <br />
                  <div className="botonera">
                    <button
                      className="favs"
                      onClick={() => deleteOneFav(userId, e.id)}
                    >
                      Eliminar producto
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="zapato-fav">
              <h1>TODAVIA NO HAY PRODUCTOS</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}