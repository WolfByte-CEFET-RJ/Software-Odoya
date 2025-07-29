/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import InputFormEdit from "../inputFormEdit";
import { MdPerson, MdClose, MdDeleteForever, MdFolder } from "react-icons/md";
import { toast } from "react-toastify";
import modalInspect from "./modalInspect.module.scss";
import perfil from "../../pages/perfil/perfil.module.scss";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import { useConfirmation } from "../ModalConfirmation/handleHook";

const ModalInspectUser = ({ user, closeModal }) => {
  const { confirm, ConfirmationModal } = useConfirmation();
  const { id, name, email } = user;

  const [load, setLoad] = useState(false);
  const [lock, setLock] = useState(false);
  const [username, setUserName] = useState(name);
  const [password, setPassword] = useState(""); // Campo de senha editável

  const handleChange = (event, setText) => {
    setText(event.target.value);
  };

  async function promoteUser() {
        setLoad(true);
    try {
      const req = await api.patch(`/root/user/role/${id}`);
      if (req.status === 200) {
        toast.success("Usuário promovido com sucesso!", {
          onClose: () => window.location.reload(),
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Falha ao promover usuário");
    } finally {
      setLoad(false);
    }
  }

  async function deleteUser() {
    if (await confirm("deletar este usuário")) {
            setLoad(true);
      try {
        const req = await api.delete(`/root/user/${id}`);
        if (req.status === 200) {
          toast.success("Usuário deletado com sucesso!", {
            onClose: () => window.location.reload(),
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Falha ao deletar usuário");
      } finally {
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

  const loading = async (func) => {
    if (func === "promote") {
      await promoteUser();
    } else if (func === "delete") {
      await deleteUser();
    } else if (func === "update") {
      if (await confirm("Deseja salvar as alterações do usuário?")) {
        setLoad(true);
        await updateUser();
      } else {
        setLoad(false);
      }
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
            <MdPerson color="black" size={35} />
            <h2>Inspecionar usuário</h2>
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
            className={modalInspect.buttonPromote}
            disabled={lock}
            onClick={() => loading("promote")}
          >
            Promover a Administrador
          </button>
          <p>* Essa ação dará acesso a ações e dados sensíveis para este usuário.</p>

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
              className={modalInspect.optionsSaveProfile}
              disabled={lock}
              onClick={() => loading("update")}
            >
              <MdFolder size={25} />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal />
    </>
  );
};

export default ModalInspectUser;
