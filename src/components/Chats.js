import React, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import {auth} from '../firebase'
import { LogoutOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
const Chats = () => {
    //declaro el hook useHistory para cuando salga de la app el usuario
    //lo rediriga a la página principal
    const history = useHistory()
    //obtengo los dato de otro componente en este componente usando react context
    const {user} = useAuth()
    //console.log(user)
    //setter para el loading
    const [loading, setLoading] = useState(true)
    //funcion para handleLogout
    const handleLogout = async () =>{
         await auth.signOut();
        history.push('/')

    }
    //funcion para permitir imagenes en lo usuarios
    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob()
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }
    //funciton para useefect
    useEffect(()=>{
        //si no tengo un usuario lo redirijo a "/" que seria el login screen
        if(!user){
            history.push('/');
            return;
        }
        //si tengo un usuario hago una llamada con axios a la api del chatEngine
        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id": "a2f40e20-5854-4e8e-b8c8-4f3cbc88adbd",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)
            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name)
                //creo el usuario por si no existe
                axios.post('https://api.chatengine.io/users', formdata,
                {headers: {"private-key":"c53b883c-5e06-44a3-a401-696c9477255c"}}
                )
                .then(()=>setLoading(false))
                .catch((error)=>console.log(error))
            })
        })
    },[user,history])
    //if para que el usuario (user.email) no sea indefinido la primera vez que
    //se cargue la página
    if(!user ||loading) return <div id="loading-page">
    <div id="login-card">
        <h2>Cargando</h2>
        {/*La funcion que esta en el onclick permite iniciar sesión con google */}
        
       
       
    </div>
</div>
  return (
    <div className="chats-page">
        <div className="nav-bar">
            <div className="logo-tab">CHAT</div>
        
        <div onClick={handleLogout} className="logout-tab">Salir <LogoutOutlined/></div>
        </div>
        <ChatEngine
        height="calc(100vh - 66px)"
        projectID="a2f40e20-5854-4e8e-b8c8-4f3cbc88adbd"
        userName={user.email}
        userSecret={user.uid}
        />
    </div>
  )
}

export default Chats