import { useState } from "react";
import ModalConfirmation from "./index";

export function useConfirmation() {
    
    const [modalConfig, setModalConfig] = useState({
        open: false,
        texto: '',
        resposta: null,
    });

    const confirm = (texto) => { //retorna true ou false para o elemento que o chamar
        return new Promise((resposta) => {
        setModalConfig({
            open: true,
            texto,
            resposta,
        });
        });
    };

    const yes = () => {
        modalConfig.resposta(true);
        setModalConfig({ ...modalConfig, open: false });
    };

    const no = () => {
        modalConfig.resposta(false);
        setModalConfig({ ...modalConfig, open: false });
    };

    const ConfirmationModal = () => (
        <ModalConfirmation
        open={modalConfig.open}
        texto={modalConfig.texto}
        onConfirm={yes}
        onClose={no}
        />
    );

    return { confirm, ConfirmationModal };
}
