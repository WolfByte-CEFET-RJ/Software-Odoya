import "./ModalConfirmation.scss";



function ModalConfirmation({open, onClose, onConfirm, finalText}) {
    
    if(open){
        return (
        <div className="modal-backdrop">
            <div className="modal-atualizar-c">
            <button onClick={onClose} className="close-btn">×</button>
            <div className="pergunta">
                <label>Você deseja realmente {finalText}?</label>
            </div>

            <div className="botoes">
                <button id="sim" type="button" onClick={onConfirm}>Sim</button>
                <button id="nao" type="button" onClick={onClose}>Não</button>
            </div>

            </div>
        </div>
        );
    } else return (<></>);
    }
export default ModalConfirmation