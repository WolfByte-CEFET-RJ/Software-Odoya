import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import depositos from './depositos.module.scss'
import { MdClose } from "react-icons/md";

const Depositos = ({collectionPoint}) => {
    //const {id, name, location, capacitySponges, amountSponges, isInactive} = collectionPoint;
    
    const [spongeAmount, setSpongeAmount] = useState(0);
    const [image, setImage] = useState(null);
    const [modalRegisterDeposit, setModalRegisterDeposit] = useState(false);

    const handleClose = () => {
        setImage(null);
        setSpongeAmount(0);
        setModalRegisterDeposit(false);
    }

    const handleSpongeAmountChange = (event) => {
        setSpongeAmount(event.target.value);
    }

    const handleImageChange = (event) => {
        
    }

    return (
        <>
        <Header/>
        <div className={depositos.body}>
            <h1>Ponto de coleta: (ponto)</h1>
            <section className={depositos.infoSection}>
                <div>
                    <p>Este ponto de coleta está localizado em (endereco).</p>
                    <p>Obs: Lembre-se de conferir se este é realmente o ponto de coleta que você está.</p>

                    <p className={depositos.status}>Situação: (sit)</p>
                </div>

                <button className={depositos.btnRegisterDeposit} onClick={() => setModalRegisterDeposit(true)}>Registrar Depósito</button>
            </section>
        </div>

        {modalRegisterDeposit &&
            <div className={depositos.modalOverlay}>
                <div className={depositos.modalBody}>
                    <form className={depositos.modalForm}>
                        <button type="button" className={depositos.modalClose} onClick={() => handleClose()}><MdClose color="black" size={25}/></button>
                        <label>Quantidade de esponjas:</label>
                        <input className={depositos.modalInputSpongeAmount} type="number" min="1" onChange={(event) => handleSpongeAmountChange(event)}></input>
                        <label>Comprovante de depósito: (opcional)</label>
                        <label for="inputImage" className={depositos.modalLabelInputImage}>Insira sua imagem aqui!</label>
                        <input className={depositos.modalInputImage} type="file" id="inputImage" accept="image/*" onChange={(event) => handleImageChange(event)}></input>

                        <button className={depositos.modalSubmit}>Enviar</button>
                    </form>
                </div>
            </div>
        }

        <Footer/>
        </>
    )
}

export default Depositos;