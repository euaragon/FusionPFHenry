import "./App.css";

import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register";
import Login from "./Components/Register/Login";
import LoginAdmin from "./Components/admin/LoginAdmin/LoginAdmin";
import Navbar from "./Components/NavBar/Navbar.jsx";
import Categories from "./Components/Categories/Categories";
import Footer from "./Components/Footer/Footer";
import Detail from "./Components/Detail/Detail";
import DarkMode from "./Components/DarkMode/DarkMode";
import Whatsapp from "./Components/whatsapp/whatsapp";
import Cart from "./Components/Cart/Cart";
import UserPanel from "./Components/UserPanel/UserPanel";
import AdminPanel from "./Components/admin/Panel/AdminPanel";
import { useState, useEffect } from "react";
import { AuthProvider } from "./Components/Register/authContext";
import swal from "sweetalert";
import AntesDeComprar from "./Components/AntesDeComprar";
import Succes from "./Components/Succes";
import Failure from "./Components/Failure";
import ProtecAdmin from "./Components/admin/LoginAdmin/ProtecAdmin";
import ProtectLogin from "./Components/Register/ProtectLogin";
import UserBlocked from "./Components/UserBlocked.jsx";

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationDate");

  useEffect(() => {
    if (token && new Date(expirationDate) <= new Date()) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginUser");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("mercadoPago");
      swal(
        "¡Volvé a loguearte!",
        "Tus credenciales expiraron ",
        "info"
      );
      navigate("/login");
      window.location.reload()
    }
  }, [token, expirationDate, navigate]);

  const isAdminDetail = location.pathname.includes("/admin/");
  
  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      {location.pathname !== "/login" &&
        location.pathname !== "/login-admin" &&
        location.pathname !== "/user-blocked" &&
        location.pathname !== "/admin" &&
        !isAdminDetail && // No renderizar navbar, categories, darkmode, whatsapp y footer en la página de detalle de administrador
        location.pathname !== "/register" && (
          <>
            <Navbar />
            <Categories />
          </>
        )}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/user-blocked" element={ <UserBlocked /> }/>
          <Route path="/cart" element={<ProtectLogin><Cart /></ProtectLogin>} />
          <Route path="/userpanel" element={<ProtectLogin><UserPanel /></ProtectLogin>} />
          <Route path="/product/:prodId" element={<ProtectLogin><Detail /></ProtectLogin>} />
          <Route exact path="/admin" element={<ProtecAdmin> <AdminPanel /> </ProtecAdmin> } />
          {/* para mercadopago */}
          <Route path="/terminarCompra" element = {<ProtectLogin><AntesDeComprar /></ProtectLogin>} />
          <Route path="/success" element ={<ProtectLogin><Succes /></ProtectLogin>} />
          <Route path="/failure" element={ <ProtectLogin><Failure /></ProtectLogin> }/>
          
        </Routes>
        {location.pathname !== "/login" &&
          location.pathname !== "/login-admin" &&
          location.pathname !== "/user-blocked" &&
          location.pathname !== "/admin" &&
          !isAdminDetail && // No renderizar darkmode, whatsapp y footer en la página de detalle de administrador
          location.pathname !== "/register" && (
            <>
              <DarkMode toggleDarkMode={toggleDarkMode} />
              <Whatsapp />
              <Footer />
            </>
          )}
      </AuthProvider>
    </div>
  );
}

export default App;