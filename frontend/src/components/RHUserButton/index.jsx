import userbutton from "./userbutton.module.scss";
import { MdPerson } from "react-icons/md";

const RHUserButton = ({user, onClick}) => {
    const {name, email, points} = user

    return (
        <>
        <div className={userbutton.body}>
            <div className={userbutton.info}>
                <MdPerson className={userbutton.icon} size={40}/>
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

export default RHUserButton;