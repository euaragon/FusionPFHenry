import Zapas from "../images/login-image.jpg";
import logo from "../images/logo.png";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { correoRegistroNewsletter, registros } from "../../Redux/Actions/index";
import { html } from "./emailRegister";
import Swal from "sweetalert2";

export default function Register() {
  
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState({
    email: ""
  });

  const [error, setError] = useState()

  const { registrarUserFirebase } = useAuth();


  const actualizarEstadouser = (evento) => {
    const { name, value } = evento.target;
    setUser({
      ...user,
      [name]: value,
    });
    setEmail({
      ...email,
      [name]: value
    });
  };

  const correo = {
    email: email.email, 
    subject:"¡Tus próximas zapatillas están acá!",
    html: html
}
  

  const enviarDatos = async (evento) => {
    evento.preventDefault();
    setError("");
    try {
      const login = await registrarUserFirebase(user.email, user.password)
      await dispatch(registros(login.user.email))
      navigate("/")
      Swal.fire("Ya estas registrado!", "Vas a recibir un correo de confirmación","success")
      await dispatch(correoRegistroNewsletter(correo))
    } catch (error) {
      console.log(error.code);//esto me muestra por consola el codigo del error, para poder cambiar el mensaje.
      if(error.code === "auth/invalid-email"){
        setError("correo invalido")
        Swal.fire("Correo invalido", "No pudimos registrarte","error")
      }
      if(error.code === "auth/weak-password"){
        setError("la contraseña debe contener 6 caracteres")
        Swal.fire("Contraseña invalida", "La contraseña debe tener al menos 6 caracteres","error")
      }
      if(error.code === "auth/email-already-in-use"){
        setError("este correo ya se encuentra registrado")
        Swal.fire("Correo invalido", "Este correo ya existe","error")
      }
    }
    
  }
  return (
    <div className="register-landing">
      <div className="form">
        <NavLink to={"/"}>
          <img src={logo} alt="" />
        </NavLink>
        <h1>Registrate! Tus próximas zapatillas están acá!</h1>
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
            <button>Enviar</button>
          
          </form>
          
         
        </div>
        <div className="log-admin">
          <h6 className="ya-estas">Ya estas registrado?</h6>
          <NavLink to={"/login"}>
            <h6 className="ya-estas"> Logueate aca</h6>
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