/* eslint-disable react-refresh/only-export-components */
import React, { Children } from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [client, setUser] = useState("")
    const [mail, setMail] = useState("")
    const [admin, setAdmin] = useState()
    const [root, setRoot] = useState()

    const nav = useNavigate()
    const token = localStorage.getItem("token")
     useEffect(()=>{
      
      async function getUser(){
        
        let req = await api.get('/user',  
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            )
        setUserName(req.data.name, req.data.email)
        

        getPrivilege(req.data.admin, req.data.isRoot)
        
      }
      if(!client && token){
        getUser()
      }
      else if(!client && !token){
        nav("/")
      }
      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[client])

    const setUserName = (client,mail) =>{
      
      if(client){setUser(client)}
      if(mail){setMail(mail)}
      
    } 
    const getPrivilege = (admin, root) =>{
      setAdmin((admin===1))
      setRoot((root))
    }
    
    const logout = () => {
       localStorage.clear()
        setAdmin(false)
        setRoot(false)
        setUser("")
        window.location.reload()
      
    }
  
  return <UserContext.Provider value={{client, mail, admin, token, root, setUserName, getPrivilege, logout}}>{children}</UserContext.Provider>
}

export default UserProvider