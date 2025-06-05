import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./deposito.module.scss"
const DepositoAdm = () => {

    return(
        <>
            <Header/>
            <div className={styles.ondas_background}>
                <img src="../public/Ondinhas.svg" className={styles.separador} />
            </div>
            <div className={styles.divPrincipal}>
                <ul style={{display: "grid", gap: "2rem"}}>
                    <li>a</li>
                    <li>b</li>
                    <li>c</li>
                </ul>
            </div>


            <Footer/>
        </>
    )

}

export default DepositoAdm;