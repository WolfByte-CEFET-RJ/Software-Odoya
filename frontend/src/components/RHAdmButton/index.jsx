import admbutton from "./admbutton.module.scss";
import { MdSettings } from "react-icons/md";

const RHAdmButton = ({openModal}) => {
    return (
        <>
        <div className={admbutton.body}>
            <div className={admbutton.info}>
                <MdSettings className={admbutton.icon} size={40}/>
                <div>
                    <p>Nome: </p>
                    <p>Email: </p>
                    <p>Pontos: </p>
                </div>
            </div>
            <button onClick={openModal}>Inspecionar</button>
        </div>
        </>
    )
};

export default RHAdmButton;