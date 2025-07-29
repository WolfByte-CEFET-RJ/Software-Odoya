import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "../principal_Interna/home.scss";
import DonationCard from "../../components/DonationCard/DonationCard.jsx";
import api from "../../api.js";
import CrowndfundingCard from "../../components/CrowndfundindCard/CrowndfundingCard.jsx";
import { Grid2 } from "@mui/material";
import { toast } from "react-toastify";
import { MdOutlineAdd } from "react-icons/md";
import CreatePointModal from "../../components/Modals/CreatePointModal.jsx";
import CreateEventModal from "../../components/Modals/CreateEventModal.jsx";

const HomeAdm = () => {
  const [esponja, setEsponja] = useState(false);
  const [pontos, setPontos] = useState([]);
  const [isModalCreatePointOpen, setModalCreatePoint] = useState(false);
  const [isModalCreateEventOpen, setModalCreateEvent] = useState(false);
  const [showAllPoints, setShowAllPoints] = useState(false);

  const coletaSectionRef = useRef(null);  

  async function getCollectionPoints() {
    try {
      const res = await api.get("/collectionPoints");
      if (res.status === 200) {
        setPontos(res.data);
      }
    } catch (error) {
      if (error.response) {
        setTimeout(() => {
          toast.error(error.response.data.message);
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error("Servidor não respondeu. Verifique sua conexão ou tente mais tarde.");
        }, 1000);
      }
    }
  }

  useEffect(() => {
    getCollectionPoints();
  }, []);
  return (
    <>
      <Header />
      <section className="welcome-section">
        <h1 className="welcome-titulo"> Bem-vindo, Administrador!</h1>
      </section>
      <img src="./Ondinhas.svg" className="separador" alt="Separador" />

      <section className="escolhas-section">
        <h1 className="escolha-titulo"> Escolha o que deseja fazer a seguir:</h1>
        <div className="escolha-buttons">
          <button
            className="opcao1-escolha"
            onClick={() => {
              setEsponja(true);
                  setTimeout(() => {
                    coletaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                  }, 100); 
            }}
          >
            Gerenciar pontos de coleta
          </button>
          <button
            className="opcao2-escolha"
            onClick={() => toast.info("Tente novamente em breve!")}
          >
            Gerenciar mutirões
          </button>
        </div>
      </section>

      <section ref={coletaSectionRef} className="sectionCards">
        <h1 className="sectionCards-titulo">Pontos de coleta registrados</h1>
        <Grid2
          container
          rowSpacing={{ xs: 2, sm: 5, md: 10 }}
          columnSpacing={{ xs: 1, sm: 5, md: 10 }}
        >
          {(showAllPoints ? pontos : pontos.slice(0, 4)).map((dado) => (
            <DonationCard
            key={dado.id}
            id={dado.id}
            nome={dado.name}
            place={dado.location}
            state={dado.isInactive}
            amount={dado.amountSponges}
            capacitySponges={dado.capacitySponges}
            lastCollectionDate={dado.lastCollectionDate}
            nextCollectionDate={dado.nextCollectionDate}
            setLocation={null}
            open={false}
            />
          ))}
        </Grid2>

        {pontos.length > 4 && (
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

      {esponja && (
        <section className="sectionCards">
          <h1 className="sectionCards-titulo">Adicionar Ponto de Coleta</h1>
          <button
            className="addCollectionPoint"
            onClick={() => setModalCreatePoint(true)}
          >
            <MdOutlineAdd className="plusIcon" />
          </button>
        </section>
      )}

      <CreatePointModal
        open={isModalCreatePointOpen}
        onClose={() => setModalCreatePoint(false)}
      />

      <CreateEventModal
        open={isModalCreateEventOpen}
        onClose={() => setModalCreateEvent(false)}
        onConfirm={pontos}
      />

      <Footer />
    </>
  );
};

export default HomeAdm;
