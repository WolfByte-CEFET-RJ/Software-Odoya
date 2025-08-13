import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./deposito.module.scss"
import { useState, useEffect} from "react";
import api from '../../api'
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmation } from "../../components/ModalConfirmation/handleHook";
import ImageModal from "../../components/ImageModal/ImageModal"

const DepositoAdm = () => {
    const { confirm, ConfirmationModal } = useConfirmation();
    const loc = useLocation()
    const id = loc.state.idPoint
    
    const navigate = useNavigate();

    const [pontoNome, setPontoNome] = useState('')
    const [pontoID, setPontoID] = useState('')
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [users, setUSer] = useState([])
    const [totalPages, setTotalPages] = useState('0');
    const [isSearching, setIsSearching] = useState(false);
    const [name, setName] = useState('');

    const [modalImage, setModalImage] = useState(null);
    

    useEffect(() => {
        if(!isSearching){
            getDepositos();
            
        }else{
            searchDeposit(name,false)
        }
    }, [paginaAtual]);


    async function getDepositos() {
        try{
            let req = await api.get(`/deposit/adm/${id}?page=${paginaAtual}`)  
            
            
            if(req.status == 200){
                setTotalPages(req.data.totalPages);
                setUSer(req.data.deposits);
                setPontoNome(req.data.deposits[0].point_name)
                setPontoID(req.data.deposits[0].collectionPointId)
                setIsSearching(false)
            }
        }
        catch (error) {
            console.log(error)

            if(error.response){
                if(error.response.status === 404){
                    setTimeout(() => {
                        toast.warning(error.response.data.message);
                        navigate("/homeAdm")
                    }, 1000);
                }else{
                    setTimeout(() => {
                        toast.error(error.response.data.message);
                    }, 1000);
            }
            }else{
                setTimeout(() => {
                toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
            }, 1000);
            }
            
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
            if(error.response){
                    setTimeout(() => {
                        toast.error(error.response.data.message);
                    }, 1000);
            
            }else{
                setTimeout(() => {
                toast.error('Servidor não respondeu. Verifique sua conexão ou tente mais tarde.');
            }, 1000);
            }
            
    }
    }



    async function searchDeposit(name,isFirstSearch) {
        try{
            let req = await api.get(`/deposit/adm/search/${id}?page=${paginaAtual}&name=${encodeURIComponent(name)}`)           
            
            if(req.status == 200){
                console.log(req.data)
                setTotalPages(req.data.totalPages);
                setUSer(req.data.deposits);
                if(isFirstSearch){
                setPaginaAtual(1);
            }
            setName(name)
            setIsSearching(true)
            }
        }
        catch (error) {
            
            
            setTimeout(() => {
                toast.error('Falha ao recuperar as páginas de registro', error);
            }, 1000);
    }
    }

    async function changeStatus(index,status){
            let id = users[index].id
            const confirmacao = await confirm(`alterar o status para ${status}?`);
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
                <h1 id="TITLE" style={{textAlign: "center"}}>Ponto de Coleta: {pontoNome}</h1>
                <h2 style={{textAlign: "center", marginBottom: "5%", fontSize: "medium", color: "gray"}}>id: {pontoID}</h2>
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

                                {user.imageURL?
                                <div style={{display: "flex", width: "100%", alignItems: "center"}}>
                                    <img src="/Picture.png" alt="Comprovante" />
<p 
  className={styles.text}
  style={{ textDecoration: "underline" }}
  onClick={() => setModalImage(user.imageURL)}
>
  Clique para ver comprovante
</p>
                                </div>
                                :
                                <>
                                    <img src="/Picture.png" alt="Comprovante" />
                                    <p className={styles.text}>Sem comprovante!</p>
                                </>
                                }

                                </div>
                                
                                <div className={styles.buttons}>
                                <div onClick={() => {if (user.status === "APROVADO") return; else changeStatus(index, "APROVADO");}} className={styles.valida}>
                                    <p className={styles.text}>
                                        {user.status == "APROVADO"? 
                                        <div onClick={() => {if (user.status === "PENDENTE") return; else changeStatus(index, "PENDENTE");}} className={styles.pend}>
                                    <p className={styles.text}>
                                        {user.status == "PENDENTE"? "Pentente" : "Pendente"}
                                    </p>
                                </div> : "Aprovar"}
                                    </p>
                                </div>
                                <div onClick={() => {if (user.status === "REPROVADO") return; else changeStatus(index, "REPROVADO");}} className={styles.reprova}>
                                    <p className={styles.text}>
                                        {user.status == "REPROVADO"? 
                                        <div onClick={() => {if (user.status === "PENDENTE") return; else changeStatus(index, "PENDENTE");}} className={styles.pend}>
                                    <       p className={styles.text}>
                                        {user.status == "PENDENTE"? "Pentente" : "Pendente"}
                                    </p>
                                </div> : "Reprovar"}
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
            <ConfirmationModal />
            {modalImage && (
                <ImageModal 
                    src={modalImage}
                    alt="Comprovante"
                    isOpen={!!modalImage}
                    onClose={() => setModalImage(null)}
                />
                )}

        </div>
    )

}

export default DepositoAdm;