import React from "react";
import cardStyle from "./DonationCard.module.scss"
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md";

function DonationCard(props){

    return(
        <>{ props.donate ? 
            <div className={cardStyle.container}>
                <h1 className={cardStyle.titulo}>{props.num} esponjas</h1>
                <div className={cardStyle.info}>
                    <span className={cardStyle.infoSpan} > <MdLocationOn className={cardStyle.icon} /> {props.place}</span>
                    <span className={cardStyle.infoSpan} > <FaCalendarDays className={cardStyle.icon} /> {props.date}</span>
                    <span className={cardStyle.infoSpan} > <MdAccessTimeFilled className={cardStyle.icon} /> {props.hour}</span>
                </div>
                <BiSolidDonateHeart className={cardStyle.iconCard} />
            </div>
            :
            <div className={cardStyle.container}>
                <h1 className={`${cardStyle.titulo} ${cardStyle.ponto}`}>{props.nome}</h1>
                <div className={cardStyle.infoPonto}>
                    <span className={cardStyle.infoSpan}> {props.place}</span>
                    <span className={cardStyle.infoSpan} > Situação: {props.state}</span>
                </div>
            </div>
        }
        </>
    )
}

export default DonationCard;