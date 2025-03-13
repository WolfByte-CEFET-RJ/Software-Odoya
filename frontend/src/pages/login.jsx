
import { toast } from 'react-toastify';
//import {useNavigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import '../styles/login.scss'
import api from '../api'
import React, { useState, useEffect } from 'react'

function Login(){
    //const nav = useNavigate()
    const [user, setUser] = useState('')
    const [password, setPass] = useState('')
    const [load, setLoad]  = useState()
    const [disable, setDisable] = useState(false)

    const handleChange = (event, setText) => {
        setText(event.target.value);
    };

    function Forgot(){
        //nav('insira a rota de esquecimento')
        alert('inserir pagina')
    };
    
    function loading(){
        setLoad(true)
        auth()
    }
   
    async function auth(){
            
        const userData = { email: user, password: password}
        
        try {
            
            let res = await api.post("/login", userData);
           
            if(res.data.token){
                setTimeout(() => {
                    setLoad(false)
                    toast.success('Bem vindo!');
                }, 1000);

                localStorage.setItem("token",res.data.token);   
                
            }
        } catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao fazer login!!!');
            }, 1000);
            
           
        }
    }
    
    useEffect(() =>{
        if(load == true){
            setDisable(true)
        }
        else{
            setDisable(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load])

    return(
        <>
            <div className="body">
                <div className="forms">
                    <img src="../public/LogoAzul.svg" className={(load===true) ? "logoazul2" : "logoazul"} alt="Logo Azul da ENACTUS"/>
                    <input disabled={disable} type='email' onChange={(event) => handleChange(event, setUser)}placeholder="Usuário"/>
                    <input disabled={disable} type='password' onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                    <a disabled={disable} onClick={Forgot}>Esqueci minha senha</a>
                    <h3 disabled={disable}>Google aqui</h3>

                    <button disabled={disable} onClick={loading}>Entrar</button>
                    <button disabled={disable}>Criar conta</button>
                    

                </div>
                <div className="logo">
                    <img src="../public/LogoBranca.svg " alt="Logo Branca da ENACTUS" className="logobranca"/>
                      <h3> Envolvendo a comunidade, destacamos a importância da Sub-bacia do Rio Maracanã, os impactos da poluição e alternativas para o lixo doméstico.</h3>            
                    </div>
            </div>            
        </>
    )
}

export default Login;

