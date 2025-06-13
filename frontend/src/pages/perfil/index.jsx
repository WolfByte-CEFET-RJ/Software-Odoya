/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InputFormEdit from "../../components/inputFormEdit";
import { MdInfo } from "react-icons/md";
import perfil from "./perfil.module.scss"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import api from '../../api'

import { useContext } from "react";
import { UserContext } from "../../components/Context/userContext";

const Perfil = () => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [lock, setLock] = useState(false)
    //const [text, setText] = useState('')
    const [name, setName] = useState('')
    
    const [email, setEmail] = useState('')

    const {client, mail} = useContext(UserContext)
    console.log(client, mail)
    
    const handleChange = (event, setText) => {
        setText(event.target.value);
    };
   
    
    async function deleteUser(){
        

        try{
            let req = await api.delete('/user')
         
            
            if(req.status == 200){
                
                setLoad(false)
                 setTimeout(() => {
                                    setLoad(false)
                                    toast.success('Usuário deletado!');
                                }, 1000);
                                navigate("/")
            }
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao excluir conta');
            }, 1000);
    }
    }
    async function updateUser(){
        //let tokenId = localStorage.getItem("id")
        const userData = {name: name, email: email}
        

        try{
            let req = await api.patch('/user', userData)
            if(req.status == 200){
                
                setLoad(false)
                 setTimeout(() => {
                                    setLoad(false)
                                    toast.success('Usuário atualizado!');
                                }, 1000);
                                
            }
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao alterar dados');
            }, 1000);
    }
    }

    
    const loading = (func) => {
        setLoad(true);
        if(func == 'update'){
            updateUser()
        }
        
        else if(func == 'deleteUser'){
            
            deleteUser()
        }
        
    }
    useEffect(() =>{
            
            if(load == true){
                setLock(true)
               
                  toast.info(
                    <div className='loadingDiv'>
                        <h3>Aguarde um momento</h3>
                        <img src="../public/LogoAzul.svg" className={(load===true) ? perfil.logoLoad2 : perfil.logoLoad} alt="Logo Azul da ENACTUS"/>
                    </div>,
                    {
                        position: "top-center",
                        autoClose: false,
                        className:'loading' 
                    })
                    
        }
        else{
            toast.dismiss()
            setLock(false)
        }

            
    },[load])
    useEffect(() =>{
        setEmail(mail)
        setName(client)
    },[client])
    

    
    return (
        <>
            <Header/>
            <img src="./Ondinhas.svg" className={perfil.separador}/>
            <div className={perfil.container}>
                <img src="../public/LogoAzul.svg" className={perfil.logoazul} alt="Logo Azul da ENACTUS"/>
                <h1>Seja bem-vindo, {client}!</h1>
                <form className={perfil.formProfile}>
                    <label>Nome</label>
                    <InputFormEdit onChange={(event) => handleChange(event, setName)} place={name} disable={lock} type="text"></InputFormEdit>
                    <label>E-mail</label>
                    <InputFormEdit onChange={(event) => handleChange(event, setEmail)}  place={mail} disable={lock} type="email"></InputFormEdit>

                    <label>Pontos</label>
                    <div className={perfil.divPoints}>
                        <p className={perfil.points}>0</p>
                        <div className={perfil.pointsInfo}>
                            <MdInfo size={20}/>
                            <p>Faça depósitos de esponjas para conseguir mais pontos!</p>
                        </div>
                    </div>

                    <div className={perfil.formButtons}>
                        <button className={perfil.buttonCancelar} disabled={lock} onClick={() => navigate("/")}>Cancelar</button>
                        <button type="button" className={perfil.buttonAlterar} disabled={lock} onClick={() => loading('update')}>Alterar</button>
                        <button className={perfil.buttonExcluirConta} disabled={lock} onClick={() => loading('deleteUser')}>Excluir Conta</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    );
};

export default Perfil;