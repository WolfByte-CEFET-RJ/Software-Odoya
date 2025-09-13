 
import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineLogin, MdAssignmentInd, MdMenu, MdClose, MdHomeFilled, MdAccountCircle, MdLogout, MdEngineering, MdCollectionsBookmark, MdChangeHistory } from "react-icons/md";
import { Link } from "react-router-dom";
import header from "./header.module.scss";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { FaLeaf } from "react-icons/fa";
import MetricsModal from "../MetricsModal"
import { FaGear } from "react-icons/fa6";
import { useConfirmation } from "../ModalConfirmation/handleHook";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);
    const { confirm, ConfirmationModal } = useConfirmation()
    
    const {admin, logout, token, root, client} = useContext(UserContext)
    
    useEffect(() =>{
        if(token && client){
            setIsLoggedIn(true)
        }
    },[client, token])
    
    const handleLogout = async () => {
        const confirmed = await confirm("sair")
        if(confirmed){
            logout(); 
        }
    };

    return (
        <>
            <header className={header.container}>        
            
            
            <Link to={"/"}>
                <img src="/LogoBranca.svg" alt="Logo Odoyá" />
            </Link>

            <button className={header.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <MdClose size={30} color="#fff" /> : <MdMenu size={30} color="#fff" />}
            </button>

            <nav className={`${header.links} ${menuOpen ? header.open : ""}`}>
                {isLoggedIn ? (
                    <>    
                        <Link to={"/home"} className={header.link} onClick={() => setMenuOpen(false)}>
                                <MdHomeFilled color="#114C6D" />Tela inicial
                        </Link>    
                        
                        <Link to={"/profile"} className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdAccountCircle color="#114C6D" />Perfil
                        </Link>
                            
                        {admin == true ? (
                            <>
                                
                                <Link to={"/reports"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdCollectionsBookmark color="#114C6D" />Relatórios
                                </Link> 
                               

                                <Link to={"/homeAdm"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <FaGear color="#114C6D" />Portal do Administrador
                                </Link>    

                                <div className={header.link} onClick={() => {setShowMetrics(true)}}>
                                    <FaLeaf color="#114C6D" />
                                    Métricas
                                </div> 
                            
                            {root === true ? (
                                    <>
                                        <Link to={"/rh"} className={header.link} onClick={() => setMenuOpen(false)}>
                                            <MdEngineering color="#114C6D" />Recursos Humanos
                                        </Link>
                                    </>
                                    ) : null
                                }
        
                            </>
                        
                            ) : null
                        }
                        
                        <Link className={header.link} onClick={handleLogout}>
                            <MdLogout color="#114C6D" />Sair
                        </Link>
                    </>
                
                ) : (
                    <>
                        <Link to="/login" className={header.link} onClick={() => setMenuOpen(false)}>
                        <MdOutlineLogin color="#114C6D" />Entrar
                        </Link>
                        <Link to="/register" className={header.link} onClick={() => setMenuOpen(false)}>
                        <MdAssignmentInd color="#114C6D" />Cadastro
                        </Link>
                    </>
                    )
                }

            </nav>
        </header>

        <MetricsModal open={showMetrics} onClose={() => setShowMetrics(false)} />
        
        <ConfirmationModal />
        </>
        
    );
};

export default Header;
