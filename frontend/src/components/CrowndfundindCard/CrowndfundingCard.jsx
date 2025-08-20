import React from "react";
import cardStyle from "./CrowndfundingCard.module.scss";
import { PiStarFill } from "react-icons/pi";
import { FaCalendarDays } from "react-icons/fa6";
import { AiFillCloseSquare } from "react-icons/ai";
import { FaUsers, FaMinusSquare, FaWindowClose, FaStar } from "react-icons/fa";
import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md";

function CrowndfundingCard({
  crownd,
  name,
  location,
  date,
  hour,
  state,
  meetingpoint,
  estimatedDuration,
}) {
  let status =
    state === "presente"
      ? "presente"
      : state === "analise"
      ? "em_analise"
      : "faltou";

  return (
    <>
      {crownd ? (
        <div className={cardStyle.container}>
          <h1 className={cardStyle.titulo}>{name}</h1>
          <div className={cardStyle.info}>
            <span className={cardStyle.infoSpan}>
              {" "}
              <MdLocationOn className={cardStyle.icon} /> {location}
            </span>
            <span className={cardStyle.infoSpan}>
              {" "}
              <FaCalendarDays className={cardStyle.icon} /> {date}
            </span>
            <span className={cardStyle.infoSpan}>
              {" "}
              <MdAccessTimeFilled className={cardStyle.icon} /> {hour}
            </span>
          </div>
          <FaUsers className={cardStyle.iconCard} />
        </div>
      ) : (
        <div
          className={`${cardStyle.container2} ${
            status === "presente"
              ? cardStyle.container_presente
              : status === "em_analise"
              ? cardStyle.container_em_analise
              : cardStyle.container_faltou
          }`}
        >
          <h1
            className={`${
              status === "presente" ? cardStyle.titulo : cardStyle.titulo2
            }`}
          >
            {name}
          </h1>
          <div className={cardStyle.info}>
            <span
              className={`${
                status === "presente" ? cardStyle.infoSpan : cardStyle.infoSpan2
              }`}
            >
              {" "}
              <MdLocationOn
                className={`${
                  status === "presente"
                    ? cardStyle.presente
                    : status === "em_analise"
                    ? cardStyle.em_analise
                    : cardStyle.faltou
                }`}
              />{" "}
              {location}
            </span>
            <span
              className={`${
                status === "presente" ? cardStyle.infoSpan : cardStyle.infoSpan2
              }`}
            >
              {" "}
              <FaCalendarDays
                className={`${
                  status === "presente"
                    ? cardStyle.presente
                    : status === "em_analise"
                    ? cardStyle.em_analise
                    : cardStyle.faltou
                }`}
              />{" "}
              {date}
            </span>
            <span
              className={`${
                status === "presente" ? cardStyle.infoSpan : cardStyle.infoSpan2
              }`}
            >
              {" "}
              <MdAccessTimeFilled
                className={`${
                  status === "presente"
                    ? cardStyle.presente
                    : status === "em_analise"
                    ? cardStyle.em_analise
                    : cardStyle.faltou
                }`}
              />{" "}
              {estimatedDuration}
            </span>
          </div>
          {status === "presente" ? (
            <FaStar className={cardStyle.iconCardStar} />
          ) : status === "em_analise" ? (
            <FaMinusSquare className={cardStyle.iconCard2} />
          ) : (
            <FaWindowClose className={cardStyle.iconCard2} />
          )}
        </div>
      )}
    </>
  );
}

export default CrowndfundingCard;
