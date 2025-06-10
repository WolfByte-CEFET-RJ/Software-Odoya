import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RHUserButton from "../../components/RHUserButton";
import RHAdmButton from "../../components/RHAdmButton";
import ModalInspectAdm from "../../components/ModalInspectAdm";
import ModalInspectUser from "../../components/ModalInspectUser";
import Switch from "react-switch";

import rh from "./rh.module.scss";
import { MdPersonSearch, MdQuestionMark, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import api from "../../api"


const RH = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isModalUserOpen, setModalUserOpen] = useState(false);
    const [isModalAdmOpen, setModalAdmOpen] = useState(false);
    const [checkedUser, setCheckedUser] = useState(false);
    const [checkedAdm, setCheckedAdm] = useState(false);
    const [usersList, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    }

    const handleUserSwitchChange = () => {
        setCheckedUser(!checkedUser);
        setCheckedAdm(false);
    }

    const handleAdmSwitchChange = () => {
        setCheckedAdm(!checkedAdm);
        setCheckedUser(false);
    }

    const handleInspect = (user) => {
        setSelectedUser(user);

        if(user.admin) {
            setModalAdmOpen(true);
        } else setModalUserOpen(true);
    }

    const handleClose = () => {
        setSelectedUser(null);
        setModalUserOpen(false);
        setModalAdmOpen(false);
    }

    async function getUsersData() {
        try {
            let req = await api.get(`/root/user?page=${currentPage}`);
            setList(req.data.users);
            setFilteredList(req.data.users);
        } catch(error) {
            console.log(error);
        }
    }

    const handleSearch = (search) => {
        const results = usersList.filter(user => {
          return user.name.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredList(results);
    }

    const goToNextPage = () => {
        setCurrentPage(currentPage+1);
    }

    const goToPreviousPage = () => {
        if(currentPage != 1) {
            setCurrentPage(currentPage-1);
        }
    }

    useEffect(() => {
        getUsersData();
    }, [currentPage])
    console.log((filteredList.filter((user) => user.admin)).length)
    return (
        <> 
            <Header/>
            <div className={rh.body}>
                <h1 className={rh.title}>Portal de Recursos Humanos</h1>
                <img src="./Ondinhas.svg" className={rh.separator}/>

                <h1 className={rh.titleUserList}>Lista de Usuários</h1>

                <div className={rh.searchUser}>
                    <MdPersonSearch className={rh.iconSearchUser} color="#5686e1" size={25}/>
                    <input type="search" className={rh.inputSearchUser} placeholder="Buscar por usuários" value={searchValue} onChange={(event) => handleSearchChange(event)}/>
                    <button onClick={() => handleSearch(searchValue)} className={rh.buttonSearchUserSubmit}>Pesquisar</button>

                    <div className={rh.searchUserSwitches}>
                        <label>
                            <Switch 
                                checked={checkedUser} 
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#269BDF"
                                offColor="#000000"
                                onChange={handleUserSwitchChange}
                                className={rh.searchUserSwitch}>
                            </Switch>
                            Mostrar usuários
                        </label>
                        
                        <label>
                            <Switch 
                                checked={checkedAdm} 
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#269BDF"
                                offColor="#000000"
                                onChange={handleAdmSwitchChange}
                                className={rh.searchUserSwitch}>
                            </Switch>
                            Mostrar administradores
                        </label>
                    </div>

                </div>

                {checkedAdm ? (
                  <p className={rh.results}>Mostrando {(filteredList.filter((user) => user.admin)).length} de {(filteredList.filter((user) => user.admin)).length} resultados</p>
                ) : (
                  checkedUser ? (
                    <p className={rh.results}>Mostrando {(filteredList.filter((user) => !user.admin)).length} de {(filteredList.filter((user) => !user.admin)).length} resultados</p>
                  ) : (
                    <p className={rh.results}>Mostrando {filteredList.length} de {usersList.length} resultados</p>
                  )
                )}

                <div className={rh.container}>
                  <div className={rh.cardGrid}>
                    {filteredList.map((user) => {
                      if(checkedAdm) {
                            return user.admin ? (
                                <RHAdmButton key={user.id} user={user} onClick={() => handleInspect(user)}/>
                            ) : (
                                <></>
                            )
                      } else if(checkedUser) {
                        return !(user.admin) ? (
                                <RHUserButton key={user.id} user={user} onClick={() => handleInspect(user)}/>
                            ) : (
                                <></>
                            )
                      } else if(!checkedUser && !checkedAdm) {
                        return user.admin ? (
                          <RHAdmButton key={user.id} user={user} onClick={() => handleInspect(user)}/>
                        ) : (
                          <RHUserButton key={user.id} user={user} onClick={() => handleInspect(user)}/>
                        )
                      } else return null;
                    })}
                    </div>

                  <div className={rh.buttons}>
                        {currentPage == 1 ? 
                        (<><button className={rh.disabled} disabled onClick={() => goToPreviousPage()}>
                            <MdArrowBackIos/>
                        </button></>): 
                        (<><button  onClick={() => goToPreviousPage()}>
                            <MdArrowBackIos/>
                        </button></>)}
                        
                        {usersList.length < 8
                         ? (<><button className={rh.disabled} disabled onClick={() => goToNextPage()}><MdArrowForwardIos/></button></>) : 
                         (<><button onClick={() => goToNextPage()}><MdArrowForwardIos/></button></>)}
                        
                    </div>
                </div>

                {isModalAdmOpen === true ? (
                    <ModalInspectAdm user={selectedUser} closeModal={handleClose}/>
                ) : (
                    isModalUserOpen === true && (
                        <ModalInspectUser user={selectedUser} closeModal={handleClose}/>
                    )
                )}

                <div className={rh.accountInfo}>
                    <h1>O que é esta conta?</h1>
                    <div className={rh.accountInfoDescription}>
                        <p>Nesse perfil, você pode tornar usuários administradores, gerenciar acessos e atualizar dados importantes do sistema. Use com responsabilidade para manter o controle e a segurança da plataforma!</p>
                        <MdQuestionMark size={120} className={rh.accountInfoIcon}/>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}

export default RH;
