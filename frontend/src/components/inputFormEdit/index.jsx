import React, { useState } from "react"
import { MdModeEdit } from "react-icons/md";
import inputFormEdit from "./inputFormEdit.module.scss"

function InputFormEdit({type, onChange, place}) {
    const [isInputEnabled, setIsInputEnabled] = useState(false);
    
    return (
        <>
        <div className={inputFormEdit.container}>
            {isInputEnabled ? (
                    <input className={inputFormEdit.input} disabled={false} type={type} onChange={onChange} value={place}></input>
                ) : (
                    <input className={inputFormEdit.input} disabled={true} type={type} onChange={onChange} value={place}></input>
                )
            }
            <button type="button" className={inputFormEdit.buttonEditar} onClick={() => setIsInputEnabled(!isInputEnabled)}>
                <MdModeEdit color="black"/>
            </button>
        </div>
        </>
    )
}

export default InputFormEdit;