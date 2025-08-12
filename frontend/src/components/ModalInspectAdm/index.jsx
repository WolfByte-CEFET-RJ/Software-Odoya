import { useState, useEffect } from "react";
import InputFormEdit from "../inputFormEdit";
import { MdSettings, MdClose, MdDeleteForever, MdFolder } from "react-icons/md";
import { toast } from "react-toastify";
import modalInspect from "../ModalInspectUser/modalInspect.module.scss";
import perfil from "../../pages/perfil/perfil.module.scss"
import "react-toastify/dist/ReactToastify.css";
import api from "../../api"

const ModalInspectAdm = ({ user, closeModal }) => {
  const { id, name, email } = user;
  const [load, setLoad] = useState(false);
  const [lock, setLock] = useState(false);
  const [username, setUserName] = useState(name);
  const [password, setPassword] = useState(""); // NOVO estado para senha

  const handleChange = (event, setText) => {
    console.log(event.target.value);
    setText(event.target.value);
  };

  async function demoteUser() {
    try {
      let req = await api.patch(`/root/user/role/${id}`);
      if (req.status === 200) {
        setLoad(false);
        toast.success("Usuário rebaixado com sucesso!", {
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao rebaixar usuário");
      setLoad(false);
    }
  }

  async function deleteUser() {
    if (
      confirm("Tem certeza que deseja deletar este usuário? Esta ação não pode ser revertida.")
    ) {
      try {
        let req = await api.delete(`/root/user/${id}`);
        if (req.status === 200) {
          setLoad(false);
          toast.success("Usuário deletado com sucesso!", {
            onClose: () => window.location.reload(),
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Falha ao deletar usuário");
        setLoad(false);
      }
    } else {
      setLoad(false);
    }
  }

  async function updateUser() {
    const userData = { name: username };
    if (password.trim() !== "") {
      userData.password = password;
    }

    if (userData.name.trim() === "") {
      toast.error("O nome não pode estar vazio!");
      setLoad(false);
      return;
    }

    try {
      const req = await api.patch(`/root/user/${id}`, userData);
      if (req.status === 200) {
        toast.success("Usuário atualizado com sucesso!", {
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao alterar dados");
    } finally {
      setLoad(false);
    }
  }

  const loading = (func) => {
    setLoad(true);

    switch (func) {
      case "demote":
        demoteUser();
        break;
      case "delete":
        deleteUser();
        break;
      case "update":
        updateUser();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (load) {
      setLock(true);
      toast.info(
        <div className="loadingDiv">
          <h3>Aguarde um momento</h3>
          <img
            src="../../public/LogoAzul.svg"
            className={perfil.logoLoad2}
            alt="Logo Azul da ENACTUS"
          />
        </div>,
        {
          position: "top-center",
          autoClose: false,
          className: "loading",
        }
      );
    } else {
      toast.dismiss();
      setLock(false);
    }
  }, [load]);

  return (
    <>
      <div className={modalInspect.overlay}>
        <div className={modalInspect.body}>
          <div className={modalInspect.title}>
            <MdSettings size={35} />
            <h2>Inspecionar administrador</h2>
            <button className={modalInspect.buttonClose} onClick={closeModal}>
              <MdClose color="black" size={25} />
            </button>
          </div>

          <label>Nome completo</label>
          <InputFormEdit
            onChange={(event) => handleChange(event, setUserName)}
            type="text"
            place={username}
            disable={lock}
          />

          <label>Email (não editável)</label>
          <InputFormEdit
            value={email}
            type="email"
            disable={true}
            place={email}
          />

          <label>Nova senha (opcional)</label>
          <InputFormEdit
            onChange={(event) => handleChange(event, setPassword)}
            type="password"
            disable={lock}
          />

          <button
            className={modalInspect.buttonDemote}
            disabled={lock}
            onClick={() => loading("demote")}
          >
            Rebaixar a usuário
          </button>
          <p>* Essa ação removerá acesso a ações e dados sensíveis para este administrador.</p>

          <div className={modalInspect.options}>
            <button
              className={modalInspect.optionsDeleteProfile}
              disabled={lock}
              onClick={() => loading("delete")}
            >
              <MdDeleteForever size={25} />
              <span>Deletar perfil</span>
            </button>
            <button
              className={modalInspect.optionsSaveProfileAdm}
              disabled={lock}
              onClick={() => loading("update")}
            >
              <MdFolder color="black" size={25} />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalInspectAdm;
