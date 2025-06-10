import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import principal from "./principal.module.scss";
import { TbArrowRightDashed } from "react-icons/tb";
import { Link } from "react-router-dom";
import { HiMiniGlobeAmericas } from "react-icons/hi2";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import Footer from "../../components/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import api from "../../api";
import {toast} from "react-toastify"

const Principal = () => {

  const [metrics, setMetrics] = useState({});

  const imagensCarrossel = [
    "./ImagemCarrossel1.svg",
    "./ImagemCarrossel2.png",
    "./ImagemCarrossel3.png",
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metrics = await api.get("/metrics")
        console.log(metrics)
        setMetrics(metrics.data)
      } catch (e) {
        toast.error(e)
      }
    }

    fetchMetrics();
  }, [])

  const [indiceAtual, setIndiceAtual] = useState(0);

  const proximaImagem = () => {
    setIndiceAtual((indiceAtual + 1) % imagensCarrossel.length);
  };

  const imagemAnterior = () => {
    setIndiceAtual(
      (indiceAtual - 1 + imagensCarrossel.length) % imagensCarrossel.length
    );
  };

  return (
    <>
      <Header />
      <section className={principal.container}>
        <img
          src="./Banner.png"
          className={principal.banner}
          alt="Equipe Odoyá"
        />
      </section>
      <img src="./Ondinhas.svg" className={principal.separador} />
      <section className={principal.secao}>
        <h1 className={principal.titulo}>
          Junte-se a nós na Coleta de Esponjas!
        </h1>
        <div className={principal.textos_conteudo}>
          <div>
            <p className={principal.texto}>
              <strong>
                Você sabia que as esponjas podem fazer uma grande diferença no
                meio ambiente? O projeto Odoyá convida você a se tornar parte
                dessa mudança!
              </strong>
            </p>
            <br />
            <div className={principal.subtitulo}>
              <TbArrowRightDashed size={30} />
              <h2>
                <strong>O que é o Odoyá: </strong>
              </h2>
            </div>
            <p className={principal.texto}>
              Projeto composto por estudantes de graduação do CEFET/RJ
              determinados em trazer soluções para o meio ambiente e gerar ações
              que causem um impacto positivo e sustentável para o nosso planeta.
            </p>
            <div className={principal.subtitulo}>
              <TbArrowRightDashed size={30} />
              <h2>
                <strong>Como Participar? </strong>
              </h2>
            </div>

            <p className={principal.texto}>
              <strong>• Doe Esponjas: </strong>Se você tem esponjas usadas em
              casa e não sabe o que fazer com elas, nós podemos ajudar!
              Cadastre-se para doar e faremos a coleta.
            </p>
            <p className={principal.texto}>
              <strong>• Participe de Mutirões:</strong>Venha fazer parte dos
              nossos mutirões de coleta! Uma ótima oportunidade para ajudar a
              natureza e conhecer novas pessoas.
            </p>
            <br />
            <p className={principal.texto}>
              <strong>
                Pronto para fazer a diferença? Cadastre-se agora e junte-se a
                nós nessa missão!
              </strong>
            </p>
            <div className={principal.botao_container}>
              
              <Link className={principal.botao} to="/register">
                Cadastre-se
              </Link>
            </div>
          </div>
          <img
            src="./equipe.png"
            alt="Equipe Odoyá"
            className={principal.imagem}
          />
        </div>
      </section>
      <img src="./Ondinhas.svg" className={principal.separador} />
      <section className={principal.secao2}>
        <h1 className={principal.titulo}>Sobre o Projeto</h1>
        <div className={principal.caracteristicas}>
          <div>
            <div className={principal.card}>
              <h2>Missão</h2>
              <p className={principal.texto}>
                Promover a conservação do meio ambiente e dos recursos hídricos,
                através da conscientização da população e do desenvolvimento de
                soluções de destinação e reaproveitamento de esponjas plásticas,
                de forma a apoiar a construção de uma sociedade mais sustentável
                na cidade do Rio de Janeiro.
              </p>
              <img src="./target.png" className={principal.icone} alt="" />
            </div>
            <div className={principal.card}>
              <h2>Objetivos Específicos</h2>
              <p className={principal.texto}>
                Promover o letramento ambiental nas comunidades locais focando
                no público jovem Introduzir a esponja plástica na economia
                circular criando meios de coleta e reutilização do material
                Incentivar a adoção do uso da bucha vegetal na sociedade
                Conectar organizações ambientais na limpeza de regiões próximas
                a corpos hídricos
              </p>
              <img src="./flag.png" className={principal.icone} alt="" />
            </div>
          </div>
          <div>
            <div className={principal.card}>
              <h2>Visão</h2>
              <p className={principal.texto}>
                Ser um negócio de impacto socioambiental, de referência na
                cidade do Rio de Janeiro, no desenvolvimento de produtos e
                serviços inovadores, que promovam o reaproveitamento de esponjas
                plásticas e a conservação dos recursos hídricos.
              </p>
              <img
                src="./visibility.png"
                className={principal.icone_olho}
                alt=""
              />
            </div>
            <div className={principal.card}>
              <h2>Valores</h2>
              <div className={principal.valores}>
                <div>
                  <HiMiniGlobeAmericas size={40} color="00B8F1" />
                  <p>Sustentabilidade</p>
                </div>
                <div>
                  <MdOutlineMenuBook size={40} color="00B8F1" />
                  <p>Educação Ambiental</p>
                </div>
              </div>
              <div className={principal.valores}>
                <div>
                  <FaRegLightbulb size={40} color="00B8F1" />
                  <p>Inovação</p>
                </div>
                <div>
                  <FaPeopleGroup size={40} color="00B8F1" />
                  <p>Empoderamento Comunitário</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <img src="./Ondinhas.svg" className={principal.separador} />

      <section className={principal.secao3}>
        <div style={{height:"130px"}}></div>
        <h1 className={principal.titulo}>Nossas Ações </h1>
        <div className={principal.line}>
          <div className={principal.listaActions}>
            <div className={principal.field}>
              <TbArrowRightDashed size={30} color="269BDF" />
              <h2>Coleta de Esponjas</h2>
            </div>
            <div className={principal.field}>
              <TbArrowRightDashed size={30} color="269BDF" />
              <h2>Letramento Ambiental</h2>
            </div>
            <div className={principal.field}>
              <TbArrowRightDashed size={30} color="269BDF" />
              <h2>Mutirões de Limpeza</h2>
            </div>
          </div>  
          <div className={principal.partedebaixo}>
          <div className={principal.slider}>
            <button className={principal.setas} onClick={imagemAnterior}>
              <IoIosArrowBack size={100} />
            </button>
            <div className={principal.imagem}>
              <img src={imagensCarrossel[indiceAtual]} style={{ width: "100%" }} />
            </div>
            <button className={principal.setas} onClick={proximaImagem}>
              <IoIosArrowForward size={100} />
            </button>
          </div>
          <h2 className={principal.titulo2}>Objetivos de desenvolvimento sustentável</h2>
          <div className={principal.ordem}>
              <div className={principal.cards}>
                <img src="Obj13.svg"/>
              </div>
            
          
              <div className={principal.cards}>
                <img src="Obj6.svg"/>
              </div>
        
            
              <div className={principal.cards}>
                <img src="Obj12.svg"/>
              </div>
              <div className={principal.cards}>
                  <img src="Obj4.svg"/>
              </div>
            </div>
          </div>
        </div>
      
      </section>
      <img src="./Ondinhas.svg" className={principal.separador} />

      <section className={principal.secao4}>
        <div className={principal.resultados}>
          <div className={principal.titulo}>
            <h2>Nossos</h2> 
            <h2>Principais</h2>
            <h2>Resultados</h2> 
          </div>
          <div className={principal.resultados2}> 
            <p>{metrics.climateInitiatives} ações contra mudança climática</p>
            <p>{metrics.kgRecycled} KG de lixo reciclável coletado</p>
            <p>{metrics.spongesCollected} esponjas coletadas</p>
            <p>{metrics.totalEvents} mutirões bem-sucessedidos</p>
          </div>
        </div>
          <div className={principal.parceiros}>
            <div className={principal.logos}>

              <div className={principal.parlog}>
                <div className={principal.linha}>
                  {metrics?.partners?.map((p, i)=>{
                    return <img key={i} src={p.logo} alt={p.name} />
                  })}
                </div>

                <h2 className={principal.titulo}>Parcerias</h2>
              </div>

            </div>
          </div>
        </section>
      <Footer />
    </>
  );
};

export default Principal;
