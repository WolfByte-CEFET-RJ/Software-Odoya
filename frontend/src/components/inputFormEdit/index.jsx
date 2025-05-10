import React, { useState } from "react"
import { MdModeEdit } from "react-icons/md";
import inputFormProfile from "./inputFormProfile.module.scss"

function InputFormEdit({type, onChange, place}) {
    const [isInputEnabled, setIsInputEnabled] = useState(false);
    console.log(place)
    return (
        <>
        <div className={inputFormProfile.container}>
            {isInputEnabled ? (
                    <input className={inputFormProfile.input} disabled={false} type={type} onChange={onChange} value={place}></input>
                ) : (
                    <input className={inputFormProfile.input} disabled={true} type={type} onChange={onChange} value={place}></input>
                )
            }
            <button type="button" className={inputFormProfile.buttonEditar} onClick={() => setIsInputEnabled(!isInputEnabled)}>
                <MdModeEdit color="black"/>
            </button>
        </div>
        </>
    )
}

export default InputFormEdit;