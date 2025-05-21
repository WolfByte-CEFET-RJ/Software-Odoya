import React, { useEffect, useState } from "react";
import HeaderInterno from "../../components/header_Interno/headerInterno.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./home.scss";
import DonationCard from "../../components/DonationCard/DonationCard.jsx";
import CuriositySection from "../../components/CuriositySection/CuriositySection.jsx";
import api from "../../api.js";
import CrowndfundingCard from "../../components/CrowndfundindCard/CrowndfundingCard.jsx";
import Mapa from "../../components/MapaComponent/Mapa.jsx"
import {Grid2} from "@mui/material"
import Calendar from "../../components/Calendar/Calendar.jsx";
import { toast } from "react-toastify";
function Home(){
    const[user, setUser] = useState();
    const[esponge, setEsponge] = useState(false);
    const[muti, setMuti] = useState(false);
    const[adress, setAdress] = useState({ street: '', lat: '', long: '' })
    const[point, setPoint] = useState([]);

    function changePageEsponge(e){
        e.preventDefault()
        setEsponge(true);
        setMuti(false);
    }
    function changePageMuti(e){
        e.preventDefault()
        setEsponge(false);
        setMuti(true);
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
    async function getColectData(){

        try{
            let req = await api.get('/collectionPoints')
            // console.log(req.data)
            setPoint(req.data)
            
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                toast.error('Falha ao buscar os pontos de coleta');
            }, 1000);
        }
    }
    
    async function getUser(){
        try{
                let req = await api.get('/user')
                console.log(req)
                setUser(req.data)
        }catch (error){
            setTimeout(()=>{
                toast.error('Falha ao capturar os dados do usuário')
            },1000)

        }
    }

    useEffect(()=>{
        getColectData()
        getUser()
    },[])

    return(
        <>
            {/* {user ?  */}
            <>
                <HeaderInterno/>
                <section className="welcome-section">
                    <h1 className="welcome-titulo"> Bem vindo de volta, {`${user}`}</h1>
                </section>
                <img src="./Ondinhas.svg" className="separador" />
                <section className="escolhas-section">
                    <h1 className="escolha-titulo"> Escolha o que deseja fazer a seguir:</h1>
                    <div className="escolha-buttons">
                        <button className="opcao1-escolha" onClick={changePageEsponge}> Depositar esponjas</button>
                        <button className="opcao2-escolha" onClick={changePageMuti}> Participar de multirões</button>
                    </div>
                </section>
                { esponge ?
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Minhas doações recentes</h1>
                        <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                            {dados ? dados.map((dado)=>(
                            <DonationCard key={dado.idx} donate={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                            )) : <></>}
                        </Grid2>
                    </section>
                    :  muti ? 
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Minhas Inscrições</h1>
                        <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                            {dados ? dados.map((dado)=>(
                            <CrowndfundingCard key={dado.idx}  state={dado.state} nome={dado.num} place={dado.place} date={dado.date} duration={dado.hour}/>
                            )) : <></>}
                        </Grid2>
                    </section>
                    :
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Minhas doações recentes</h1>
                        <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                            {dados ? dados.map((dado)=>(
                            <DonationCard key={dado.idx}  donate={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                            )) : <></>}
                        </Grid2>
                    </section>
                        
                }
                { esponge ?
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Pontos de Coleta</h1>
                        <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                            {point ? point.map((dado)=>(
                                <>
                                <DonationCard key={dado.id}  nome={dado.name} place={dado.location} state={dado.isInactive} setLocation={setAdress}/>
                                {/* <button onClick={initMap}></button> */}
                            </>
                            )) : <></>}
                        </Grid2>
                    </section>
                    :  muti ? 
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
                        <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                            {dados ? dados.map((dado)=>(
                            <CrowndfundingCard key={dado.idx}  crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                            )) : <></>}
                        </Grid2>
                    </section>
                    :
                    <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
                    <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
                        {dados ? dados.map((dado)=>(
                            <CrowndfundingCard key={dado.idx}  crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                        )) : <></>}
                    </Grid2>
                </section>
                        
                }
                {
                    esponge ?
                    <section id='map'className="section_map">
                        <Mapa location={adress} />
                    </section>
                    : muti ? 
                    <section className="section_calendar">
                        <Calendar/>
                    </section>
                    : <></>
                }
                <CuriositySection/>
                <Footer/>
            </> 
            {/* :<></>} */}
            
        </>
    )
}

export default Home;