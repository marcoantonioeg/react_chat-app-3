import React from 'react'
import { GoogleOutlined} from '@ant-design/icons'
import  "firebase/app"
import { auth } from '../firebase'
import firebase from 'firebase/app'
const Login = () => {
  return (
    <div id="login-page">
        <div id="login-card">
            <h2>Bienvenido!</h2>
            {/*La funcion que esta en el onclick permite iniciar sesión con google */}
            <div className="login-button google" onClick={()=> auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                <GoogleOutlined/> Inicia sesión con Google
            </div>
           
           
        </div>
    </div>
  )
}

export default Login