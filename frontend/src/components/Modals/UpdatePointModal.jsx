import React, { useState } from "react";
import "./UpdatePointModal.scss";
import api from "../../api.js";

function UpdatePointModal({open, onClose, onConfirm, initialData = {}}) {
  const [nome, setNome] = useState(initialData.nome || "");
  const [endereco, setEndereco] = useState(initialData.endereco || "");
  const [limite, setLimite] = useState(initialData.limite || "");
  
  const handleConfirm = () => {
    onConfirm({ nome, endereco, limite });
    updateCollectionPoint()
  };

  async function updateCollectionPoint() {
    const id = initialData.id;

    try {
      let req = await api.patch(`/collectionPoint/${id}`);

      if(req.status === 200) {
        console.log("Usuário atualizado com sucesso!");
      }
    } catch(error) {
      console.log(error);
    }
  }

  if(open){
    return (
      <div className="modal-backdrop">
        <div className="modal-atualizar">
          <button onClick={onClose} className="close-btn">×</button>
          
          <h2>Novo Ponto de Coleta</h2>

          <div className="form-group">
            <label>Nome do Ponto de Coleta</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Endereço do Ponto de Coleta</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Limite de Armazenamento</label>
            <input
              type="text"
              value={limite}
              onChange={(e) => setLimite(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button onClick={handleConfirm} className="confirm-btn">Criar</button>
          </div>
        </div>
      </div>
    );
  } else return (<></>);
}
export default UpdatePointModal