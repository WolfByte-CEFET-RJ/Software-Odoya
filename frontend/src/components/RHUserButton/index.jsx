import userbutton from "./userbutton.module.scss";
import { MdPerson } from "react-icons/md";

const RHUserButton = ({openModal}) => {
    return (
        <>
        <div className={userbutton.body}>
            <div className={userbutton.info}>
                <MdPerson className={userbutton.icon} size={40}/>
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

export default RHUserButton;