import React from "react";
import Header from "../../components/Header";
import principal from "./principal.module.scss";
import { TbArrowRightDashed } from "react-icons/tb";
import { Link } from "react-router-dom";

const Principal = () => {
    return (
        <>
            <Header />
            <section className={principal.container}>
                <img src="./Banner.png" className={principal.banner} alt="Equipe Odoyá" />
            </section>
            <img src="./separador.png" className={principal.separador}/>
            <section className={principal.secao_equipe}>
                <h1 className={principal.titulo}>Junte-se a nós na Coleta de Esponjas!</h1>
                <div className={principal.textos_conteudo}>
                    <div>
                        <p className={principal.texto}><strong>Você sabia que as esponjas podem fazer uma grande diferença no meio ambiente? O projeto Odoyá convida você a se tornar parte dessa mudança!</strong></p>
                        <br/>
                        <div className={principal.subtitulo}>
                            <TbArrowRightDashed size={30}/>
                            <h2><strong>O que é o Odoyá: </strong></h2>
                        </div>
                        <p>Projeto composto por estudantes de graduação do CEFET/RJ determinados em trazer soluções para o meio ambiente e gerar ações que causem um impacto positivo e sustentável para o nosso planeta.</p>
                        <div className={principal.subtitulo}>
                            <TbArrowRightDashed size={30}/>
                            <h2><strong>Como Participar? </strong></h2>
                        </div>
                        
                            <p><strong>• Doe Esponjas: </strong>Se você tem esponjas usadas em casa e não         sabe o que fazer com elas, nós podemos ajudar! Cadastre-se   para doar e faremos a coleta.</p>
                            <p><strong>• Participe de Mutirões:</strong>Venha fazer parte dos nossos mutirões de coleta! Uma ótima oportunidade para ajudar a natureza e conhecer novas pessoas.</p>
                        <br/>
                        <p className={principal.texto}><strong>Pronto para fazer a diferença? Cadastre-se agora e junte-se a nós nessa missão!</strong></p>
                        <div className={principal.botao_container}>
                            <Link className={principal.botao} to="/register">Cadastre-se</Link>
                        </div>
                    </div>
                    <img src="./equipe.png" alt="Equipe Odoyá" />
                </div>
            </section>
        </>
    );
};

export default Principal;