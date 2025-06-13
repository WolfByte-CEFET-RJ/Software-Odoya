import React, { useState } from "react";
import "./CreatePointModal.scss";
import api from "../../api.js";

function CreatePointModal({ open, onClose, onConfirm }) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [limite, setLimite] = useState("");

  const handleConfirm = () => {
    onConfirm({ nome, endereco, limite });
    createCollectionPoint();
  };

  async function createCollectionPoint() {
    try {
      const req = await api.post("/collectionPoint/", {
        name: nome,
        address: endereco,
        storage_limit: limite
      });

      if(req.status === 201) {
        console.log("Ponto de coleta criado com sucesso!");
      }
    } catch(error) {
      console.log(error);
    }
  }

  if(open){
    return (
      <div className="modal-backdrop">
        <div className="modal-ponto-coleta">
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

export default CreatePointModal;