import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import depositos from './depositos.module.scss'
import { MdClose } from "react-icons/md";
import api from "../../api.js"
import { toast } from "react-toastify"

const Depositos = (collectionPointId) => {
    
    const [pointData, setPointData] = useState({
        name: "",
        location: "",
        amountSponges: 0,
        capacitySponges: 0,
        isInactive: 0
    })
    const [depositAmount, setDepositAmount] = useState(0);
    const [imageURL, setImageURL] = useState("");
    const [preview, setPreview] = useState(null);
    const [modalRegisterDeposit, setModalRegisterDeposit] = useState(false);

    const nav = useNavigate();

    const handleClose = () => {
        setImageURL(null);
        setPreview(null);
        setDepositAmount(0);
        setModalRegisterDeposit(false);
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        if(file) {
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
            setImageURL(previewURL);
        }
    }

    const handleImageDeletion = () => {
        setPreview(null);
        setImageURL(null);
    }

    async function getCollectionPointData() {
        try {
            let req = await api.get(`/collectionPoint/${collectionPointId}`);

            if(req.status == 200) {
                setPointData({
                    name: req.data.name,
                    location: req.data.location,
                    amountSponges: req.data.amountSponges,
                    capacitySponges: req.data.capacitySponges,
                    isInactive: req.data.isInactive
                })
            }
        } catch(error) {
            console.log(error);
            toast.error("Erro ao obter dados do ponto de coleta");
        }
    }

    const handleSubmit = () => {
        if(depositAmount >= 1) {
            registerDeposit();
        } else toast.error("Insira um valor de depósito válido!")
    }

    async function registerDeposit() {
        const depositData = {collectionPointId, depositAmount, imageURL}

        try {
            let req = await api.post("/deposit", depositData);

            if(req.status === 200) {
                toast.success("Depósito registrado com sucesso!");
                setTimeout(() => {
                    // mudar pra mandar o usuário de volta pra home user
                    nav('/');
                }, 2000)
            }
        } catch(error) {
            console.log(error);
            toast.error("Erro ao registrar depósito!");
        }
    }

    useEffect(() => {
        getCollectionPointData();
    })

    return (
        <>
        <Header/>
        <div className={depositos.body}>
            <h1>Ponto de coleta: {pointData.name}</h1>
            <section className={depositos.infoSection}>
                <div>
                    <p>Este ponto de coleta está localizado em {pointData.location}.</p>
                    <p>Obs: Lembre-se de conferir se este é realmente o ponto de coleta que você está.</p>

                    <p className={depositos.status}>Situação: {pointData.isInactive ? "Inativo" : "Ativo"}</p>
                </div>

                {pointData.amountSponges == pointData.capacitySponges ? (
                    <p className={depositos.pointFullError}>Este ponto de coleta está cheio!</p>
                ) : (
                    <button className={depositos.btnRegisterDeposit} onClick={() => setModalRegisterDeposit(true)}>Registrar Depósito</button>
                )}
            </section>
        </div>

        {modalRegisterDeposit &&
            <div className={depositos.modalOverlay}>
                <div className={depositos.modalBody}>
                    <form className={depositos.modalForm}>
                        <button type="button" className={depositos.modalClose} onClick={() => handleClose()}><MdClose color="black" size={25}/></button>

                        <label>Quantidade de esponjas:</label>
                        <input className={depositos.modalInputSpongeAmount} type="number" min="1" max={pointData.capacitySponges - pointData.amountSponges} onChange={(event) => setDepositAmount(event.target.value)}></input>
                        <label>Comprovante de depósito: (opcional)</label>
                        {preview ? (
                            <div className={depositos.modalImagePreviewContainer}>
                                <p>Pré-visualização: </p>
                                <img src={preview} alt="Pré-visualização"/>

                                <button type="button" onClick={() => handleImageDeletion()}>Excluir</button>
                            </div>
                        ) : (
                            <div>
                                <label for="inputImage" className={depositos.modalLabelInputImage}>Insira sua imagem aqui!</label>
                                <input className={depositos.modalInputImage} type="file" id="inputImage" accept="image/*" onChange={(event) => handleImageUpload(event)}></input>
                            </div>
                        )}

                        <button className={depositos.modalSubmit} onClick={() => handleSubmit()}>Enviar</button>
                    </form>
                </div>
            </div>
        }

        <Footer/>
        </>
    )
}

export default Depositos;