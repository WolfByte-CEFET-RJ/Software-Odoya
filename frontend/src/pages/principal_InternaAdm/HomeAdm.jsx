import React, { useEffect, useState} from "react";
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "../principal_Interna/home.scss";
import DonationCard from "../../components/DonationCard/DonationCard.jsx";
import api from "../../api.js";
import CrowndfundingCard from "../../components/CrowndfundindCard/CrowndfundingCard.jsx";
import Mapa from "../../components/MapaComponent/Mapa.jsx"
import {Grid2} from "@mui/material"
import Calendar from "../../components/Calendar/Calendar.jsx";
import { toast } from "react-toastify";
import { MdOutlineAdd } from "react-icons/md";

const HomeAdm = () => {
    const [esponja, setEsponja] = useState(false);
    const [mutirao, setMutirao] = useState(false);
    const [address, setAddress] = useState({street: '', lat: '', long: ''});
    const [ponto, setPonto] = useState([])
    const [isModalCreatePointOpen, setModalCreatePoint] = useState(false);
    const [isModalUpdatePointOpen, setModalUpdatePoint] = useState(false);
    const [isModalCreateEventOpen, setModalCreateEvent] = useState(false);

    const handleClose = (modal) => {
        switch(modal) {
            case 'createPoint': setModalCreatePoint(false); break;
            case 'updatePoint': setModalUpdatePoint(false); break;
            case 'createEvent': setModalCreateEvent(false); break;
            default: break;
        }
    }

    let dados = [
        {
            idx:1,
            num:20,
            place:"Rua Gen. Canabarro - Maracanã",
            date: "19/03/2025",
            hour: "14:35",
            state: "presetne",
        },
        {   
            idx:2,
            num:20,
            place:"Rua Sambaetiba - Padre Miguel, n44",
            date: "19/03/2025",
            hour: "14:35",
            state: "analise"
        },
        {   
            idx:3,
            num:20,
            place:"Norte Shopping",
            date: "19/03/2025",
            hour: "14:35",
            state: "presente"
        },
        {   
            idx:4,
            num:20,
            place:"Rua Canabarro, n100",
            date: "19/03/2025",
            hour: "14:35",
            state: "faltou"
        },
    ]

    return (
        <>
        <Header/>
        <section className="welcome-section">
            <h1 className="welcome-titulo"> Bem vindo de volta, Adm</h1>
        </section>
        <img src="./Ondinhas.svg" className="separador" />
        <section className="escolhas-section">
            <h1 className="escolha-titulo"> Escolha o que deseja fazer a seguir:</h1>
            <div className="escolha-buttons">
                <button className="opcao1-escolha" onClick={() => {setEsponja(true);setMutirao(true)}}>Gerenciar pontos de coleta</button>
                <button className="opcao2-escolha" onClick={() => {setMutirao(true); setEsponja(false)}}>Gerenciar mutirões</button>
            </div>
        </section>
        
        { esponja ?
            <>
             <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Pontos de coleta registrado</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {ponto ? ponto.map((dado)=>(
                            <>
                            <DonationCard key={dado.id}  nome={dado.name} place={dado.location} state={dado.isInactive} setLocation={setAdress}/>
                            {/* <button onClick={initMap}></button> */}
                        </>
                        )) : <></>}
                    </Grid2>
                </section>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo">Adicionar Ponto de Coleta</h1>
                    <button className="addCollectionPoint"><MdOutlineAdd className="plusIcon"/></button>
                </section>
            </>
            : mutirao ?
            <>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Mutirões feitos</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {dados ? dados.map((dado)=>(
                        <CrowndfundingCard key={dado.idx}  crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                        )) : <></>}
                    </Grid2>
                </section>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Mutirões marcados</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {dados ? dados.map((dado)=>(
                        <CrowndfundingCard key={dado.idx}  crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                        )) : <></>}
                    </Grid2>
                </section>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo">Agendar Mutirão</h1>
                    <button className="addMutirao"><MdOutlineAdd className="plusIcon"/></button>
                </section>    
            </>
            :
            <>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Pontos de coleta Registrado</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {dados ? dados.map((dado)=>(
                        <DonationCard key={dado.idx}  num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                        )) : <></>}
                    </Grid2>
                </section>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Mutirões marcados</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {dados ? dados.map((dado)=>(
                        <CrowndfundingCard key={dado.idx}  crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                        )) : <></>}
                    </Grid2>
                </section>
            </>
        }
        
        {
            esponja ?
            <section id='map'className="section_map">
                <Mapa location={address} />
            </section>
            : mutirao ? 
            <section className="section_calendar">
                <Calendar/>
            </section>
            : <></>
        }

        <Footer/>
        </>
    )
};

export default HomeAdm;