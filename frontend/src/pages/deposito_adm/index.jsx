import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./deposito.module.scss"
import { useState } from "react";
import { Pointer } from "lucide-react";
const DepositoAdm = () => {
    const [pontoNome, setPontoNome] = useState('Tijuca')
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [paginas, setPaginas] = useState([])
    return(
        <div className={styles.body}>
            <Header/>
            <div className={styles.ondas_background}>
                <img src="../public/Ondinhas.svg" className={styles.separador} />
            </div>
            <div className={styles.divPrincipal}>
                <h2 style={{textAlign: "center", marginBottom: "5%"}}>Ponto de Coleta {pontoNome}</h2>
                <p>Registro de depósitos</p>
                <div className={styles.retangulo}>
                    <img style={{paddingLeft: "2%"}} src="../public/SearchClient.png" alt="" />
                    <input className={styles.input} type="text" placeholder="Buscar por depósitos" />
                </div>
                <div className={styles.registros}>
                    <ul className={styles.grid}>
                        <li className={styles.card}>
                            <div className={styles.line}>
                                <img src="../public/user.png" alt="" />
                                <p className={styles.text} >Nome: John Doe</p>
                            </div>
                            <div className={styles.line}>
                                <img src="../public/DownloadingUpdates.png" alt="" />
                                <p className={styles.text}>Quantidade: XXXX</p>
                            </div>
                            <div style={{cursor: "pointer"}} className={styles.line}>
                                <img src="../public/picture.png" alt="" />
                                <p className={styles.text}>Clique para ver comprovante</p>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.valida}><p className={styles.text}>Validar</p></div>
                                <div className={styles.reprova}><p className={styles.text}>Reprovar</p></div>
                            </div>
                        </li>

                        <li className={styles.card}>
                            <div className={styles.line}>
                                <img src="../public/user.png" alt="" />
                                <p className={styles.text} >Nome: John Doe</p>
                            </div>
                            <div className={styles.line}>
                                <img src="../public/DownloadingUpdates.png" alt="" />
                                <p className={styles.text}>Quantidade: XXXX</p>
                            </div>
                            <div style={{cursor: "pointer"}} className={styles.line}>
                                <img src="../public/picture.png" alt="" />
                                <p className={styles.text}>Clique para ver comprovante</p>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.valida}><p className={styles.text}>Validar</p></div>
                                <div className={styles.reprova}><p className={styles.text}>Reprovar</p></div>
                            </div>
                        </li>

                        <li className={styles.card}>
                            <div className={styles.line}>
                                <img src="../public/user.png" alt="" />
                                <p className={styles.text} >Nome: John Doe</p>
                            </div>
                            <div className={styles.line}>
                                <img src="../public/DownloadingUpdates.png" alt="" />
                                <p className={styles.text}>Quantidade: XXXX</p>
                            </div>
                            <div style={{cursor: "pointer"}} className={styles.line}>
                                <img src="../public/picture.png" alt="" />
                                <p className={styles.text}>Clique para ver comprovante</p>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.valida}><p className={styles.text}>Validar</p></div>
                                <div className={styles.reprova}><p className={styles.text}>Reprovar</p></div>
                            </div>
                        </li>

                        <li className={styles.card}>
                            <div className={styles.line}>
                                <img src="../public/user.png" alt="" />
                                <p className={styles.text} >Nome: John Doe</p>
                            </div>
                            <div className={styles.line}>
                                <img src="../public/DownloadingUpdates.png" alt="" />
                                <p className={styles.text}>Quantidade: XXXX</p>
                            </div>
                            <div style={{cursor: "pointer"}} className={styles.line}>
                                <img src="../public/picture.png" alt="" />
                                <p className={styles.text}>Clique para ver comprovante</p>
                            </div>
                            <div className={styles.buttons}>
                                <div className={styles.valida}><p className={styles.text}>Validar</p></div>
                                <div className={styles.reprova}><p className={styles.text}>Reprovar</p></div>
                            </div>
                        </li>
                    </ul>
                    <div style={{textAlign: "center", marginTop: "5%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img style={{cursor: "pointer"}} src="../public/ChevronRight.png" alt="" />
                        <p style={{color: "black", margin: "0px"}}>{paginaAtual.toString().padStart(2,'0')}/{paginas.length.toString().padStart(2,'0')}</p>
                        <img style={{transform: "rotate(180deg)", cursor: "pointer"}}  src="../public/ChevronRight.png" alt="" />
                    </div>

                </div>
                
            </div>


            <Footer/>
        </div>
    )

}

export default DepositoAdm;