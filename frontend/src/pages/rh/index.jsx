import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InputFormEdit from "../../components/inputFormEdit";
import RHUserButton from "../../components/RHUserButton";
import RHAdmButton from "../../components/RHAdmButton";
import Switch from "react-switch";
import rh from "./rh.module.scss";
import modalInspect from "./modalInspect.module.scss";
import { MdPersonSearch, MdQuestionMark } from "react-icons/md";
import { MdClose, MdPerson, MdSettings, MdDeleteForever, MdFolder } from 'react-icons/md';

const RH = () => {
    const [isModalUserOpen, setIsModalUserOpen] = useState(false);
    const [isModalAdmOpen, setIsModalAdmOpen] = useState(false);
    const [checkedUser, setCheckedUser] = useState(false);
    const [checkedAdm, setCheckedAdm] = useState(false);

    const handleClose = () => {
        setIsModalUserOpen(false);
        setIsModalAdmOpen(false);
    }

    const handleUserSwitchChange = () => {
        setCheckedUser(!checkedUser);
        setCheckedAdm(false);
    }

    const handleAdmSwitchChange = () => {
        setCheckedAdm(!checkedAdm);
        setCheckedUser(false);
    }

    const handleSearch = () => {
        //
    }

    return (
        <> 
        <Header/>
        <h1 className={rh.title}>Portal de Recursos Humanos</h1>
        <img src="./Ondinhas.svg" className={rh.separator}/>

        <h1 className={rh.titleUserList}>Lista de Usuários</h1>

        <div className={rh.searchUser}>
            <MdPersonSearch className={rh.iconSearchUser} color="#5686e1" size={25}/>
            <input type="search" className={rh.inputSearchUser} placeholder="Buscar por usuários"></input>
            <button type="submit" onChange={handleSearch} className={rh.buttonSearchUserSubmit}>Pesquisar</button>

            <div className={rh.searchUserSwitches}>
                <label>
                    <Switch 
                        checked={checkedUser} 
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#269BDF"
                        offColor="#000000"
                        onChange={handleUserSwitchChange}
                        className={rh.searchUserSwitch}
                        >
                    </Switch>
                    <span>Mostrar usuários</span>
                </label>
                <label>
                    <Switch 
                        checked={checkedAdm} 
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#269BDF"
                        offColor="#000000"
                        onChange={handleAdmSwitchChange}
                        className={rh.searchUserSwitch}
                        >
                    </Switch>
                    <span>Mostrar administradores</span>
                </label>
            </div>

        </div>

        <p className={rh.results}>Mostrando xx de yy resultados</p>

        <div className={rh.userList}>
            <RHUserButton/>
            <RHUserButton/>
            <RHUserButton/>
            <RHUserButton/>
            <RHUserButton/>
            <RHAdmButton/>
            <RHAdmButton/>
            <RHAdmButton/>
            <RHAdmButton/>
            <RHAdmButton/>
        </div>

        <div className={rh.accountInfo}>
            <h1>O que é esta conta?</h1>
            <div className={rh.accountInfoDescription}>
                <p>Nesse perfil, você pode tornar usuários administradores, gerenciar acessos e atualizar dados importantes do sistema. Use com responsabilidade para manter o controle e a segurança da plataforma!</p>
                <MdQuestionMark size={120} className={rh.accountInfoIcon}/>
            </div>
        </div>

        {isModalUserOpen === true ? 
            (
                <div className={modalInspect.overlay}>
                    <div className={modalInspect.body}>
                        <div className={modalInspect.title}>
                            <MdPerson color='black' size={35}/>
                            <h2>Inspecionar usuário</h2>
                            <button className={modalInspect.buttonClose} onClick={handleClose}>
                                <MdClose color='black' size={25}/>
                            </button>
                        </div>
                        
                        <label>Nome completo</label>
                        <InputFormEdit/>
                        <label>E-mail</label>
                        <InputFormEdit/>

                        <button className={modalInspect.buttonPromote}>Promover a Administrador</button>
                        <p>* Essa ação dará acesso a ações e dados sensíveis para este usuário.</p>

                        <div className={modalInspect.options}>
                            <button className={modalInspect.optionsDeleteProfile}>
                                <MdDeleteForever size={25}/>
                                <span>Deletar perfil</span>
                            </button>
                            <button className={modalInspect.optionsSaveProfile}>
                                <MdFolder size={25}/>
                                <span>Salvar</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : ( 
                isModalAdmOpen === true ? 
                    (
                        <div className={modalInspect.overlay}>
                            <div className={modalInspect.body}>
                                <div className={modalInspect.title}>
                                    <MdSettings size={35}/>
                                    <h2>Inspecionar administrador</h2>
                                    <button className={modalInspect.buttonClose} onClick={handleClose}>
                                        <MdClose color='black' size={25}/>
                                    </button>
                                </div>

                                <label>Nome completo</label>
                                <InputFormEdit/>
                                <label>Email</label>
                                <InputFormEdit/>

                                <button className={modalInspect.buttonDemote}>Rebaixar a usuário</button>
                                <p>* Essa ação removerá acesso a ações e dados sensíveis para este administrador.</p>

                                <div className={modalInspect.options}>
                                    <button className={modalInspect.optionsDeleteProfile}>
                                        <MdDeleteForever size={25}/>
                                        <span>Deletar perfil</span>
                                    </button>
                                    <button className={modalInspect.optionsSaveProfileAdm}>
                                        <MdFolder color="black" size={25}/>
                                        <span>Salvar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                ) : (
                    <></>
                )
            )}
        
        <Footer/>
        </>
    );
}

export default RH;
