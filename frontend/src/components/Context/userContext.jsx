/* eslint-disable react-refresh/only-export-components */
import React, { Children } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [client, setUser] = useState("")
    const [admin, setAdmin] = useState()
    const [token, setToken] = useState("")

    const getUser = (client) =>{
      
      if(client){setUser(client)}
      
    } 
    const getPrivilege = (admin) =>{
        if(admin && admin == 1 ){
        setAdmin(true)
      }
      else{
        setAdmin(false)
      }
    }
    const getToken = (code) => {
      if(code){setToken(code)}
    }
    const logout = () => {
      setAdmin(false)
      setToken("")
      setUser("")
    }
  
  return <UserContext.Provider value={{client, admin, token, getUser, getPrivilege, getToken, logout}}>{children}</UserContext.Provider>
}

export default UserProvider