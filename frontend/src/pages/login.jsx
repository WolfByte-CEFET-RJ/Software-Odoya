import React from 'react'

import '../styles/login.scss'
import api from '../api'


import { useState } from 'react'


function Login(){
    const [user, setUser] = useState('')
    const [password, setPass] = useState('')
    

    const handleChange = (event, setText) => {
        setText(event.target.value);
      };
    async function auth(){
        
        const userData = { email: user, password: password}
        console.log(userData)
        let res = await api.post("/login", userData)
        console.log(res.data)
    }
    
    

    return(
        <>
            <div className="body">
                <div className="forms">
                    <img src="../public/LogoAzul.svg" className="logoazul" alt="Logo Azul da ENACTUS"/>
                    <input type='email' onChange={(event) => handleChange(event, setUser)}placeholder="Usuário"/>
                    <input type='password' onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                    <a >Esqueci minha senha</a>
                    <h3>GOogle aqui</h3>

                    <button onClick={auth}>Entrar</button>
                    <button>Criar conta</button>
                    

                </div>
                <div className="logo">
                    <img src="../public/LogoBranca.svg " alt="Logo Branca da ENACTUS" className="logobranca"/>
                      <h3> Envolvendo a comunidade, destacamos a importância da Sub-bacia do Rio Maracanã, os impactos da poluição e alternativas para o lixo doméstico.</h3>            
                    </div>
            </div>

        </>
    )



}

export default Login

