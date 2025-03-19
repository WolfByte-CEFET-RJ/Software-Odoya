
import { toast } from 'react-toastify';
//import {useNavigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import '../../styles/login.scss';
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { GoogleButton } from 'react-google-button'
import api from '../../api'
import React, { useState, useEffect } from 'react'
import InputForm from '../../components/inputForm/inputForm.jsx'
import InputFormPassword from '../../components/inputFormPassword/inputFormPassword.jsx'
import axios from 'axios';
//import jwt_decode from 'jwt-decode';

function Login(){
    //const nav = useNavigate()
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
        onError: (error) => console.log('Login Failed:', error)
    });
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
        if (Object.keys(user2).length > 0) {
            console.log('token de acesso do usuario')
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user2.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user2.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then(async (res) => {
                    
                    const userData = { email: res.data.email, password: '12345678'}
                    console.log(userData)

                    try {
                        
                        let res = await api.post("/login", userData);
                        console.log(res.data)
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
                   
                
                })
                .catch((err) => console.log(err));
                }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load, user2])

    return(
        <>
            <div className="body">
                    <div className="forms">
                        <img src="../public/LogoAzul.svg" className={(load===true) ? "logoazul2" : "logoazul"} alt="Logo Azul da ENACTUS"/>
                        <div className="div_forms_login">
                            <InputForm type='email' onChange={(event) => handleChange(event, setUser)} placeholder="Usuário"/>
                            <InputFormPassword onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                            <a >Esqueci minha senha</a>
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

