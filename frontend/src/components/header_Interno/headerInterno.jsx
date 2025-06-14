import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout, MdPerson, MdPanoramaFishEye, MdClose, MdMenu, MdOutlineAccountCircle } from "react-icons/md";
import { PiUserCircleFill } from "react-icons/pi";
import '../../styles/headerInterno.scss';
// import header from "../Header/header.module.scss";

function HeaderInterno(){
   const [menuOpen, setMenuOpen] = useState(false);
   
       return (
           <header className="headerInterno-Container">
               <Link to="/">
                   <img src="/LogoBranca.svg" alt="Logo Odoyá" />
               </Link>
               <button className="headerInterno-Button" onClick={() => setMenuOpen(!menuOpen)}>
                   {menuOpen ? <MdClose size={30} color="#fff" /> : <MdMenu size={30} color="#fff" />}
               </button>
               <nav className={`headerInterno_opLinks ${menuOpen ? "menu_open" : ""}`}>
                   <Link to="" className="opLink" onClick={() => setMenuOpen(false)}>
                   <PiUserCircleFill size={27} color="#114C6D"/>Perfil
                        {/* <div className="icon-perfil"><MdPanoramaFishEye size={24} className="icon-perfil-l" color="#114C6D"/><MdPerson className="icon-perfil-r" color="#114C6D"/></div>Perfil */}
                   </Link>
                   <Link to="" className="opLink" onClick={() => setMenuOpen(false)}>
                        <MdOutlineLogout size={25} color="#114C6D" />Sair
                   </Link>
               </nav>
           </header>
       );
};

export default HeaderInterno;