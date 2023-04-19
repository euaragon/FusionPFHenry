/*En este archivo van las credenciales de mi proyecto creado en firebase, para obtenerlas voy a mi proyecto y 
selecciono el enganaje de configuracion que esta arriba a la izquierda. Despues selecciono "configuracion de proyecto" 
y voy abajo de todo que me da para eleguir para que aplicacion va a ser. En este caso un web. Esto nos va a tirar un codigo de 
configuracion que lo pegamos aca.
Ahora esto no tiene la configuracion para la autenticacion es solo para que se conecte a la base de datos de firebase.
para configurar la autenticacion vamos a importar:
import {getAuth} from 'firebase/auth'
y despues agrego esta linea al final: export const auth = getAuth(app)
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDAD_WLCIxTcPYmw45xXcmVLAON10eSeJU",
  authDomain: "api-login-firebase.firebaseapp.com",
  projectId: "api-login-firebase",
  storageBucket: "api-login-firebase.appspot.com",
  messagingSenderId: "593408536054",
  appId: "1:593408536054:web:1abf9ccaca7e725f762bd7",
  measurementId: "G-B0DDZTTXCH"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)