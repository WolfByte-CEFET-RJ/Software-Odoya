import React, {useEffect, useState } from 'react';
import cardStyle from "./DonationCard.module.scss"
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { MdAccessTimeFilled, MdLocationOn } from "react-icons/md";
import UpdatePointModal from "../../components/Modals/UpdatePointModal.jsx";
import { useNavigate } from 'react-router-dom';

function DonationCard(props){

    const [streetName, setStreetName] = useState('');
    const [ lati, setLati] = useState('');
    const [ longi, setLongi] = useState('');
    const [load, setLoad] = useState(false)
    const [isModalUpdatePointOpen, setModalUpdatePoint] = useState(false);
    const [click, setClick] = useState(0)
    
    const nav = useNavigate()
        
      const handleSearch = () => {
        setLoad(true)
        setStreetName(props.place);
        setClick(prevClick => prevClick + 1)
      };

      const handleEdit =() =>{
        setModalUpdatePoint(true)
      }
      
      useEffect(()=>{
       if(streetName != ''){
         if(/[a-zA-Z]/.test(streetName)){

            const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(streetName)}&format=json`;
            fetch(nominatimUrl)
            .then((response)=>response.json())
            .then((data) => {
                if (data.length > 0) {
                setLoad(false)
                setLati(parseFloat(data[0].lat));
                setLongi(parseFloat(data[0].lon));
                props.setLocation({stret: streetName, lat: lati, long: longi})
                } else {
                alert('Rua não encontrada.');
                setLoad(false)    

                }
            })
            .catch((error) => toast.error('Erro ao buscar a rua:', error))
        }
        else{

            const cepFormatted = streetName.replace(/\D/g, ''); 
            const viaCepUrl = `https://viacep.com.br/ws/${cepFormatted}/json/`;
            
            fetch(viaCepUrl)
              .then((response) => response.json())
              .then((data) => {
                
                const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(data.logradouro+"-"+data.bairro)}&format=json`;
                fetch(nominatimUrl)
                .then((response)=>response.json())
                .then((data) => {
                    if (data.length > 0) {
                    setLoad(false)    
                    setLati(parseFloat(data[0].lat));
                    setLongi(parseFloat(data[0].lon));
                    props.setLocation({stret: streetName, lat: lati, long: longi})
                    } else {
                    alert('Rua não encontrada.');
                    }
                })
                .catch((error) => toast.error('Erro ao buscar a rua:', error))
              })
              .catch((error) => toast.error('Erro ao buscar o cep:', error))
        }

        setLoad(false)

       }
      },[streetName, lati, longi, props])
      useEffect(() =>{
            
              if(load == true){
                      toast.info(
                      <div className='loadingDiv'>
                          <h3>Aguarde um momento</h3>
                          <img src="../public/LogoAzul.svg" className={(load===true) ? cardStyle.logoLoad2 : cardStyle.logoLoad} alt="Logo Azul da ENACTUS"/>
                      </div>,
                      {
                          position: "top-center",
                          autoClose: false,
                          className:'loading' 
                      })
                          
              }
              else{
                  toast.dismiss()
              }
      
                  
      },[load])
      useEffect(()=>{
        if(click == 2){
        nav("/deposit", { state: { id: props.id } });
      }
      },[click])

    return(
        <>{props.donate ? (
    
    <div className={cardStyle.container}>
        <h1 className={cardStyle.titulo}>{props.num} esponjas</h1>
        <div className={cardStyle.info}>
            <span className={cardStyle.infoSpan}> <MdLocationOn className={cardStyle.icon} /> {props.place}</span>
            <span className={cardStyle.infoSpan}> <FaCalendarDays className={cardStyle.icon} /> {props.date}</span>
            <span className={cardStyle.infoSpan}> <MdAccessTimeFilled className={cardStyle.icon} /> {props.hour}</span>
        </div>
        <BiSolidDonateHeart className={cardStyle.iconCard} />
    </div>
) : (
    props.open ? (
    
        <div onClick={handleSearch} className={cardStyle.container}>
            <h1 className={`${cardStyle.titulo} ${cardStyle.ponto}`}>{props.nome}</h1>
            <div className={cardStyle.infoPonto}>
                <span className={cardStyle.infoSpan}> {props.place}</span>
                <span className={cardStyle.infoSpan}> Situação: {props.state ? "inativo" : "ativo"}</span>
            </div>
        </div>
    ) : (
       
        <div onClick={handleEdit} className={cardStyle.container}> 
            <h1 className={`${cardStyle.titulo} ${cardStyle.ponto}`}>{props.nome}</h1>
            <div className={cardStyle.infoPonto}>
                <span className={cardStyle.infoSpan}> {props.place}</span>
                <span className={cardStyle.infoSpan}> Situação: {props.state ? "inativo" : "ativo"}</span>
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
            amount={(props.num)}
            />
       
        </>
    )
}

export default DonationCard;