import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./deposito.module.scss"
import { useState, useEffect } from "react";
import api from '../../api'

const DepositoAdm = (colectionPointId) => {
    colectionPointId =1
    const [pontoNome, setPontoNome] = useState('')
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [users, setUSer] = useState([])
    const [totalPages, setTotalPages] = useState('0');
    useEffect(() => {
    getDepositos();
    }, [paginaAtual]);


    /*async function getDepositos() {
        try{
            let req = await api.get('/admin/registration')           
            
            if(req.status == 200){
                
                setPaginas(req.data)
            }
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao recuperar as páginas de registro');
            }, 1000);
    }
    }*/
    // temporario apenas para teste sem login
    async function getDepositos() {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Njc2OGQ1LWIwNWQtNDFiOC04YmFkLWYyNmQwNTA3MGUwZSIsImVtYWlsIjoidGVzdGVAZW1haWwuY29tIiwibmFtZSI6ImVtaWxpYSIsImFkbWluIjoxLCJpYXQiOjE3NDk1OTg2NjQsImV4cCI6MTc0OTY4NTA2NH0.M1h-x53zLtVtxZyuBdds2v4SCmjdkBVy-aRcCrz9Wv0';

            const response = await fetch(`http://localhost:5000/deposits/adm${colectionPointId}?page=${paginaAtual}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();
            setTotalPages(data.totalPages);
            setUSer(data.deposits);
            setPontoNome(data.deposits[0].point_name)
        } catch (error) {
            console.error(error);

            setTimeout(() => {
                Error('Falha ao recuperar as páginas de registro');
            }, 1000);
        }
    }

    async function patchStatus(id,status) {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Njc2OGQ1LWIwNWQtNDFiOC04YmFkLWYyNmQwNTA3MGUwZSIsImVtYWlsIjoidGVzdGVAZW1haWwuY29tIiwibmFtZSI6ImVtaWxpYSIsImFkbWluIjoxLCJpYXQiOjE3NDk1OTg2NjQsImV4cCI6MTc0OTY4NTA2NH0.M1h-x53zLtVtxZyuBdds2v4SCmjdkBVy-aRcCrz9Wv0';

            const response = await fetch(`http://localhost:5000/deposit/status/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: status
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();
            getDepositos()
        } catch (error) {
            console.error(error);

            setTimeout(() => {
                Error('Falha ao mudar o status');
            }, 1000);
        }
    }

    async function searchDeposit(name) {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Njc2OGQ1LWIwNWQtNDFiOC04YmFkLWYyNmQwNTA3MGUwZSIsImVtYWlsIjoidGVzdGVAZW1haWwuY29tIiwibmFtZSI6ImVtaWxpYSIsImFkbWluIjoxLCJpYXQiOjE3NDk1OTg2NjQsImV4cCI6MTc0OTY4NTA2NH0.M1h-x53zLtVtxZyuBdds2v4SCmjdkBVy-aRcCrz9Wv0';

            const response = await fetch(`http://localhost:5000/deposits/adm/search${colectionPointId}?page=${paginaAtual}&name=${encodeURIComponent(name)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();
            setTotalPages(data.totalPages);
            setUSer(data.deposits);
            setPaginaAtual(1);
        } catch (error) {
            console.error(error);

            setTimeout(() => {
                Error('Falha ao mudar o status');
            }, 1000);
        }
    }

    function changeStatus(index,status){
            let id = users[index].id
            const confirmacao = window.confirm(`Você tem certeza que deseja alterar o status para ${status}?`);
            if (!confirmacao){
                return;
            }
            patchStatus(id,status)
    }


    function goBack(){
        if(paginaAtual > 1){
            setPaginaAtual(paginaAtual-1)
        }
    }


    function goUp(){
        if(paginaAtual < totalPages){
            setPaginaAtual(paginaAtual+1)
        }
    }

    return(
        <div className={styles.body}>
            <Header/>
            <div className={styles.ondas_background}>
                <img src="../public/Ondinhas.svg" className={styles.separador} />
            </div>
            <div className={styles.divPrincipal}>
                <h1 style={{textAlign: "center", marginBottom: "5%"}}>Ponto de coleta {pontoNome}</h1>
                <p>Registro de depósitos</p>
                <form onSubmit={(e) => {e.preventDefault(); searchDeposit(e.target.elements.search.value)}} style={{cursor: "pointer"}}  className={styles.retangulo}>
                    <img style={{paddingLeft: "2%"}} src="../public/SearchClient.png" alt="" />
                    <input name="search" className={styles.input} type="text" placeholder="Buscar por depósitos" />
                </form>
                <div className={styles.registros}>
                    <h2 style={{display: users.length === 0 ? "flex" : "none"}}>Sem Registros</h2>
                    <ul className={styles.grid}>
                        {users.map((user, index) => (
                            <li key={index}  className={user.status == "APROVADO"? styles.cardAprova: user.status == "REPROVADO"? styles.cardReprova : styles.card}>
                                <div className={styles.line}>
                                <img src="../public/user.png" alt="Usuário"/>
                                <p className={styles.text}>{user.name}</p>
                                </div>
                                <div className={styles.line}>
                                <img src="../public/DownloadingUpdates.png" alt="Quantidade" />
                                <p className={styles.text}>{user.amountSponges}</p>
                                </div>
                                <div style={{ cursor: "pointer" }} className={styles.line}>
                                <img src="../public/picture.png" alt="Comprovante" />
                                <p className={styles.text}>Clique para ver comprovante</p>
                                </div>
                                <div className={styles.buttons}>
                                <div className={styles.valida}>
                                    <p onClick={() => {if (user.status === "APROVADO") return; else changeStatus(index, "APROVADO");}} className={styles.text}>
                                        {user.status == "APROVADO"? "Aprovado" : "Aprovar"}
                                    </p>
                                </div>
                                <div onClick={() => {if (user.status === "REPROVADO") return; else changeStatus(index, "REPROVADO");}} className={styles.reprova}>
                                    <p className={styles.text}>
                                        {user.status == "REPROVADO"? "Reprovado" : "Reprovar"}
                                    </p>
                                </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div style={{textAlign: "center", marginTop: "5%", display: users.length === 0 ? "none" : "flex", alignItems: "center", justifyContent: "center"}}>
                        <img onClick={() => goBack()} style={{cursor: "pointer"}} src="../public/ChevronRight.png" alt="" />
                        <p style={{color: "black", margin: "0px"}}>{paginaAtual.toString().padStart(2,'0')}/{totalPages.toString().padStart(2,'0')}</p>
                        <img onClick={() => goUp()} style={{transform: "rotate(180deg)", cursor: "pointer"}}  src="../public/ChevronRight.png" alt="" />
                    </div>

                </div>
                
            </div>


            <Footer/>
        </div>
    )

}

export default DepositoAdm;