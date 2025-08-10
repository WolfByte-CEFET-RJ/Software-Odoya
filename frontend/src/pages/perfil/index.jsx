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
import { useConfirmation } from "../../components/ModalConfirmation/handleHook";

const Perfil = () => {
    const navigate = useNavigate();
    const {confirm, ConfirmationModal} = useConfirmation()
    const {logout} = useContext(UserContext)
    const [load, setLoad] = useState(false);
    const [lock, setLock] = useState(false)
    const [name, setName] = useState('')
    const [point, setPoint] = useState()

    
    const [email, setEmail] = useState('')

    const {client, points} = useContext(UserContext)
    
    const handleChange = (event, setText) => {
        setText(event.target.value);
    };
    
    async function deleteUser(){
        

        try{
            let req = await api.delete('/user')
         
            if(req.status == 204){
                
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
            if(error.response){
                    setLoad(false)
                    setTimeout(() => {
                        toast.error(error.response.data.message);
                    }, 1000);
            
            }else{
                setLoad(false)
                setTimeout(() => {
                toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
            }, 1000);
            }
            
    }
    }

    async function updateUser() {
        const userData = {};
        if (name !== client) userData.name = name;
        if (email !== "") userData.password = email;

        if (Object.keys(userData).length === 0) {
            toast.info("Nenhuma informação foi alterada.");
            setLoad(false)
            return;
        }

        try {
            const req = await api.patch('/user', userData);
            if (req.status === 200) {
            setLoad(false);
            setTimeout(() => {
                toast.success('Usuário atualizado!');
            }, 1000);
            }
        } catch (error) {
            console.log(error);
            setLoad(false);
            setTimeout(() => {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
            }
            }, 1000);
        }
    }


    
    const loading = async (func) => {
        if(func == 'update'){
            if(await confirm("atualizar seus dados")){
                setLoad(true);
                await updateUser()
                setTimeout(()=>{location.reload()}, 3000)
            }
        }
        else if(func == 'deleteUser'){
            if(await confirm("excluir sua conta")){
                setLoad(true);
                await deleteUser()
                logout()
            }
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
        setEmail("")
        setName(client)
        setPoint(points)
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
                    <label>Senha</label>
                    <InputFormEdit onChange={(event) => handleChange(event, setEmail)} hold="••••••••" disable={lock} type="password"></InputFormEdit>

                    <label>Pontos</label>
                    <div className={perfil.divPoints}>
                        <p className={perfil.points}>{point}</p>
                        <div className={perfil.pointsInfo}>
                            <MdInfo className={perfil.pointsInfoIcon} size={25}/>
                            <p>Faça depósitos de esponjas para conseguir mais pontos!</p>
                        </div>
                    </div>

                    <div className={perfil.formButtons}>
                        <button className={perfil.buttonCancelar} disabled={lock} onClick={() => navigate("/")}>Cancelar</button>
                        <button type="button" className={perfil.buttonAlterar} disabled={lock} onClick={() => loading('update')}>Alterar</button>
                        <button type="button" className={perfil.buttonExcluirConta} disabled={lock} onClick={() => loading('deleteUser')}>Excluir Conta</button>
                    </div>
                </form>
            </div>
            <Footer/>
            <ConfirmationModal></ConfirmationModal>
        </>
    );
};

export default Perfil;