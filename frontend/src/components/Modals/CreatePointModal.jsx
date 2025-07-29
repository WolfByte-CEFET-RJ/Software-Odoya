import React, { useState } from "react";
import "./CreatePointModal.scss";
import api from "../../api.js";
import { toast } from "react-toastify";

function CreatePointModal({ open, onClose }) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [limite, setLimite] = useState("");
  const [ultimaColeta, setUltimaColeta] = useState("");
  const [proximaColeta, setProximaColeta] = useState("");
  const [inativo, setInativo] = useState(false);

    function formatDateToMySQL(date) {
      const d = new Date(date);
      const pad = (n) => String(n).padStart(2, "0");

      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }

  const handleConfirm = () => {
    if (nome && endereco && limite && ultimaColeta && proximaColeta) {
      createCollectionPoint();
    }
  };

  async function createCollectionPoint() {
    try {
      const req = await api.post("/collectionPoint/", {
        name: nome,
        location: endereco,
        capacitySponges: Number(limite),
        lastCollectionDate: formatDateToMySQL(ultimaColeta),
        nextCollectionDate: formatDateToMySQL(proximaColeta),
        isInactive: inativo
      });

      if (req.status === 201) {
        console.log("Ponto de coleta criado com sucesso!");
        onClose();
      } else{
        console.log(req.response)
        throw new Error(req.data)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao criar ponto de coleta.");
      console.log(error.message);
    }
  }

  if (open) {
    return (
      <div className="modal-backdrop">
        <div className="modal-ponto-coleta">
          <button onClick={onClose} className="close-btn">×</button>
          <h2>Novo Ponto de Coleta</h2>

          <div className="form-group">
            <label>Nome do Ponto de Coleta</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Endereço do Ponto de Coleta</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Limite de Armazenamento</label>
            <input type="number" value={limite} onChange={(e) => setLimite(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Data da Última Coleta</label>
            <input type="datetime-local" value={ultimaColeta} onChange={(e) => setUltimaColeta(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Data da Próxima Coleta</label>
            <input type="datetime-local" value={proximaColeta} onChange={(e) => setProximaColeta(e.target.value)} />
          </div>

          <div className="">
            <input type="checkbox" checked={inativo} onChange={(e) => setInativo(e.target.checked)} />
            <label style={{margin:0, marginLeft: "5px"}}>Criar com Status Inativo</label>
          </div>

          <div className="modal-actions">
            <button onClick={handleConfirm} className="confirm-btn">Criar</button>
          </div>
        </div>
      </div>
    );
  } else return null;
}

export default CreatePointModal;
