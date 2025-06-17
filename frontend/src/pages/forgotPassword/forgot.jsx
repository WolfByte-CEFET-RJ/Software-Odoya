import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../../styles/login.scss';
import { useNavigate } from 'react-router-dom'
import api from '../../api.js'
import { useState, useEffect } from 'react'
import InputForm from '../../components/inputForm/inputForm.jsx'

function Forgot(){
    
    const [email, setEmail] = useState('')
    const [load, setLoad]  = useState()
    const [disable, setDisable] = useState(false)
         
    const navigate = useNavigate();
    const handleChange = (event, setText) => {
        setText(event.target.value);
    };
    
    function loading(){
        setLoad(true)
        send()
    }
   
    async function send(){
            
        const userData = { email}
        
        try {
            
            let res = await api.post("/forgotPassword", userData);
            if(res.status === 200){
                toast.success("Senha redefinida com sucesso!")
                toast.info("Confira a caixa de entrada de " + email)

                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            }
            
        } catch (error) {
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao redefinir senha!'+error);
            }, 1000);
           
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
     
    } effect()}, [load])

    return(
        <>
            <div className="bodyLogin">
                    <div className="forms">
                        <img src="../public/LogoAzul.svg" className={(load===true) ? "logoazul2" : "logoazul"} alt="Logo Azul da ENACTUS"/>
                        <div className="div_forms_login">

                            Vamos enviar instruções para seu email

                            <InputForm type='email' off={disable} onChange={(event) => handleChange(event, setEmail)} placeholder="Email"/>
                            
                            <button className="button-login-form" onClick={loading}>Redefinir Senha</button>
                            <button className="button-login-form" onClick={()=>navigate("/")}>Cancelar</button>

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

export default Forgot;