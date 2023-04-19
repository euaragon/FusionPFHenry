import React from 'react'
import campana from "./images/campana.png"
import logo from "./images/logo.png"

export default function UserBlocked() {
  return (
    <div className='user-blocked'>
      <img src={campana} alt="bloqueado" width="200" />
      <h1>ESTÁS BLOQUEADO</h1>
      <h5>Comunicate por favor <a target="_blank" href="https://wa.me/5492615326802" rel="noreferrer">ACÁ</a> para conocer el motivo</h5>
      <p>Te pedimos disculpas de parte de todo el equipo de</p>
      <img src={logo} alt="logo footwear fusion" />
    </div>
  )
}
