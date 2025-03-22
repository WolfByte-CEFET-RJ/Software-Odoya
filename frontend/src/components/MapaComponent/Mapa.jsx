import React, { useRef, useEffect, useState, use } from 'react';

function MapComponent(props) {

  const [streetName, setStreetName] = useState('');
  const [ lati, setLati] = useState('');
  const [ longi, setLongi] = useState('');
    const[ dado, setDado] = useState(false);

  const handleSearch = () => {
    
    const cepFormatted = streetName.replace(/\D/g, ''); 
    const viaCepUrl = `https://viacep.com.br/ws/${cepFormatted}/json/`;
    
    
    fetch(viaCepUrl)
      .then((response) => response.json())
      .then((data) => {
        setDado(true);
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(data.logradouro+"-"+data.bairro)}&format=json`;
        fetch(nominatimUrl)
        .then((response)=>response.json())
        .then((data) => {
            if (data.length > 0) {
            setLati(parseFloat(data[0].lat));
            setLongi(parseFloat(data[0].lon));
            } else {
            alert('Rua não encontrada.');
            }
        })
        .catch((error) => console.error('Erro ao buscar a rua:', error))
      })
      .catch((error) => console.error('Erro ao buscar o cep:', error))
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome da rua"
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
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