import {
  FaTimes,
  FaSave,
  FaRecycle,
  FaUsers,
  FaHandshake,
  FaPlus,
  FaTrash,
  FaSun,
} from 'react-icons/fa';
import './MetricsModal.scss';
import { useState, useEffect } from 'react';
import api from '../../api';
import { toast } from "react-toastify"

const ExtensionMetricsModal = ({ open, onClose }) => {
  const [metrics, setMetrics] = useState({
    climateInitiatives: '',
    livesImpacteds: '',
    kgRecycled: '',
    sanitationInstalled: '',
    bets: '',
    litersTreatedWater: '',
    partners: [{ name: '', logo: '' }],
  });

  const fetchMetrics = async () => {
    const metrics = await api.get("/metrics");
    return metrics.data;
  }

  const handleSave = async () => {
    try {
      await api.patch('/metrics', metrics);
      toast.success("Métricas salvas com sucesso!");
      onClose();
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (open) {
      const loadMetrics = async () => {
        try {
          const metricsData = await fetchMetrics();
          setMetrics(metricsData);
        } catch (e) {
          toast.error(e.message);
        }
      };

      loadMetrics();
    }
  }, [open]);

  const handleChange = (field, value) => {
    setMetrics((prev) => ({ ...prev, [field]: value }));
  };

  const handlePartnerChange = (index, field, value) => {
    const updatedPartners = [...metrics.partners];
    updatedPartners[index][field] = value;
    setMetrics((prev) => ({ ...prev, partners: updatedPartners }));
  };

  const addPartner = () => {
    setMetrics((prev) => ({
      ...prev,
      partners: [...prev.partners, { name: '', logo: '' }],
    }));
  };

  const removePartner = (index) => {
    if (metrics.partners.length > 1) {
      const updatedPartners = [...metrics.partners];
      updatedPartners.splice(index, 1);
      setMetrics((prev) => ({ ...prev, partners: updatedPartners }));
    }
  };

  if (!open) return null;

  return (
    <div className="metrics-modal-overlay">
      <div className="metrics-modal">
        <div className="modal-header">
          <h2>Atualizar Métricas de Extensão</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">

          <div className="metric-group">


            <div className="metric-input">
              <label>
                <FaSun className="metric-icon" />
                Iniciativas contra Mudança Climática
              </label>
              <input
                type="number"
                placeholder="0"
                value={metrics.climateInitiatives}
                onChange={(e) => handleChange('climateInitiatives', e.target.value)}
              />
            </div>

            <div className="metric-input">
              <label>
                <FaUsers className="metric-icon" />
                Vidas Impactadas
              </label>
              <input
                type="number"
                placeholder="0"
                value={metrics.livesImpacteds}
                onChange={(e) => handleChange('livesImpacteds', e.target.value)}
              />
            </div>

            <div className="metric-input">
              <label>
                <FaRecycle className="metric-icon" />
                KG de Lixo Reciclado
              </label>
              <input
                type="number"
                placeholder="Insira a quantidade em KG"
                value={metrics.kgRecycled}
                onChange={(e) => handleChange('kgRecycled', e.target.value)}
              />
            </div>

            <div className="metric-input">
              <label>
                Sanitários Instalados
              </label>
              <input
                type="number"
                placeholder="0"
                value={metrics.sanitationInstalled}
                onChange={(e) => handleChange('sanitationInstalled', e.target.value)}
              />
            </div>

            <div className="metric-input">
              <label>
                BETs Construídos
              </label>
              <input
                type="number"
                placeholder="0"
                value={metrics.bets}
                onChange={(e) => handleChange('bets', e.target.value)}
              />
            </div>

            <div className="metric-input">
              <label>
                Litros de Água Tratados
              </label>
              <input
                type="number"
                placeholder="0"
                value={metrics.litersTreatedWater}
                onChange={(e) => handleChange('litersTreatedWater', e.target.value)}
              />
            </div>

          </div>

          <div className="partners-section">
            <div className="section-header">
              <h4>
                <FaHandshake className="section-icon" />
                Parceiros:
              </h4>
              <button className="add-partner-btn" onClick={addPartner}>
                <FaPlus /> Adicionar Parceiro
              </button>
            </div>

            {metrics.partners?.map((partner, index) => (
              <div className="partner-group" key={index}>
                <div className="partner-input">
                  <label>Nome</label>
                  <input
                    type="text"
                    placeholder="Nome do parceiro"
                    value={partner.name}
                    onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                  />
                </div>

                <div className="partner-input">
                  <label>Logo (link)</label>
                  <input
                    type="url"
                    placeholder="URL do logo"
                    value={partner.logo}
                    onChange={(e) => handlePartnerChange(index, 'logo', e.target.value)}
                  />
                </div>

                {metrics.partners.length > 1 && (
                  <button
                    className="remove-partner-btn"
                    onClick={() => removePartner(index)}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Sair
          </button>
          <button className="save-btn" onClick={handleSave}>
            <FaSave className="save-icon" />
            Salvar Mudanças
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionMetricsModal;
