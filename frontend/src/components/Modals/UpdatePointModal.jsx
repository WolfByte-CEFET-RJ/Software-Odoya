import React, { useState } from "react";
import "./UpdatePointModal.scss";
import api from "../../api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UpdatePointModal({ open, onClose, name, address, idPoint, amount, capacity, lastCollectionDate, nextCollectionDate, isInactive }) {
  const [nome, setNome] = useState(name || "");
  const [endereco, setEndereco] = useState(address || "");
  const [capacidade, setCapacidade] = useState(capacity || "");
  const [ultimaColeta, setUltimaColeta] = useState(lastCollectionDate ? lastCollectionDate.substring(0, 10) : "");
  const [proximaColeta, setProximaColeta] = useState(nextCollectionDate ? nextCollectionDate.substring(0, 10) : "");
  const [inativo, setInativo] = useState(isInactive || false);
  const nav = useNavigate();
  const quantidade = amount;
  const id = idPoint;

  async function updateCollectionPoint() {
    try {
      const body = {
        name: nome,
        location: endereco,
        capacitySponges: Number(capacidade),
        lastCollectionDate: ultimaColeta,
        nextCollectionDate: proximaColeta,
        isInactive: inativo,
      };

      const req = await api.patch(`/collectionPoint/${id}`, body);

      if (req.status === 200) {
        toast.success("Ponto de coleta atualizado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error(req.data.message);
      }
    } catch (error) {
      toast.error("Erro ao atualizar o ponto: "+error);
    }
  }

  function depoAdm() {
    nav("/deposit/adm", { state: { idPoint: id } });
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-atualizar">
        <button onClick={onClose} className="close-btn">×</button>

        <h2>Ponto de Coleta</h2>

        <div className="form-group">
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Endereço</label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Capacidade de esponjas</label>
          <input type="number" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Data da última coleta</label>
          <input type="date" value={ultimaColeta} onChange={(e) => setUltimaColeta(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Data da próxima coleta</label>
          <input type="date" value={proximaColeta} onChange={(e) => setProximaColeta(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={inativo} onChange={(e) => setInativo(e.target.value === "true")}>
            <option value="false">Ativo</option>
            <option value="true">Inativo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantidade de esponjas depositadas no momento</label>
          <input type="text" value={quantidade} disabled />
        </div>
        
        <button style={{width: "100%", backgroundColor: "#2a3d45"}}onClick={depoAdm}>Visualizar depósitos</button>

        <div className="modal-actions">
          <button onClick={updateCollectionPoint} className="confirm-btn">Atualizar</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePointModal;
