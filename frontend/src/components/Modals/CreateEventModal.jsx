import React, { useState } from "react";
import "./CreateEventModal.scss";

function CreateEventModal({ open, onClose, onConfirm }) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [horario, setHorario] = useState("");
  const [duracao, setDuracao] = useState("");

  const handleConfirm = () => {
    onConfirm({ titulo, data, local, descricao, horario, duracao, });
  };

  
  if(open){
    return (
      <div className="modal-backdrop">
        <div className="modal-evento">
          <button onClick={onClose} className="close-btn">×</button>
          
          <h2>Pontos de Coleta</h2>
          <p className="subtitle">Mutirões</p>

          <div className="form-group">
            <label>Nome do evento</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Horário estimado</label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Ponto de encontro</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Duração estimada</label>
            <input
              type="time"
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button onClick={handleConfirm} className="confirm-btn">Salvar</button>
          </div>
        </div>
      </div>
    );
  } else return (<></>);
}

export default CreateEventModal;