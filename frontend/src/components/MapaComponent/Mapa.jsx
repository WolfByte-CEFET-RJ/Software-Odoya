import React, { useRef, useEffect, useState, use } from 'react';
import style from "./Mapa.module.scss"
function MapComponent({ location }) {

  const [streetName, setStreetName] = useState('');
  const [ lati, setLati] = useState('');
  const [ longi, setLongi] = useState('');
    const[ dado, setDado] = useState(false);

  useEffect(() => {
    if (location.lat && location.long) {
      setLati(location.lat);
      setLongi(location.long);
      setDado(true)
      console.log(`Atualizando mapa para: ${location}`);
      // Aqui você pode chamar a API do mapa para centralizar no novo local
    }
  }, [location]);
  return (
    <div className={style.mapa}>
      {dado ? <iframe 
            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS}&q=${lati},${longi}`} 
            width="600" 
            height="450" 
            allowfullscreen="" 
            loading="lazy">
        </iframe>: <></>}
        
    </div>
  );
}

export default MapComponent;