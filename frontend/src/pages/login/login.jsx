/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import '../../styles/login.scss';
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleButton } from 'react-google-button'
import api from '../../api'
import React, { useState, useEffect } from 'react'
import InputForm from '../../components/inputForm/inputForm.jsx'
import InputFormPassword from '../../components/inputFormPassword/inputFormPassword.jsx'




function Login(){
    
    const [user, setUser] = useState('')
    const [password, setPass] = useState('')
    const [load, setLoad]  = useState()
    const [disable, setDisable] = useState(false)
    const [ user2, setUser2 ] = useState([]);

    
        
    const navigate = useNavigate();
    const handleChange = (event, setText) => {
        setText(event.target.value);
    };
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser2(codeResponse),
        onError: (error) => toast.error('Problema no login:', error)
    });
    function Forgot(){
        navigate('/forgot')
        
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
                localStorage.setItem("token",res.data.token);
                let req = await api.get('/user',  
                {
                    headers: { Authorization: `Bearer ${res.data.token}`}
                }
                
            )
                setTimeout(()=>{
                setLoad(false)
                toast.success(`Bem Vindo ${req.data.name}!`);
                },1000);
            
                if(req.data.admin == true){
                    setTimeout(() => {
                    navigate("/homeAdm")
                    }, 3000);}
                
                if(req.data.isRoot == true){
                setTimeout(() => {
                navigate("/rh")
                    
                }, 3000);}
                else{
                    setTimeout(() => {
                navigate("/home")
                
                }, 3000);
                }
                
            }
        } catch (error) {
            if(error.response){
                setTimeout(()=>{
                setLoad(false)
                toast.error(error.response.data.message);
            },1000);
            }else{
                setTimeout(()=>{
                setLoad(false)
                toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
            },1000);
            }
        }
    }
   
    useEffect(() =>{
        
        
        async function effect(){
            
        if(load == true){
            setDisable(true)
        }
        else{
            setDisable(false)
        }
        if (Object.keys(user2).length > 0) {
            
            const token = {token: `${user2.access_token}`}
            
           
            try {
                
                let res = await api.post("/auth/google", token)
                
                if(res.data.token){
                    setTimeout(() => {
                        setLoad(false)
                        toast.success(res.data.message);
                    }, 1000);
                    //getToken(res.data.token)
                localStorage.setItem("token",res.data.token);
                navigate("/home")
                
                }
            }
            catch (error) {
            toast.error(error)
            if(error.response){
                setTimeout(() => {
                    setLoad(false)
                    toast.error(error.response.data.message);
                }, 1000);
            }
            else{
                setTimeout(() => {
                    setLoad(false)
                    toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
                }, 1000);

            }
            
        
        }}
                
                
    } effect()}, [load, user2])

    return(
        <>
            <div className="bodyLogin">
                    <div className="forms">
                        <img src="../public/LogoAzul.svg" className={(load===true) ? "logoazul2" : "logoazul"} alt="Logo Azul da ENACTUS"/>
                        <div className="div_forms_login">
                            <InputForm type='email' onChange={(event) => handleChange(event, setUser)} placeholder="Usuário"/>
                            <InputFormPassword onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                            <a onClick={Forgot}>Esqueci minha senha</a>
                            <GoogleButton type="light" label="Login com o Google" onClick={login}></GoogleButton>
                            
                            <button className="button-login-form" onClick={loading}>Entrar</button>
                            <button className="button-login-form" onClick={()=>navigate("/register")}>Criar conta</button>

                        </div>
                    </div>
                    <div className="logo">
                        <div className="logo-logomarca">
                            <img src="../public/LogoBranca.svg " alt="Logo Branca da ENACTUS" className="logobranca"/>
                            <h3> Envolvendo a comunidade, destacamos a importância da Sub-bacia do Rio Maracanã, os impactos da poluição e alternativas para o lixo doméstico.</h3>            
                        </div>
                    </div>
            </div>            
        </>
    )
}

export default Login;