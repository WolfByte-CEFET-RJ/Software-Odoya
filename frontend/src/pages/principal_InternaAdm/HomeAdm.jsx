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
import CreatePointModal from "../../components/Modals/CreatePointModal.jsx";

import CreateEventModal from "../../components/Modals/CreateEventModal.jsx";


const HomeAdm = () => {
    const [esponja, setEsponja] = useState(false);
    const [mutirao, setMutirao] = useState(false);
    
    const [pontos, setPontos] = useState([])
    const [isModalCreatePointOpen, setModalCreatePoint] = useState(false);
    
    const [isModalCreateEventOpen, setModalCreateEvent] = useState(false);

    async function getCollectionPoints() {
        try {
            let res = await api.get("/collectionPoints");
            if( res.status === 200){
            setPontos(res.data);}
        } catch(error) {
            console.log(error);
            if(error.response){
                setTimeout(() => {
                    toast.error(error.response.data.message);
                }, 1000);
                }else{
                    setTimeout(() => {
                        toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
                    }, 1000);
                }
        }
    }

    
    let dados = []
    useEffect(() => {
        getCollectionPoints();
    }, []);
console.log(pontos)
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
                    <h1 className="sectionCards-titulo"> Pontos de coleta registrados</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {pontos ? pontos.map((dado)=>(
                            <>
                            <DonationCard key={dado.id}  nome={dado.name} place={dado.location} state={dado.isInactive} setLocation={null} open={false}/>
                            {/* <button onClick={initMap}></button> */}
                        </>
                        )) : <></>}
                    </Grid2>
                </section>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo">Adicionar Ponto de Coleta</h1>
                    <button className="addCollectionPoint" onClick={() => setModalCreatePoint(true)}><MdOutlineAdd className="plusIcon"/></button>
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
                    <button className="addMutirao" onClick={() => setModalCreateEvent(true)}><MdOutlineAdd className="plusIcon"/></button>
                </section>    
            </>
            :
            <>
                <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Pontos de coleta registrados</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {pontos && pontos.map((dado)=>(
                            <DonationCard id={dado.id}  num={dado.amountSponges} nome={dado.name} place={dado.location} state={dado.isInactive} setLocation={null}/>
                        ))}
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
        
        

            <CreatePointModal 
            open={isModalCreatePointOpen}
            onClose={() => setModalCreatePoint(false)}
            
            />

           

            <CreateEventModal
            open={isModalCreateEventOpen}
            onClose={() => setModalCreateEvent(false)}
            onConfirm={(pontos)}
            />


        <Footer/>
        </>
    )
};

export default HomeAdm;