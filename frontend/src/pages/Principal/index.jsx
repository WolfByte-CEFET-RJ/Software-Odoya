import React from "react";
import Header from "../../components/Header";
import principal from "./principal.module.scss";
import { TbArrowRightDashed } from "react-icons/tb";
import { Link } from "react-router-dom";
import { HiMiniGlobeAmericas } from "react-icons/hi2";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

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
    </>
  );
};

export default Principal;
