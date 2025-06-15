import React, {useState } from "react";
import "./UpdatePointModal.scss";
import api from "../../api.js";
import { toast } from "react-toastify";


function UpdatePointModal({open, onClose,name,address, idPoint, amount}) {
  const [nome, setNome] = useState(name || "");
  const [endereco, setEndereco] = useState(address || "");
 let quantidade = amount
  
 
const id = idPoint;


  async function updateCollectionPoint() {
    

    try {
      const body = {name: nome, location: endereco}
      let req = await api.patch(`/collectionPoint/${id}`, body);

      if(req.status === 200) {
        toast.success("Usuário atualizado com sucesso!");
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }
    } catch(error) {
      toast.error(error);
    }
  }



  if(open){
    return (
      <div className="modal-backdrop">
        <div className="modal-atualizar">
          <button onClick={onClose} className="close-btn">×</button>
          
          <h2>Atualizar Ponto de Coleta</h2>

          <div className="form-group">
            <label>Alterar nome do Ponto de Coleta</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Alterar endereço do Ponto de Coleta</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantidade de esponjas depositadas</label>
            <input
              type="text"
              value={quantidade}
              disabled={true}
            />
          </div>

          <div className="modal-actions">
            <button onClick={updateCollectionPoint} className="confirm-btn">Atualizar</button>
          </div>
        </div>
      </div>
    );
  } else return (<></>);
}
export default UpdatePointModal