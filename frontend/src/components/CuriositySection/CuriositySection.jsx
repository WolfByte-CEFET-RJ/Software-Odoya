import React,{ useState } from "react";
import style from './CuriositySection.module.scss';
// import header from "../Header/header.module.scss";
import { FaQuestion } from "react-icons/fa";
import { MdPsychologyAlt } from "react-icons/md"
function CuriositySection(){
   
       return (
           <section className={style.container}>
               <div className={style.infoDiv}>
                    <span className={style.titulo}> Você sabia que... ?</span>
                    <span className={style.estrofe}>Muitas esponjas sintéticas, quando descartadas de maneira inadequada, 
                        podem levar centenas de anos para se decompor, 
                        o que torna o trabalho de coleta e reutilização ainda mais relevante para reduzir o impacto ambiental
                    </span>
               </div>
               <div className={style.iconDiv}>
                    <MdPsychologyAlt color={"white"} className={style.icon}/>
                    <FaQuestion  className={style.iconQ}/>
                </div>
           </section>
       );
};

export default CuriositySection;