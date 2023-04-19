import logo from "../../images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert"
import { useDispatch } from "react-redux";
import {  ingreso } from "../../../Redux/Actions";
import { useAuth } from "../../Register/authContext";


export default function LoginAdmin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const actualizarEstadouser = (evento) => {
    const { name, value } = evento.target;
    setUser({
      ...user,
      [name]: value,
    });
  };



  const { iniciarLogin } = useAuth();

  const enviarDatos = async (evento) => {
    evento.preventDefault();
    try {
      const login = await iniciarLogin(user.email, user.password);
      await dispatch(ingreso(login.user.email));
       return navigate("/admin");
    } catch (error) {
      console.log(error.code); //esto me muestra por consola el codigo del error, para poder cambiar el mensaje.
      if (error.code === "auth/user-not-found") {
        swal("Error","Usuario no registrado","error");
      }
      if (error.code === "auth/wrong-password") {
        swal("Error","contraseña incorrecta","error");
      }
    }
  };

  return (
    <div className="login-admin">
      <img src={logo} alt="" />
      <h1>PORTAL DEL ADMINISTRADOR</h1>

      <form className="form-admin" onSubmit={enviarDatos}>
        <div className="form-lab">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="nombre@mail.com"
            onChange={actualizarEstadouser}
          />
          <label htmlFor="">Contraseña</label>
          <input type="password" name="password" id="password" onChange={actualizarEstadouser} />
        </div>
        <div></div>

        <button type="submit">Entrar</button>

      </form>
    </div>
  );
}

