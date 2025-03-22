import React from "react";
import Header from "../../components/Header";
import principal from "./principal.module.scss";
import { TbArrowRightDashed } from "react-icons/tb";
import { Link } from "react-router-dom";
import { HiMiniGlobeAmericas } from "react-icons/hi2";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import Footer from "../../components/Footer";
import { RiInfinityLine } from "react-icons/ri";
import { RiGraduationCapLine } from "react-icons/ri";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Principal = () => {
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
            <p>
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

            <p>
              <strong>• Doe Esponjas: </strong>Se você tem esponjas usadas em
              casa e não sabe o que fazer com elas, nós podemos ajudar!
              Cadastre-se para doar e faremos a coleta.
            </p>
            <p>
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
              {/*
              <Link className={principal.botao} to="/register">
                Cadastre-se
              </Link>*/}
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
              <p>
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
              <p>
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
              <p>
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
        <h1 className={principal.titulo}>Nossas Ações </h1>
        <div className={principal.line}>
          <div className={principal.listaActions}>
            <div className={principal.field}>
              <TbArrowRightDashed size={30} color="269BDF" />
              <h2>Coleta de Esponjas</h2>
            </div>
            <div className={principal.field}>
              <TbArrowRightDashed size={30} color="269BDF" />
              <h2>Coleta de Esponjas</h2>
            </div>
            <div className={principal.field}>
              <TbArrowRightDashed size={30} color="269BDF" />
              <h2>Coleta de Esponjas</h2>
            </div>
          </div>  
          <div className={principal.partedebaixo}>
          <div className={principal.slider}>
            <div className={principal.setas}>
            <IoIosArrowBack size={100}/>
            </div>
            <div className={principal.setas}>
            <IoIosArrowForward size={100}/>
            </div>
            {/*Criar slider/carrosel aqui*/}
          </div>
          <h2 className={principal.titulo2}>Objetivos de desenvolvimento sustentável</h2>
          <div className={principal.ordem}>
          <div className={principal.cards}>
            
              <div className={principal.field2}>
                <RiGraduationCapLine size={40} color="195D39"/>
                <h2 className={principal.objetivos}>Educação de Qualidade</h2>
              </div>
            </div>
        
          <div className={principal.cards}>
              <div className={principal.field2}>
                <RiInfinityLine size={40} color="195D39"/>
                <h2 className={principal.objetivos}>Consumo e Produção Saudável</h2>
              </div>
          </div>
      
          
          <div className={principal.cards}>
              <div className={principal.field2}>
                <MdOutlineWaterDrop size={40} color="195D39"/>
                <h2 className={principal.objetivos}>Água Potável e Saneamento</h2>
              </div>
            </div>
            <div className={principal.cards}>
              <div className={principal.field2}>
                <FaTemperatureArrowDown size={40} color="195D39"/>
                <h2 className={principal.objetivos}>Ação contra a mudança Global do clima </h2>
              </div>
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
            <p>x esponjas coletadas</p>
            <p>x pessoas alcançadas online</p>
            <p>x KG de lixo reciclável coletado</p>
            <p>x pessoas certificadas nas atividades</p>
          </div>
        </div>

        <div className={principal.parceiros}>
          <div className={principal.logos}>
            <div className={principal.img1}>
            <img src="./parceiro1.png" alt="Parceiro 1" />
            <img src="./parceiro2.png" alt="Parceiro 2" />
            <img src="./parceiro3.png" alt="Parceiro 3" />
            </div>

            <div className={principal.img2}>
            <img src="./parceiro4.png" alt="Parceiro 4" />
            <img src="./parceiro5.png" alt="Parceiro 5" />
            <img src="./parceiro6.png" alt="Parceiro 6" />
            </div>
          </div>
          <h2 className={principal.titulo}>Parcerias</h2>
        </div>
      </section>


      <Footer />
    </>
  );
};

export default Principal;
