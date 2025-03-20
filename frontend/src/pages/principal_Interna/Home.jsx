import React, { useState } from "react";
import HeaderInterno from "../../components/header_Interno/headerInterno.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./home.scss";
import DonationCard from "../../components/DonationCard/DonationCard.jsx";
import CuriositySection from "../../components/CuriositySection/CuriositySection.jsx";
import api from "../../api.js";
import CrowndfundingCard from "../../components/CrowndfundindCard/CrowndfundingCard.jsx";
function Home(){
    const[user, setUser] = useState("user");
    const[esponge, setEsponge] = useState(false);
    const[muti, setMuti] = useState(false);

    // async function fetchUser(){
    //     try{
    //         let res = await api.get("/user");
    //         if(res.data){
    //             setUser(res)
    //         }
    //     }catch(error){

    //     }
    // }

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
            num:20,
            place:"Rua Canabarro, n100",
            date: "19/03/2025",
            hour: "14:35",
            state: "presetne",
        },
        {
            num:20,
            place:"Rua Canabarro, n100",
            date: "19/03/2025",
            hour: "14:35",
            state: "analise"
        },
        {
            num:20,
            place:"Rua Canabarro, n100",
            date: "19/03/2025",
            hour: "14:35",
            state: "presente"
        },
        {
            num:20,
            place:"Rua Canabarro, n100",
            date: "19/03/2025",
            hour: "14:35",
            state: "faltou"
        },
    ]
    return(
        <>
            {user ? 
            <>
                <HeaderInterno/>
                <section className="welcome-section">
                    <h1 className="welcome-titulo"> Bem vindo de volta, {`${user}`}</h1>
                </section>
                <img src="./Ondinhas.svg" className="separador" />
                <section className="escolhas-section">
                    <h1 className="escolha-titulo"> Escolha o que deseja fazer a seguir:</h1>
                    <div className="escolha-buttons">
                        <button className="op1-escolha" onClick={changePageEsponge}> Depositar esponjas</button>
                        <button className="op2-escolha" onClick={changePageMuti}> Participar de multirões</button>
                    </div>
                </section>
                { esponge ?
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Minhas doações recentes</h1>
                        <div className="sectionCards-grid">
                            {dados ? dados.map((dado)=>(
                            <DonationCard donate={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                            )) : <></>}
                        </div>
                    </section>
                    :  muti ? 
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Minhas Inscrições</h1>
                        <div className="sectionCards-grid">
                            {dados ? dados.map((dado)=>(
                            <CrowndfundingCard state={dado.state} nome={dado.num} place={dado.place} date={dado.date} duration={dado.hour}/>
                            )) : <></>}
                        </div>
                    </section>
                    :
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Minhas doações recentes</h1>
                        <div className="sectionCards-grid">
                            {dados ? dados.map((dado)=>(
                            <DonationCard donate={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                            )) : <></>}
                        </div>
                    </section>
                        
                }
                { esponge ?
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Pontos de Coleta</h1>
                        <div className="sectionCards-grid">
                            {dados ? dados.map((dado)=>(
                            <DonationCard nome={dado.num} place={dado.place} state={dado.date}/>
                            )) : <></>}
                        </div>
                    </section>
                    :  muti ? 
                    <section className="sectionCards">
                        <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
                        <div className="sectionCards-grid">
                            {dados ? dados.map((dado)=>(
                            <CrowndfundingCard crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                            )) : <></>}
                        </div>
                    </section>
                    :
                    <section className="sectionCards">
                    <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
                    <div className="sectionCards-grid">
                        {dados ? dados.map((dado)=>(
                            <CrowndfundingCard crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour}/>
                        )) : <></>}
                    </div>
                </section>
                        
                }
                {
                    esponge ?
                    <section className="section_map">

                    </section>
                    : muti ? 
                    <section className="section_calendar">

                    </section>
                    : <></>
                }
                <CuriositySection/>
                <Footer/>
            </> 
            :<></>}
            
        </>
    )
}

export default Home;