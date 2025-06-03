import admbutton from "./admbutton.module.scss";
import { MdSettings } from "react-icons/md";

const RHAdmButton = ({user, onClick}) => {
    const {name, email, points} = user

    return (
        <>
        <div className={admbutton.body}>
            <div className={admbutton.info}>
                <MdSettings className={admbutton.icon} size={40}/>
                <div>
                    <p>Nome: {name}</p>
                    <p>Email: {email}</p>
                    <p>Pontos: {points}</p>
                </div>
            </div>
            <button onClick={onClick}>Inspecionar</button>
        </div>
        </>
    )
};

export default RHAdmButton;