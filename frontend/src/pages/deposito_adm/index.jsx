import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./deposito.module.scss"
import { useState, useEffect } from "react";
import api from '../../api'

const DepositoAdm = (colectionPointId) => {
    const [pontoNome, setPontoNome] = useState('')
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [users, setUSer] = useState([])
    const [totalPages, setTotalPages] = useState('0');
    const [isSearching, setIsSearching] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if(!isSearching){
            getDepositos();
            
        }else{
            searchDeposit(name,false)
        }
    }, [paginaAtual]);


    async function getDepositos() {
        try{
            let req = await api.get(`/deposits/adm${colectionPointId}?page=${paginaAtual}`)           
            
            if(req.status == 200){
            setTotalPages(req.totalPages);
            setUSer(req.deposits);
            setPontoNome(req.deposits[0].point_name)
            setIsSearching(false)
            }
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao recuperar as páginas de registro');
            }, 1000);
    }
    }

    async function patchStatus(id,status) {
        const dataStatus = {status: status}
        try{
            let req = await api.patch(`/deposit/status/${id}`,dataStatus)           
            
            if(req.status == 200){
                if(!isSearching){
                getDepositos();
            }else{
            searchDeposit(name,false)
        }
            }
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao mudar o status');
            }, 1000);
    }
    }

    async function searchDeposit(name,isFirstSearch) {
        try{
            let req = await api.get(`/deposits/adm/search${colectionPointId}?page=${paginaAtual}&name=${encodeURIComponent(name)}`)           
            
            if(req.status == 200){
            setTotalPages(data.totalPages);
            setUSer(data.deposits);
            if(isFirstSearch){
            setPaginaAtual(1);
            }else{

            }
            setName(name)
            setIsSearching(true)
            }
        }
        catch (error) {
            console.log(error)
            
            setTimeout(() => {
                setLoad(false)
                toast.error('Falha ao recuperar as páginas de registro');
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
            document.getElementById("TITLE").scrollIntoView({ behavior: "smooth" });
        }
    }


    function goUp(){
        if(paginaAtual < totalPages){
            setPaginaAtual(paginaAtual+1)
            document.getElementById("TITLE").scrollIntoView({ behavior: "smooth" });
        }
    }



    return(
        <div className={styles.body}>
            <Header/>
            <div className={styles.ondas_background}>
                <img src="/Ondinhas.svg" className={styles.separador} />
            </div>
            <div className={styles.divPrincipal}>
                <h1 id="TITLE" style={{textAlign: "center", marginBottom: "5%"}}>Ponto de coleta {pontoNome}</h1>
                <p>Registro de depósitos</p>
                <form  onSubmit={(e) => {e.preventDefault(); searchDeposit(e.target.elements.search.value, true)}} style={{cursor: "pointer"}}  className={styles.retangulo}>
                    <img style={{paddingLeft: "2%"}} src="/SearchClient.png" alt="" />
                    <input name="search" className={styles.input} type="text" placeholder="Buscar por depósitos" />
                </form>
                <div className={styles.registros}>
                    <h2 style={{display: users.length === 0 ? "flex" : "none"}}>Sem Registros</h2>
                    <ul  className={styles.grid}>
                        {users.map((user, index) => (
                            <li key={index}  className={user.status == "APROVADO"? styles.cardAprova: user.status == "REPROVADO"? styles.cardReprova : styles.card}>
                                <div className={styles.line}>
                                <img src="/User.png" alt="Usuário"/>
                                <p className={styles.text}>Nome: {user.name}</p>
                                </div>
                                <div className={styles.line}>
                                <img src="/DownloadingUpdates.png" alt="Quantidade" />
                                <p className={styles.text}>Quantidade: {user.amountSponges}</p>
                                </div>
                                <div style={{ cursor: "pointer" }} className={styles.line}>
                                <img src="/Picture.png" alt="Comprovante" />
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
                        <img onClick={() => goBack()} style={{cursor: "pointer"}} src="/ChevronRight.png" alt="" />
                        <p style={{color: "black", margin: "0px"}}>{paginaAtual.toString().padStart(2,'0')}/{totalPages.toString().padStart(2,'0')}</p>
                        <img onClick={() => goUp()} style={{transform: "rotate(180deg)", cursor: "pointer"}}  src="/ChevronRight.png" alt="" />
                    </div>

                </div>
                
            </div>


            <Footer/>
        </div>
    )

}

export default DepositoAdm;