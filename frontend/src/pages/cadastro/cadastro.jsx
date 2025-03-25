import React from 'react'

import '../../styles/cadastro.scss';
// import api from '../api'

import InputForm from '../../components/inputForm/inputForm.jsx'
import { useState } from 'react'
import InputFormPassword from '../../components/inputFormPassword/inputFormPassword.jsx'
import { useNavigate } from 'react-router-dom'


function Cadastro(){
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [password, setPass] = useState('')
    const [confirmPassword, setConfirmPass] = useState('')

    const navigate = useNavigate();

    const handleChange = (event, setText) => {
        setText(event.target.value);
    };
    async function register(){

        if(confirmPassword!=password){
            console.log("as senhas não são condizentes.")
            return
        }
        const userData = {nome:name, email: user, password: password}

        console.log(userData)
        // let res = await api.post("/cadastro", userData)
        // console.log(res.data)
    }
    
    

    return(
        <>
            <div className="body">
                <form className="formulario" onSubmit={register}>
                    <img src="../public/LogoAzul.svg" className="logoazul" alt="Logo Azul da ENACTUS"/>
                    <InputForm type='text' onChange={(event) => handleChange(event, setName)} placeholder='Nome'/>
                    <InputForm type='email' onChange={(event) => handleChange(event, setUser)} placeholder="Usuário"/>
                    <InputFormPassword onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                    <InputFormPassword onChange={(event) => handleChange(event, setPass)} placeholder="Confirmar Senha"/>
                    

                    <button className='button-register-form' type='onSubmit'>Cadastrar</button>
                    <button className='button-register-form' onClick={()=>navigate("/")}>Cancelar</button>
                    

                </form>
                <div className="logo-container">
                    <div className="logomarca">
                        <img src="../public/LogoBranca.svg " alt="Logo Branca da ENACTUS" className="logobranca"/>
                        <h3> Envolvendo a comunidade, destacamos a importância da Sub-bacia do Rio Maracanã, os impactos da poluição e alternativas para o lixo doméstico.</h3>            
                    </div>
                    </div>
            </div>

        </>
    )



}

export default Cadastro

