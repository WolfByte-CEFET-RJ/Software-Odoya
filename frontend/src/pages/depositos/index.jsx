import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import depositos from "./depositos.module.scss";
import { MdClose } from "react-icons/md";
import api from "../../api.js";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Depositos = () => {
  const { id: idUrl } = useParams();
  const loc = useLocation();

  let id = null;

  if (loc.state?.id) {
    id = loc.state.id; // prioridade para o que veio no state
  } else {
    id = idUrl; // se não tiver no state, pega da URL
  }

  console.log(id);

  const [pointData, setPointData] = useState({
    name: "",
    location: "",
    amountSponges: 0,
    capacitySponges: 0,
    isInactive: 0,
  });
  const [depositAmount, setDepositAmount] = useState(0);
  const [, setImageURL] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // arquivo real
  const [modalRegisterDeposit, setModalRegisterDeposit] = useState(false);

  const nav = useNavigate();

  const handleClose = () => {
    setImageURL(null);
    setPreview(null);
    setDepositAmount(0);
    setModalRegisterDeposit(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // guarda o arquivo real
      setPreview(URL.createObjectURL(file)); // gera preview
    }
  };

  const handleImageDeletion = () => {
    setPreview(null);
    setImageURL(null);
  };

  async function getCollectionPointData() {
    try {
      let req = await api.get(`/collectionPoint/${id}`);

      if (req.status == 200) {
        setPointData({
          name: req.data.name,
          location: req.data.location,
          amountSponges: req.data.amountSponges,
          capacitySponges: req.data.capacitySponges,
          isInactive: req.data.isInactive,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setTimeout(() => {
          toast.error(error.response.data.message);
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error(
            "Servidor não respondeu. Verifique sua conexão ou tente mais tarde."
          );
        }, 1000);
      }
    }
  }

  const handleSubmit = () => {
    if (depositAmount >= 1) {
      registerDeposit();
    } else toast.error("Insira um valor de depósito válido!");
  };

  async function registerDeposit() {
    const formData = new FormData();
    formData.append(
      "depositData",
      JSON.stringify({ amountSponges: depositAmount })
    );
    formData.append("comprovante", imageFile);

    try {
      let req = await api.post(`/deposit/${id}`, formData);

      if (req.status == 201) {
        toast.success("Depósito registrado com sucesso!");
        setTimeout(() => {
          nav("/home");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setTimeout(() => {
          toast.error(error.response.data.message);
        }, 1000);
      } else {
        setTimeout(() => {
          toast.error(
            "Servidor não respondeu. Verifique sua conexão ou tente mais tarde."
          );
        }, 1000);
      }
    }
  }

  const validDigits = (text) => {
    return text.replace(/[^0-9,]/g, "");
  };

  useEffect(() => {
    getCollectionPointData();
  }, []);

  return (
    <>
      <Header />
      <div className={depositos.body}>
        <h1>Ponto de Coleta: {pointData.name}</h1>
        <section className={depositos.infoSection}>
          <div>
            <p>Este ponto de coleta está localizado em {pointData.location}.</p>
            <p>
              Obs: Lembre-se de conferir se este é realmente o ponto de coleta
              que você está.
            </p>

            <p className={depositos.status}>
              Situação: {pointData.isInactive ? "Inativo" : "Ativo"}
            </p>
          </div>

          {pointData.amountSponges == pointData.capacitySponges ? (
            <p className={depositos.pointFullError}>
              Este ponto de coleta está cheio!
            </p>
          ) : (
            <button
              className={depositos.btnRegisterDeposit}
              onClick={() => setModalRegisterDeposit(true)}
            >
              Registrar Depósito
            </button>
          )}
        </section>
      </div>

      {modalRegisterDeposit && (
        <div className={depositos.modalOverlay}>
          <div className={depositos.modalBody}>
            <form className={depositos.modalForm}>
              <button
                type="button"
                className={depositos.modalClose}
                onClick={() => handleClose()}
              >
                <MdClose color="black" size={25} />
              </button>

              <label>Quantidade de esponjas:</label>
              <input
                className={depositos.modalInputSpongeAmount}
                type="text"
                inputMode="numeric"
                value={depositAmount}
                placeholder="Mínimo de 1 unidade"
                onChange={(event) => {
                  const num = validDigits(event.target.value);
                  const maxValue =
                    pointData.capacitySponges - pointData.amountSponges;

                  if (num > maxValue) {
                    // setDepositAmount(maxValue);
                    toast.error(
                      "Depósito inválido, pois ultrapassará o limite de esponjas."
                    );
                  } else {
                    setDepositAmount(num);
                  }
                }}
              ></input>
              <label>Comprovante de depósito: (opcional)</label>
              {preview ? (
                <div className={depositos.modalImagePreviewContainer}>
                  <p>Pré-visualização: </p>
                  <img src={preview} alt="Pré-visualização" />

                  <button type="button" onClick={() => handleImageDeletion()}>
                    Excluir
                  </button>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="inputImage"
                    className={depositos.modalLabelInputImage}
                  >
                    Insira sua imagem aqui!
                  </label>
                  <input
                    className={depositos.modalInputImage}
                    type="file"
                    id="inputImage"
                    accept="image/*"
                    capture="environment"
                    onChange={(event) => handleImageUpload(event)}
                  ></input>
                </div>
              )}

              <button
                className={depositos.modalSubmit}
                type="button"
                onClick={() => handleSubmit()}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Depositos;
