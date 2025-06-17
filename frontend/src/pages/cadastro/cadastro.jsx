import React from 'react'

import '../../styles/cadastro.scss';
import api from '../../api'
import { toast } from 'react-toastify';
import InputForm from '../../components/inputForm/inputForm.jsx'
import { useState } from 'react'
import InputFormPassword from '../../components/inputFormPassword/inputFormPassword.jsx'
import { useNavigate } from 'react-router-dom'


function Cadastro(){
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [load, setLoad]  = useState()
    const [password, setPass] = useState('')
    const [confirmPassword, setConfirmPass] = useState('')

    const navigate = useNavigate();

    const handleChange = (event, setText) => {
        setText(event.target.value);
    };

    function loading(e){
        e.preventDefault()
        setLoad(true)
        register()
    }

    async function register(){
        // e.preventDefault()
        if(confirmPassword  !==  password){
            toast.error("as senhas não são condizentes.")
            return
        }
        const userData = {name:name, email: user, password: password}
        try {
            let res = await api.post("/user", userData);
            console.log(res.data)
            if(res.data){
                setTimeout(() => {
                    setLoad(false)
                    toast.success(res.data.message)
                },1000);
                navigate("/login")  
            }
        }catch(e){
            setTimeout(()=>{
                setLoad(false)
                toast.error(e.response.data.message);
            },1000);
        }
    }
    
    

    return(
        <>
            <div className="bodyCadastro">
                <div className="formulario" >
                    <img src="../public/LogoAzul.svg" className={(load===true) ? "logoazul2" : "logoazul"} alt="Logo Azul da ENACTUS"/>
                    <div className="div_formulario_cadastro">
                        <InputForm type='text' onChange={(event) => handleChange(event, setName)} placeholder='Nome'/>
                        <InputForm type='email' onChange={(event) => handleChange(event, setUser)} placeholder="Usuário"/>
                        <InputFormPassword onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                        <InputFormPassword onChange={(event) => handleChange(event, setConfirmPass)} placeholder="Confirmar Senha"/>
                        
                        <button className='button-register-form' onClick={loading}>Cadastrar</button>
                        <button className='button-register-form' onClick={()=>navigate("/login")}>Cancelar</button>
                    </div>
                </div>
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