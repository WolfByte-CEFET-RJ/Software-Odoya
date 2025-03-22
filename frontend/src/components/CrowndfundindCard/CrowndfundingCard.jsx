import React from "react";
import cardStyle from "./CrowndfundingCard.module.scss"
import { PiStarFill } from "react-icons/pi";
import { FaCalendarDays } from "react-icons/fa6";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaUsers, FaMinusSquare,FaWindowClose,FaStar   } from "react-icons/fa";
import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md";

function CrowndfundingCard(props){

    let status = props.state === "presente" ? "presente" :
        props.state === "analise" 
        ? "em_analise" 
        : "faltou";
    return(
        <>{ props.crownd ? 
            <div className={cardStyle.container}>
                <h1 className={cardStyle.titulo}>{props.num} esponjas</h1>
                <div className={cardStyle.info}>
                    <span className={cardStyle.infoSpan} > <MdLocationOn className={cardStyle.icon} /> {props.place}</span>
                    <span className={cardStyle.infoSpan} > <FaCalendarDays className={cardStyle.icon} /> {props.date}</span>
                    <span className={cardStyle.infoSpan} > <MdAccessTimeFilled className={cardStyle.icon} /> {props.hour}</span>
                </div>
                <FaUsers className={cardStyle.iconCard} />
            </div>
            :
            <div className={`${cardStyle.container2} ${status === "presente" ? cardStyle.presente
                : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`}>
                <h1 className={`${status === "presente" ? cardStyle.titulo
                        : cardStyle.titulo2}`}>{props.nome}</h1>
                <div className={cardStyle.info}>
                    <span className={`${status === "presente" ? cardStyle.infoSpan
                        : cardStyle.infoSpan2}`} > <MdLocationOn className={`${status === "presente" ? cardStyle.presente
                        : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`}/> {props.place}</span>
                    <span className={`${status === "presente" ? cardStyle.infoSpan
                        : cardStyle.infoSpan2}`} > <FaCalendarDays className={`${status === "presente" ? cardStyle.presente
                        : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`}/> {props.date}</span>
                    <span className={`${status === "presente" ? cardStyle.infoSpan
                        : cardStyle.infoSpan2}`} > <MdAccessTimeFilled className={`${status === "presente" ? cardStyle.presente
                        : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`}/> {props.duration}</span>
                </div>
                {
                    status === "presente" ?
                    <FaStar  className={cardStyle.iconCardStar} />
                    : status === "em_analise" ?
                    <FaMinusSquare  className={cardStyle.iconCard2}/>
                    : <FaWindowClose className={cardStyle.iconCard2} />

                }
                
            </div>
        }
        </>
    )
}

export default CrowndfundingCard;