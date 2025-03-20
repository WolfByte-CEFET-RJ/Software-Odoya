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

    console.log(status);
    return(
        <>{ props.crownd ? 
            <div className={cardStyle.container}>
                <h1 className={cardStyle.titulo}>{props.num} esponjas</h1>
                <div className={cardStyle.info}>
                    <span className={cardStyle.infoSpan} > <MdLocationOn className={cardStyle.icon} size={25}/> {props.place}</span>
                    <span className={cardStyle.infoSpan} > <FaCalendarDays className={cardStyle.icon} size={25}/> {props.date}</span>
                    <span className={cardStyle.infoSpan} > <MdAccessTimeFilled className={cardStyle.icon} size={25}/> {props.hour}</span>
                </div>
                <FaUsers className={cardStyle.iconCard} size={90}/>
            </div>
            :
            <div className={`${cardStyle.container2} ${status === "presente" ? cardStyle.presente
                : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`}>
                <h1 className={`${status === "presente" ? cardStyle.titulo
                        : cardStyle.titulo2}`}>{props.nome}</h1>
                <div className={cardStyle.info}>
                    <span className={`${status === "presente" ? cardStyle.infoSpan
                        : cardStyle.infoSpan2}`} > <MdLocationOn className={`${status === "presente" ? cardStyle.presente
                        : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`} size={25}/> {props.place}</span>
                    <span className={`${status === "presente" ? cardStyle.infoSpan
                        : cardStyle.infoSpan2}`} > <FaCalendarDays className={`${status === "presente" ? cardStyle.presente
                        : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`} size={25}/> {props.date}</span>
                    <span className={`${status === "presente" ? cardStyle.infoSpan
                        : cardStyle.infoSpan2}`} > <MdAccessTimeFilled className={`${status === "presente" ? cardStyle.presente
                        : status === "em_analise" ? cardStyle.em_analise : cardStyle.faltou}`} size={25}/> {props.duration}</span>
                </div>
                {
                    status === "presente" ?
                    <FaStar  className={cardStyle.iconCardStar} size={90}/>
                    : status === "em_analise" ?
                    <FaMinusSquare  className={cardStyle.iconCard2} size={85}/>
                    : <FaWindowClose className={cardStyle.iconCard2} size={90}/>

                }
                
            </div>
        }
        </>
    )
}

export default CrowndfundingCard;