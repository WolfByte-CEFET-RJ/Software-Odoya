import { useState } from "react";
import {toast} from "react-toastify";
import "./CreateEventModal.scss";
import api from '../../api';

function CreateEventModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    meetingPoint: "",
    estimatedDuration: ""
  })

  const handleConfirm = () => {
    if(!(formData.name && formData.location && formData.date && formData.meetingPoint && formData.estimatedDuration)) {
      toast.error("Um ou mais campos estão vazios");
    } else createEvent();
  }

  async function createEvent() {
    try {
      let req = await api.post('/event', formData);

      if(req.status == 201) {
        toast.success("Mutirão criado com sucesso!")
      }
    } catch(error) {
      toast.error(error.response?.data?.message || "Erro ao criar mutirão")
      console.log(error.message);
    }
  }

  if(open) return (
    <div className="modal-backdrop">
      <div className="modal-evento">
        <button onClick={onClose} className="close-btn">×</button>
        
        <h2>Novo Mutirão</h2>

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Local</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Ponto de encontro</label>
            <input
              type="text"
              value={formData.meetingPoint}
              onChange={(e) => setFormData({...formData, meetingPoint: e.target.value})}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Data e Hora</label>
            <input
              type="datetime-local"
              step={0}
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Duração estimada</label>
            <input
              type="time"
              step={1}
              value={formData.estimatedDuration}
              onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={() => handleConfirm()} className="confirm-btn">Salvar</button>
        </div>
      </div>
    </div>
  )
}

export default CreateEventModal;