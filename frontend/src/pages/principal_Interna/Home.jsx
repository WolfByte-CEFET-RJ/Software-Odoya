/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext, useRef } from "react";
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
  const [pointSection, setPointSection] = useState(false);
  const [eventSection, setEventSection] = useState(false);
  const [mapAddress, setMapAddress] = useState({ street: "", lat: "", long: "" });
  const [points, setPoints] = useState([]);
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAllDonations, setShowAllDonations] = useState(false);
  const [showAllPoints, setShowAllPoints] = useState(false);

  const { client, token } = useContext(UserContext);

  const coletaSectionRef = useRef(null);

  function changePagePoint(e) {
    e.preventDefault();
    setPointSection(true);
    setEventSection(false);
    setTimeout(() => {
      coletaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function changePageEvent(e) {
    e.preventDefault();
    setPointSection(false);
    setEventSection(true);
  }

  async function getScheduledEvents() {
    try {
      const req = await api.get("/events/scheduled");
      if (req.status === 200) {
        setEvents(req.data);
      }
    } catch (e) {
      if (e.response) {
        setTimeout(() => {
          toast.error(err.response.data.message);
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error(
            "Servidor não respondeu. Verifique sua conexão ou tente mais tarde."
          );
        }, 1000);
      }
    }
  }
  async function getDeposits() {
    try {
      const req = await api.get("/deposits");

      if (req.status === 200) {
        setDonations(req.data);
      }
    } catch (err) {
      if(!(err.response.status === 404)) {
        toast.error(err.response?.data?.message || "Servidor não respondeu. Verifique sua conexão ou tente mais tarde.")
        console.log(err);
      }
    }
  }

  async function getCollectionPoints() {
    try {
      const req = await api.get("/collectionPoints");
      console.log(await api.get("/collectionPoints"));
      setPoints(req.data);
    } catch (error) {
      if(!(error.response.status === 404)) {
        toast.error(error.response?.data?.message || "Servidor não respondeu. Verifique sua conexão ou tente mais tarde.");
        console.log(error);
      }
    }
    console.log(points);
  }

  useEffect(() => {
    if (token) {
      getCollectionPoints();
      getDeposits();
      getScheduledEvents();
    }
  }, [token]);

  const convertDate = (date) => {
    const dateUTC = new Date(date);
    dateUTC.setHours(dateUTC.getHours() + 3);

    // Data no horário de Brasília
    const brasiliaDate = dateUTC.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "America/Sao_Paulo",
    });

    // Hora no horário de Brasília
    const hour = dateUTC.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    });
    return { brasiliaDate, hour };
  };
  return (
    <>
      <Header />
      <section className="welcome-section">
        <h1 className="welcome-titulo"> Bem-vindo de volta, {client}</h1>
      </section>
      <img src="./Ondinhas.svg" className="separador" alt="Separador" />
      <section className="escolhas-section">
        <h1 className="escolha-titulo">
          {" "}
          Escolha o que deseja fazer a seguir:
        </h1>
        <div className="escolha-buttons">
          <button className="opcao1-escolha" onClick={changePagePoint}>
            {" "}
            Depositar esponjas
          </button>
          <button
            className="opcao2-escolha"
            // onClick={() => {
            //   toast.info("Tente novamente em breve!");
            // }}
            onClick={changePageEvent}
          >
            {" "}
            Participar de multirões
          </button>
        </div>
      </section>

      {pointSection && (
        <>
          <section className="sectionCards">
            <h1 className="sectionCards-titulo">Minhas doações recentes</h1>
            <Grid2
              container
              rowSpacing={{ xs: 2, sm: 5, md: 10 }}
              columnSpacing={{ xs: 1, sm: 5, md: 10 }}
            >
              {donations?.deposits?.length > 0 ? (
                <>
                  {(showAllDonations
                    ? donations.deposits
                    : donations.deposits.slice(0, 4)
                  ).map((dado) => {
                    const { brasiliaDate, hour } = convertDate(dado.created_at);

                    const location = points.find(
                      (p) => p.id === dado.collectionPointId
                    );

                    return (
                      <DonationCard
                        key={dado.id}
                        donate={true}
                        num={dado.amountSponges}
                        state={dado.status}
                        image={dado.imageURL}
                        place={
                          location
                            ? location.location
                            : "Endereço não disponível"
                        }
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

            {donations?.deposits?.length > 4 && (
              <div className="ver-mais-wrapper">
                <button
                  className="ver-mais-btn"
                  onClick={() => setShowAllDonations(!showAllDonations)}
                >
                  {showAllDonations ? "Ver menos" : "Ver tudo"}
                </button>
              </div>
            )}
          </section>

          <section ref={coletaSectionRef} className="sectionCards">
            <h1 className="sectionCards-titulo">Pontos de Coleta</h1>
            <Grid2
              container
              rowSpacing={{ xs: 2, sm: 5, md: 10 }}
              columnSpacing={{ xs: 1, sm: 5, md: 10 }}
            >
              {(showAllPoints ? points : points.slice(0, 4)).map((dado) => (
                <DonationCard
                  key={dado.id}
                  id={dado.id}
                  nome={dado.name}
                  place={dado.location}
                  state={dado.isInactive}
                  setLocation={setMapAddress}
                  open={true}
                />
              ))}
            </Grid2>

            {points.length > 4 && (
              <div className="ver-mais-wrapper">
                <button
                  className="ver-mais-btn"
                  onClick={() => setShowAllPoints(!showAllPoints)}
                >
                  {showAllPoints ? "Ver menos" : "Ver tudo"}
                </button>
              </div>
            )}
          </section>

          <section id="map" className="section_map">
            <Mapa location={mapAddress} />
          </section>
        </>
      )}

      {eventSection && (
        <>
          {/* <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Minhas Inscrições</h1>
            <Grid2 container rowSpacing={{ xs: 2, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 5, md: 10 }}>
              {dados.map((dado) => (
                <CrowndfundingCard key={dado.idx} state={dado.state} nome={dado.num} place={dado.place} date={dado.date} duration={dado.hour} />
              ))}
            </Grid2>
          </section> */}

          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
            <Grid2
              container
              rowSpacing={{ xs: 2, sm: 5, md: 10 }}
              columnSpacing={{ xs: 1, sm: 5, md: 10 }}
            >
              {events
                ?.sort((a, b) => {
                  const tzA = new Date(a.date);
                  const tzB = new Date(b.date);
                  return tzA - tzB;
                })
                .map((evento) => {
                  const { brasiliaDate, hour } = convertDate(evento.date);

                  return (
                    <CrowndfundingCard
                      key={evento.id}
                      crownd={true}
                      name={evento.name}
                      location={evento.location}
                      date={brasiliaDate}
                      hour={hour}
                    />
                  );
                })}
            </Grid2>
          </section>

          <section className="section_calendar">
            <Calendar eventos={events} />
          </section>
        </>
      )}

      {!pointSection && !eventSection && (
        <>
          <section className="sectionCards">
            <h1 className="sectionCards-titulo">Minhas doações recentes</h1>
            <Grid2
              container
              rowSpacing={{ xs: 2, sm: 5, md: 10 }}
              columnSpacing={{ xs: 1, sm: 5, md: 10 }}
            >
              {donations?.deposits?.length > 0 ? (
                <>
                  {(showAllDonations
                    ? donations.deposits
                    : donations.deposits.slice(0, 4)
                  ).map((dado) => {
                    const { brasiliaDate, hour } = convertDate(dado.created_at);
                    const location = points.find(
                      (p) => p.id === dado.collectionPointId
                    );
                    return (
                      <DonationCard
                        key={dado.id}
                        donate={true}
                        num={dado.amountSponges}
                        state={dado.status}
                        image={dado.imageURL}
                        place={
                          location
                            ? location.location
                            : "Endereço não disponível"
                        }
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

            {donations?.deposits?.length > 4 && (
              <div className="ver-mais-wrapper">
                <button
                  className="ver-mais-btn"
                  onClick={() => setShowAllDonations(!showAllDonations)}
                >
                  {showAllDonations ? "Ver menos" : "Ver tudo"}
                </button>
              </div>
            )}
          </section>

          <section className="sectionCards">
            <h1 className="sectionCards-titulo"> Próximos mutirões</h1>
            <Grid2
              container
              rowSpacing={{ xs: 2, sm: 5, md: 10 }}
              columnSpacing={{ xs: 1, sm: 5, md: 10 }}
            >
              {events
                ?.sort((a, b) => {
                  const tzA = new Date(a.date).getTime();
                  const tzB = new Date(b.date).getTime();
                  return tzA - tzB;
                })
                .map((evento) => {
                  const { brasiliaDate, hour } = convertDate(evento.date);

                  return (
                    <CrowndfundingCard
                      key={evento.id}
                      crownd={true}
                      name={evento.name}
                      location={evento.location}
                      date={brasiliaDate}
                      hour={hour}
                    />
                  );
                })}
            </Grid2>
          </section>
        </>
      )}

      <CuriositySection />
      <Footer />
    </>
  );
}

export default Home;
