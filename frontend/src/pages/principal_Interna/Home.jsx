/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./home.scss";
import DonationCard from "../../components/DonationCard/DonationCard.jsx";
import CuriositySection from "../../components/CuriositySection/CuriositySection.jsx";
import api from "../../api.js";
import CrowndfundingCard from "../../components/CrowndfundindCard/CrowndfundingCard.jsx";
import Mapa from "../../components/MapaComponent/Mapa.jsx";
import { Grid2 } from "@mui/material";
import Calendar from "../../components/Calendar/Calendar.jsx";
import { toast } from "react-toastify";
import { UserContext } from "../../components/Context/userContext";

function Home() {
  const [esponge, setEsponge] = useState(false);
  const [muti, setMuti] = useState(false);
  const [adress, setAdress] = useState({ street: '', lat: '', long: '' });
  const [point, setPoint] = useState([]);
  const [donations, setDonations] = useState([]);
  const { client, token } = useContext(UserContext);

  function changePageEsponge(e) {
    e.preventDefault();
    setEsponge(true);
    setMuti(false);
  }

  /*function changePageMuti(e) {
    e.preventDefault();
    setEsponge(false);
    setMuti(true);
  }

  const dados = [
    {
      idx: 1,
      num: 20,
      place: "Rua Gen. Canabarro - Maracanã",
      date: "19/03/2025",
      hour: "14:35",
      state: "presente",
    },
    {
      idx: 2,
      num: 20,
      place: "Rua Sambaetiba - Padre Miguel, n44",
      date: "19/03/2025",
      hour: "14:35",
      state: "analise"
    },
    {
      idx: 3,
      num: 20,
      place: "Norte Shopping",
      date: "19/03/2025",
      hour: "14:35",
      state: "presente"
    },
    {
      idx: 4,
      num: 20,
      place: "Rua Canabarro, n100",
      date: "19/03/2025",
      hour: "14:35",
      state: "faltou"
    },
  ];*/

  async function dadosDeps() {
    try {
      const req = await api.get("/deposits");
      
      if (req.status === 200) {
        setDonations(req.data);
      }
    } catch (err) {
      toast.error(err);
    }
  }

  async function getColectData() {
    try {
      const req = await api.get('/collectionPoints');
      setPoint(req.data);
    } catch (error) {
      setTimeout(() => {
        toast.error('Falha ao buscar os pontos de coleta');
      }, 1000);
    }
  }

  useEffect(() => {
    if(token){
      getColectData();
      dadosDeps();
    }
  }, [token]);

  return (
    <>
      <Header />
      <section className="welcome-section">
        <h1 className="welcome-titulo"> Bem vindo de volta, {client}</h1>
      </section>
      <img src="./Ondinhas.svg" className="separador" alt="Separador" />
      <section className="escolhas-section">
        <h1 className="escolha-titulo"> Escolha o que deseja fazer a seguir:</h1>
        <div className="escolha-buttons">
          <button className="opcao1-escolha" onClick={changePageEsponge}> Depositar esponjas</button>
          <button className="opcao2-escolha" onClick={()=>{toast.info("Tente novamente em breve!")}}> Participar de multirões</button>
        </div>
      </section>

      {esponge && (
        <>
          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Minhas doações recentes</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>

            {donations?.length > 0 ? (
              <>
                {donations.map((dado) => {
                  const date = new Date(dado.created_at);
                  const brasiliaDate = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'America/Sao_Paulo',
                  });
                  const hour = dado.created_at.split("T")[1]?.replace(/Z$/, '').substring(0, 5);

                  return (
                    <DonationCard
                      key={dado.id}
                      donate={true}
                      num={dado.amountSponges}
                      place={dado.point_name}
                      date={brasiliaDate}
                      hour={hour}
                    />
                  );
                })}
              </>
            ) : (
              <p>Nenhuma doação encontrada.</p>
            )}

            </Grid2>
          </section>

          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Pontos de Coleta</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
              {point.map((dado) => (
                <DonationCard
                  id={dado.id}
                  nome={dado.name}
                  place={dado.location}
                  state={dado.isInactive}
                  setLocation={setAdress}
                  open={true}
                />
              ))}
            </Grid2>
          </section>

          <section id="map" className="section_map">
            <Mapa location={adress} />
          </section>
        </>
      )}

      {/**
       * 
       *       {muti && (
        <>
          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Minhas Inscrições</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
              {dados.map((dado) => (
                <CrowndfundingCard key={dado.idx} state={dado.state} nome={dado.num} place={dado.place} date={dado.date} duration={dado.hour} />
              ))}
            </Grid2>
          </section>

          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
              {dados.map((dado) => (
                <CrowndfundingCard key={dado.idx} crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour} />
              ))}
            </Grid2>
          </section>

          <section className="section_calendar">
            <Calendar />
          </section>
        </>
      )}

       */}
      {!esponge && !muti && (
        <>
          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Minhas doações recentes</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
            {donations?.length > 0 ? (
              <>
                {donations.map((dado) => {
                  const date = new Date(dado.created_at);
                  const brasiliaDate = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'America/Sao_Paulo',
                  });
                  const hour = dado.created_at.split("T")[1]?.replace(/Z$/, '').substring(0, 5);
                  const location = point.find((p) => p.id === dado.collectionPointId);

                  return (
                    <DonationCard
                      key={dado.id}
                      donate={true}
                      num={dado.amountSponges}
                      state={dado.status}
                      place={location ? location.location : "Endereço não disponível"}
                      date={brasiliaDate}
                      hour={hour}
                    />
                  );
                })}

              </>
            ) : (
              <p>Nenhuma doação encontrada.</p>
            )}
            </Grid2>
          </section>

          {/**<section className="sectionCards">
            <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
              {dados.map((dado) => (
                <CrowndfundingCard key={dado.idx} crownd={true} num={dado.num} place={dado.place} date={dado.date} hour={dado.hour} />
              ))}
            </Grid2>
          </section> */}
        </>
      )}

      <CuriositySection />
      <Footer />
    </>
  );
}

export default Home;
