import logo from "../../images/logo.png";
import usericon from "../../images/admin-user-icon.png";
import prodicon from "../../images/admin-prod-icon.png";
import salesicon from "../../images/admin-sales-icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserManage from "./UserManage";
import ProductManage from "./ProductManage";
import SalesManage from "./SalesManage";
import { useSelector } from "react-redux";
import Searchbar from "../../Searchbar/Searchbar";


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("account");
  const [showNovedades, setShowNovedades] = useState(true);
  const user = useSelector((state) => state.loginUser);

  function handleTabClick(tabName) {
    setActiveTab(tabName);
    setShowNovedades(false);
  }


  return (
    <div className="admin-panel">
      <div className="saludo-admin">
        <h5>{user ? `Bienvenido, ${user.email}` : "Bienvenido, Pepe Hongo"}</h5>
        <div className="admin-buscador">
          
          <Searchbar />
          
        </div>
        <div></div>
      </div>
      <div className="admin-menu">
        <Link to="/">
          <img width="150" src={logo} alt="Footwear Fusion" />
        </Link>
        <br />
        <h1>PORTAL DEL ADMINISTRADOR</h1>
        <br />
        <button
          className={activeTab === "users" ? "admin-active" : ""}
          onClick={() => handleTabClick("users")}
        >
          <img width="60" src={usericon} alt="user icon" />
          <h5>USUARIOS</h5>
        </button>
        <button
          className={activeTab === "products" ? "admin-active" : ""}
          onClick={() => handleTabClick("products")}
        >
          <img width="60" src={prodicon} alt="user icon" />
          <h5>PRODUCTOS</h5>
        </button>
        <button
          className={activeTab === "sales" ? "admin-active" : ""}
          onClick={() => handleTabClick("sales")}
        >
          <img width="60" src={salesicon} alt="user icon" />
          <h5>VENTAS</h5>
        </button>
      </div>
      {showNovedades && (
        <div className="detail-admin">
          <h1 className="novedades">NOVEDADES</h1>
          <br />
          <div>
          {/* <input type="text" value={novedades} onChange={handleNovedadesChange} />
          <button className="enviar" onClick={handleAgregarNovedad}>Agregar Novedad</button> */}
          </div>
         
          {/* <p><h4>01/05/2023</h4>{novedades}</p> */}
          <p>
            <h4>01/05/2023</h4>Celebremos el Día del Trabajo! Ofrecemos un
            descuento del 20% en todas las botas y botines. ¡Recuerda mencionar
            esta oferta a todos los clientes que busquen estas categorías
          </p>

          <p>
            <h4>10/03/2023</h4>¡Acaban de llegar las zapatillas deportivas Nike
            Air Max 2023 en todas las tallas y colores! ¡Asegúrate de informar a
            los clientes sobre esta nueva llegada y ayudarlos a encontrar el par
            perfecto!
          </p>

          <p>
            <h4>01/02/2023</h4>¿Quieres aumentar tus ventas? Prueba a combinar
            las zapatillas de running con la ropa deportiva adecuada, o
            recomienda una plantilla de gel para aquellos clientes que busquen
            comodidad. También puedes ofrecer la segunda unidad con un descuento
            especial.
          </p>

          <p>
            <h4>20/01/2023</h4>Este sábado, organizaremos una demostración en
            vivo de la marca de zapatos ecologicos X, y los primeros 10 clientes
            que compren un par recibirán una bolsa ecológica de regalo.
            ¡Asegúrate de estar preparado para el evento y dar una cálida
            bienvenida a los clientes!
          </p>

          <p>
            <h4>20/05/2020</h4>Recordatorio: Nuestra política de devoluciones
            indica que se aceptarán devoluciones dentro de los primeros 30 días
            de la compra, siempre y cuando el producto esté en condiciones de
            venta y se presente el recibo de compra. También, se debe verificar
            el cumplimiento del protocolo de seguridad y uso de cubrebocas para
            evitar contagios por COVID-19.
          </p>
        </div>
      )}
      {activeTab === "users" && <UserManage />}
      {activeTab === "products" && <ProductManage />}
      {activeTab === "sales" && <SalesManage />}
    </div>
  );
}
