import { useDispatch } from "react-redux";
import medios from "../images/mediosdepago.png";
import { useState } from "react";
import {  postNewsletter } from "../../Redux/Actions";
import swal from "sweetalert";


export default function Footer() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState({
    email: ""
  });

  const correo = {
    email: email.email, 
    subject:"Gracias por Suscribirte!",
    //html: html
  }

  const capturarEmail = (evento) => {
    const { name, value } = evento.target;
    setEmail({
      ...email,
      [name]: value
    });
  };

  const newEmail = async ()=> {
    swal("Gracias por suscribirte!", "Revisá tu casilla de correo","success")
    setTimeout(() => {
      window.location.reload()
    }, 3000);
    await dispatch(postNewsletter(correo))
  }

  return (
    <div className="footer">

      <div>
        <h5>MEDIOS DE PAGO</h5>
        <img src={medios} alt="" />
      </div>

      <h5>Suscribite a nuestro Newsletter y no te pierdas las novedades!</h5>
      <input type="text" name="email" placeholder="Ingresa tu email..." onChange={capturarEmail} />
      <button className="enviar" onClick={newEmail}>Enviar</button>

    </div>
  );
}
