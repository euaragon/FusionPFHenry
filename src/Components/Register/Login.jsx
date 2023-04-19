import Zapas from "../images/login-image.jpg";
import logo from "../images/logo.png";
import google from "../images/google.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./authContext";

import { loginUserGoogle, ingreso } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const { iniciarLogin, loginGoogle, resetearContraseña } = useAuth();

  const actualizarEstadouser = (evento) => {
    const { name, value } = evento.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const enviarDatos = async (evento) => {
    evento.preventDefault();
    setError("");
    try {
      const login = await iniciarLogin(user.email, user.password);
     
      await dispatch(ingreso(login.user.email));
      navigate("/");
    } catch (error) {
      console.log(error.code); //esto me muestra por consola el codigo del error, para poder cambiar el mensaje.
      if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("contraseña incorrecta");
      }
    }
  };

  const iniciarGoogle = async () => {
    try {
      const google = await loginGoogle();
      await dispatch(loginUserGoogle(google.user.email));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const recuperarContraseña = async () => {
    if (!user.email) return setError("Por favor coloca un email");
    try {
      await resetearContraseña(user.email);
      setError("Te mandamos un email para que reinicies tu password");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-landing">
      <div className="form">
        <NavLink to={"/"}>
          <img src={logo} alt="" />
        </NavLink>
        <h1>Que bueno volver a verte!</h1>
        {error && <p className="error">{error}</p>}
        <div>
          <form onSubmit={enviarDatos}>
            <div className="form-lab">
              <label htmlFor="">Email</label>
              <input
                onChange={actualizarEstadouser}
                type="email"
                name="email"
                id="email"
                placeholder="nombre@mail.com"
              />
              <label htmlFor="">Contraseña</label>
              <input
                onChange={actualizarEstadouser}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <br />
            <button type="submit">Login</button>
            <button onClick={recuperarContraseña} className="favs">
              Olvidé mi contraseña
            </button>
          </form>
          <button className="google-btn" onClick={iniciarGoogle}>
            <img src={google} width="200" alt="" />
          </button>
        </div>
        <div className="log-admin">
          <h6 className="ya-estas">Todavia no estas registrado?</h6>
          <NavLink to={"/register"}>
            <h6 className="ya-estas"> Registrate aca</h6>
          </NavLink>
        </div>
        <div className="log-admin">
          <h6>Sos Admin? </h6>
          <NavLink to={"/login-admin"}>
            <h6> Logueate aca</h6>
          </NavLink>
        </div>
      </div>
      <img className="zapas" src={Zapas} alt="" />
    </div>
  );
}
