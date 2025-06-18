import { useEffect, useState } from 'react';
import cardStyle from "./DonationCard.module.scss";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md";
import UpdatePointModal from "../../components/Modals/UpdatePointModal.jsx";
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';
import { FaFlag } from 'react-icons/fa';

function DonationCard(props) {
    const [load, setLoad] = useState(false);
    const [isModalUpdatePointOpen, setModalUpdatePoint] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const nav = useNavigate();

    const handleSearch = async () => {
        setLoad(true);
        const address = props.place;
        try{
            const req = await api.get(`collectionPoint/geocode/${props.id}`);
        
            if (req.status === 200) {
                props.setLocation({ stret: address, lat: req.data.lat, long: req.data.lon });
            } else {
                throw new Error(req.data.message);
            }
            
            setLoad(false);

        } catch(e){
            toast.error('Erro ao buscar a rua: ' + e.message);
            setLoad(false);
        }
        setLoad(false);

    };

    const handleEdit = () => {
    setModalUpdatePoint(true);
    };

    const handleDepo = () => {
    nav("/deposit", { state: { id: props.id } });
    };


    useEffect(() => {
    if (load === true) {
        toast.info(
        <div className='loadingDiv'>
            <h3>Aguarde um momento</h3>
            <img
            src="../public/LogoAzul.svg"
            className={cardStyle.logoLoad2}
            alt="Logo Azul da ENACTUS"
            />
        </div>,
        {
            position: "top-center",
            autoClose: false,
            className: 'loading'
        }
        );
    } else {
        toast.dismiss();
    }
    }, [load]);

    return (
    <>
        {props.donate ? (
            <div className={cardStyle.container}>
                <h1 className={cardStyle.titulo}>{props.num} esponjas</h1>
                <div className={cardStyle.info}>
                <span className={cardStyle.infoSpan}><MdLocationOn className={cardStyle.icon} /> {props.place}</span>
                <span className={cardStyle.infoSpan}><FaCalendarDays className={cardStyle.icon} /> {props.date}</span>
                <span className={cardStyle.infoSpan}><MdAccessTimeFilled className={cardStyle.icon} /> {props.hour}</span>
                <span className={cardStyle.infoSpan}><FaFlag className={cardStyle.icon} /> {props.state}</span>
            </div>
            <BiSolidDonateHeart className={cardStyle.iconCard} />
        </div>
        ) : (
        props.open ? (
            <div className={cardStyle.container} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {isHovered && (
                <h3 className="tooltip-text">
                    Clique no card para mostrar o mapa
                </h3>
            )}
            <div onClick={handleSearch}>
                <h1 className={`${cardStyle.titulo} ${cardStyle.ponto}`}>{props.nome}</h1>
                <div className={cardStyle.infoPonto}>
                <span className={cardStyle.infoSpan}>{props.place}</span>
                <span className={cardStyle.infoSpan}>Situação: {props.state ? "inativo" : "ativo"}</span>
                </div>
            </div>
            <button onClick={handleDepo}>Depositar aqui</button>
            </div>
        ) : (
            <div onClick={handleEdit} className={cardStyle.container}>
            <h1 className={`${cardStyle.titulo} ${cardStyle.ponto}`}>{props.nome}</h1>
            <div className={cardStyle.infoPonto}>
                <span className={cardStyle.infoSpan}>{props.place}</span>
                <span className={cardStyle.infoSpan}>Situação: {props.state ? "inativo" : "ativo"}</span>
            </div>
            </div>
        )
        )}
        <UpdatePointModal
        open={isModalUpdatePointOpen}
        onClose={() => setModalUpdatePoint(false)}
        name={props.nome}
        address={props.place}
        idPoint={props.id}
        amount={props.num}
        />
    </>
    );
}

export default DonationCard;
