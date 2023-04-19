import logo from "../images/logo.png";
import corazon from "../images/cora-icon.png";
import carro from "../images/carro.png";
import usericon from "../images/user-icon-home.png"
import { NavLink, useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import {borrarToken, getUserCart, closeSession} from "../../Redux/Actions/index"
import swal from 'sweetalert';



export default function Navbar() {


const user = useSelector((state) => state.loginUser);
const lcdtmab = useSelector((state) => state.item.flat())
const lcdtmabFav = useSelector((state) => state.itemFav)
const dispatch = useDispatch();
const loginUserId = user.id;
const navigate = useNavigate()

const eliminarLocalStore = () => {
  swal("Hasta luego!", "Te esperamos cuando quieras!", "info");
  dispatch(borrarToken(), closeSession())
 setTimeout(() => {
  navigate("/");
  window.location.reload();
 }, 2000);
}

const handleGetUserCart = () => {
  // if (!lcdtmab || lcdtmab.length === 0) {
  //   alert("Todavía no hay productos en su carrito");
  //   return;
  // }
  dispatch(getUserCart(loginUserId));
};

  return (
    <div className="navbar">
      <NavLink to={"/"}>
        <img className="logo-nav" src={logo} alt="" />
      </NavLink>

      <Searchbar />

      
      {user && user.email ? (
        <div className="bienvenido">
          
          
           <p><b>BIENVENIDO!</b></p>
          <NavLink to="/userpanel"><p>{user.email}</p></NavLink>
          <button className="cerrar-sesion" onClick={eliminarLocalStore}>cerrar sesión</button>
        </div>
        
      ) : (
        <NavLink className="ingresa" to={"/register"}>
          Ingresa / <br /> Registrate <span>{">"}</span>
        </NavLink>
      )}
      <NavLink to="/userpanel"><img src={usericon} alt="user icon" /></NavLink>
      <NavLink to={"/userpanel"}>
        <img src={corazon} alt="" />
        {lcdtmabFav && lcdtmabFav.length > 0 && (
          <span className="cant-carro">{lcdtmabFav.length}</span>
        )}
      </NavLink>
      <NavLink onClick={handleGetUserCart} to={"/cart"}>
        <img src={carro} alt="" />
        {lcdtmab && lcdtmab.length > 0 && (
          <span className="cant-carro">{lcdtmab.length}</span>
        )}
      </NavLink>
       
      {user.rol === 'admin' && (
        <NavLink to="/admin">
          <button>Ver panel admin</button>
        </NavLink>) }


    </div>
  );
}