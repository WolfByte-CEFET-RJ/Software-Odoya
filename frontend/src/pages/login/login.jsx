
import { toast } from 'react-toastify';
//import {useNavigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import '../../styles/login.scss';
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import api from '../../api'
import React, { useState, useEffect } from 'react'
import InputForm from '../../components/inputForm/inputForm.jsx'
import InputFormPassword from '../../components/inputFormPassword/inputFormPassword.jsx'

function Login(){
    //const nav = useNavigate()
    const [user, setUser] = useState('')
    const [password, setPass] = useState('')
    const [load, setLoad]  = useState()
    const [disable, setDisable] = useState(false)

    const navigate = useNavigate();
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
                        <img src="../public/LogoAzul.svg" className="logoazul" alt="Logo Azul da ENACTUS"/>
                        <InputForm type='email' onChange={(event) => handleChange(event, setUser)}placeholder="Usuário"/>
                        <InputFormPassword onChange={(event) => handleChange(event, setPass)} placeholder="Senha"/>
                        <a >Esqueci minha senha</a>
                        {/* <h3>GOogle aqui</h3> */}
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                            const decoded = credentialResponse.credential;
                            console.log("Usuário logado:", decoded);
                            }}
                            onError={() => {
                            console.log("Falha no login");
                            }}
                        />
                        <button onClick={auth}>Entrar</button>
                        <button onClick={()=>navigate("/register")}>Criar conta</button>
                        
    
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

