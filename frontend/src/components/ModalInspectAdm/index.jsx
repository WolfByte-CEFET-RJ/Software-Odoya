import { useState, useEffect } from "react";
import InputFormEdit from "../inputFormEdit";
import { MdSettings, MdClose, MdDeleteForever, MdFolder } from "react-icons/md";
import { toast } from "react-toastify";
import modalInspect from "../ModalInspectUser/modalInspect.module.scss";
import perfil from "../../pages/perfil/perfil.module.scss"
import "react-toastify/dist/ReactToastify.css";
import api from "../../api"

const ModalInspectAdm = ({user, closeModal}) => {
    const {id, name, email} = user;
    const [load, setLoad] = useState(false);
    const [lock, setLock] = useState(false);
    const [username, setUserName] = useState(name);
    const [usermail, setUserMail] = useState(email);

    const handleChange = (event, setText) => {
        setText(event.target.value);
    }

    async function demoteUser() {
        try {
            let req = await api.patch(`/root/user/role/${id}`);

            if(req.status === 200) {
                setLoad(false);
                setTimeout(() => {
                    setLoad(false);
                    toast.success('Usuário rebaixado com sucesso!', {
                        onClose: () => {window.location.reload()}
                    })
                }, 1000)
            }
        } catch(error) {
            console.log(error);
            setTimeout(() => {
                setLoad(false);
                toast.error('Falha ao promover usuário');
            }, 1000)
        }
    }

    async function deleteUser() {
        if(confirm("Tem certeza que deseja deletar este usuário? Esta ação não pode ser revertida.")) {
            try {
                let req = await api.delete(`/root/user/${id}`);

                if(req.status === 200) {
                    setLoad(false)
                    setTimeout(() => {
                        setLoad(false)
                        toast.success('Usuário deletado com sucesso!', {
                            onClose: () => {window.location.reload();}
                        })
                    }, 1000);
                }
            } catch(error) {
                console.log(error)
                setTimeout(() => {
                    setLoad(false)
                    toast.error('Falha ao deletar usuário');
                }, 1000);
            }
        } else {
            setLoad(false);
        }
    }

    async function updateUser() {
        const userData = {name: username, email: usermail}

        try {
            let req = await api.patch(`/root/user/${id}`, userData);

            if(req.status === 200) {
                setLoad(false)
                setTimeout(() => {
                    setLoad(false)
                    toast.success('Usuário atualizado com sucesso!', {
                        onClose: () => {window.location.reload();}
                    })
                }, 1000);
            }
        } catch(error) {
            console.log(error)
                        
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao alterar dados');
            }, 1000);
        }
    }

    const loading = (func) => {
        setLoad(true);

        switch(func) {
            case 'demote': demoteUser(); break;
            case 'delete': deleteUser(); break;
            case 'update': updateUser(); break;
            default: break;
        }
    }

    useEffect(() =>{
        if(load == true){
            setLock(true)
            
            toast.info(
                <div className='loadingDiv'>
                    <h3>Aguarde um momento</h3>
                    <img src="../../public/LogoAzul.svg" className={(load===true) ? perfil.logoLoad2 : perfil.logoLoad} alt="Logo Azul da ENACTUS"/>
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

    return (
        <>
            <div className={modalInspect.overlay}>
                <div className={modalInspect.body}>
                    <div className={modalInspect.title}>
                        <MdSettings size={35}/>
                        <h2>Inspecionar administrador</h2>
                        <button className={modalInspect.buttonClose} onClick={closeModal}>
                            <MdClose color='black' size={25}/>
                        </button>
                    </div>

                    <label>Nome completo</label>
                    <InputFormEdit onChange={(event) => handleChange(event, setUserName)} type="text" place={username}/>
                    <label>Email</label>
                    <InputFormEdit onChange={(event) => handleChange(event, setUserMail)} type="email" place={usermail}/>

                    <button className={modalInspect.buttonDemote} disabled={lock} onClick={() => loading('demote')}>Rebaixar a usuário</button>
                    <p>* Essa ação removerá acesso a ações e dados sensíveis para este administrador.</p>

                    <div className={modalInspect.options}>
                        <button className={modalInspect.optionsDeleteProfile} disabled={lock} onClick={() => loading('delete')}>
                            <MdDeleteForever size={25}/>
                            <span>Deletar perfil</span>
                        </button>
                        <button className={modalInspect.optionsSaveProfileAdm} disabled={lock} onClick={() => loading('update')}>
                            <MdFolder color="black" size={25}/>
                            <span>Salvar</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalInspectAdm;