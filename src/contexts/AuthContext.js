import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
//creamos el contexto
const AuthContext = React.createContext();
//funcion que exporta el context entero
export const useAuth = ()=> useContext(AuthContext);
//provider y manejo de los estados
export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(true);
    //estado para obtener los datos del usuario
    const [user, setUser] = useState(null);
    //con useHistory podemos navegar a otro lado de la pagina
    const history = useHistory();
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            //obtengo los datos del usuario y los asigno al estado
            setUser(user);
            //pongo el loading en false
            setLoading(false);
            //redirijo a la ruta de /chats si es que tengo el usuario
            if(user) history.push('/chats')
        })
    },[user, history]);
    const value = {user};
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}