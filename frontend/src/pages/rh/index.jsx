import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RHUserButton from "../../components/RHUserButton";
import RHAdmButton from "../../components/RHAdmButton";
import ModalInspectAdm from "../../components/ModalInspectAdm";
import ModalInspectUser from "../../components/ModalInspectUser";
import Switch from "react-switch";
import { useContext } from "react";
import { UserContext } from "../../components/Context/userContext";
import rh from "./rh.module.scss";
import { MdPersonSearch, MdQuestionMark, MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../../api"


const RH = () => {
    const [searchValue, setSearchValue] = useState('')
    const [isModalUserOpen, setModalUserOpen] = useState(false);
    const [isModalAdmOpen, setModalAdmOpen] = useState(false);
    const [checkedUser, setCheckedUser] = useState(false);
    const [checkedAdm, setCheckedAdm] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersList, setUsersList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);

    const {admin} = useContext(UserContext);

    const USERS_PER_PAGE = 16;

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

    async function getTotalUsers() {
        try {
            let req = await api.get("/root/user/all");
            if(req.status === 200) {
                setTotalUsers(req.data.users.length);
            }
        } catch(error) {
            console.log(error);
            toast.error("Erro ao obter número total de usuários!")
        }
    }

    async function getUsersData() {
        try {
            let query = `/root/user?page=${currentPage}&limit=${USERS_PER_PAGE}`;
            
            if(checkedAdm) {
                query += '&isadm=1';
            } else if(checkedUser) {
                query += '&isadm=0';
            }

            const req = await api.get(query);
            if(req.status === 200) {
                if(searchValue != "") {
                    const list = req.data.users.filter((user) => {
                        return user.name.toLowerCase().includes(searchValue.toLowerCase());
                    })

                    setUsersList(list);
                } else {
                    setUsersList(req.data.users);
                }
                setTotalPages(req.data.totalPages);
            }
        } catch(error) {
            console.log(error);
            toast.error("Erro ao obter dados dos usuários!")
        }
    }

    useEffect(() => {
        if(admin) {
            getTotalUsers();
            getUsersData();
        }
    }, [admin, checkedUser, checkedAdm, searchValue, currentPage])

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

                {usersList.length !== 0 ? (
                    checkedAdm ? (
                        <p className={rh.results}>Mostrando {(usersList.filter((user) => user.admin)).length} de {totalUsers} resultados</p>
                    ) : (
                    checkedUser ? (
                        <p className={rh.results}>Mostrando {(usersList.filter((user) => !user.admin)).length} de {totalUsers} resultados</p>
                    ) : (
                        <p className={rh.results}>Mostrando {usersList.length} de {totalUsers} resultados</p>
                    )
                    )
                ) : (
                    <></>
                )
                }

                <div className={rh.container}>
                  <div className={rh.cardGrid}>
                    {usersList.map((user) => {
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

                    {usersList.length === 0 &&
                        <p className={rh.resultsError}>Não há resultados nesta página para os filtros utilizados.</p>
                    }
                    </div>

                  <div className={rh.buttons}>
                        {!(totalPages == 1) &&
                            <>
                            {currentPage == 1 ? (
                                <button className={rh.disabled} disabled>
                                    <MdArrowBackIos size={25} color="grey"/>
                                </button>
                            ) : (
                                <button onClick={() => setCurrentPage(currentPage-1)}>
                                    <MdArrowBackIos size={25} color="black"/>
                                </button>
                            )}
                            
                            <p>{currentPage} / {totalPages}</p>

                            {currentPage == totalPages ? (
                                <button className={rh.disabled} disabled>
                                    <MdArrowForwardIos size={25} color="grey"/>
                                </button>
                            ) : (
                                <button onClick={() => setCurrentPage(currentPage+1)}>
                                    <MdArrowForwardIos size={25} color="black"/>
                                </button>
                            )}
                            </>
                        }
                        
                    </div>
                </div>

                {isModalAdmOpen === true ? (
                    <ModalInspectAdm user={selectedUser} closeModal={handleClose}/>
                ) : (
                    isModalUserOpen === true && (
                        <ModalInspectUser user={selectedUser} closeModal={handleClose}/>
                    )
                )}

                <section className={rh.accountInfo}>
                    <h1>O que é esta conta?</h1>
                    <div className={rh.accountInfoDescription}>
                        <p>Nesse perfil, você pode tornar usuários administradores, gerenciar acessos e atualizar dados importantes do sistema. Use com responsabilidade para manter o controle e a segurança da plataforma!</p>
                        <MdQuestionMark size={180} className={rh.accountInfoIcon}/>
                    </div>
                </section>
            </div>

            <Footer/>
        </>
    );
}

export default RH;
