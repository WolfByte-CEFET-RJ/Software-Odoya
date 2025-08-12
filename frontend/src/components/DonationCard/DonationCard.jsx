import { useEffect, useState } from 'react';
import cardStyle from "./DonationCard.module.scss";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdAccessTimeFilled, MdCamera, MdLocationOn } from "react-icons/md";
import UpdatePointModal from "../../components/Modals/UpdatePointModal.jsx";
import { useNavigate } from 'react-router-dom';
import api from '../../api.js';
import { FaFlag } from 'react-icons/fa';
import ImageModal from '../ImageModal/ImageModal.jsx';

function DonationCard(props) {
    const [load, setLoad] = useState(false);
    const [isModalUpdatePointOpen, setModalUpdatePoint] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);


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
            <div style={{cursor: "auto"}} className={`${cardStyle.container} ${
                props.state === 'REPROVADO'
                ? cardStyle.rejected
                : props.state === 'APROVADO'
                ? cardStyle.approved
                : ''
            }`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {isHovered && (
                    <h3 className="tooltip-text">
                    Concede {(props.image?2:1)*parseInt(props.num)} pontos quando aprovado
                    </h3>
                )}
                <h1 className={cardStyle.titulo}>{props.num} esponjas</h1>
                <div className={cardStyle.info}>
                <span className={cardStyle.infoSpan}><MdLocationOn className={cardStyle.icon} /> {props.place}</span>
                <span className={cardStyle.infoSpan}><FaCalendarDays className={cardStyle.icon} /> {props.date}</span>
                <span className={cardStyle.infoSpan}><MdAccessTimeFilled className={cardStyle.icon} /> {props.hour}</span>
                <span className={cardStyle.infoSpan}><FaFlag className={cardStyle.icon} /> {props.state}</span>
                <span className={cardStyle.infoSpan}>
                    <MdCamera className={cardStyle.icon} />
                    {props.image ? (
                    <span
                        onClick={() => setShowModal(true)}
                        style={{ color: "black", cursor: "pointer", textDecoration: "underline" }}
                    >
                        Ver comprovante
                    </span>
                    ) : (
                    <span>Sem comprovante!</span>
                    )}

                </span>
            </div>
            <BiSolidDonateHeart className={cardStyle.iconCard} />

            <ImageModal 
            src={props.image} 
            alt="Comprovante" 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            />

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
                <span className={cardStyle.infoSpan}>Situação: <strong>{props.state ? "Inativo" : "Ativo"}</strong></span>
                </div>
            </div>
            <button onClick={handleDepo}>Depositar aqui</button>
            </div>
        ) : (
            <div  style={{paddingBottom:10}} onClick={handleEdit} className={cardStyle.container} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            {isHovered && (
                <h3 className="tooltip-text">
                    Clique para ver mais
                </h3>
            )}

            <h1 className={`${cardStyle.titulo} ${cardStyle.ponto}`}>{props.nome}</h1>
            <div className={cardStyle.infoPonto}>
                <span className={cardStyle.infoSpan}>{props.place}</span>
                <span className={cardStyle.infoSpan}>Situação: <strong>{props.state ? "Inativo" : "Ativo"}</strong></span>
            </div>
            </div>
        )
        )}
        {console.log(props)}
        <UpdatePointModal
            open={isModalUpdatePointOpen}
            onClose={() => setModalUpdatePoint(false)}
            name={props.nome}
            address={props.place}
            idPoint={props.id}
            amount={props.amount}
            capacity={props.capacitySponges}
            lastCollectionDate={props.lastCollectionDate}
            nextCollectionDate={props.nextCollectionDate}
            isInactive={props.state}
        />

        
    </>
    );
}

export default DonationCard;
