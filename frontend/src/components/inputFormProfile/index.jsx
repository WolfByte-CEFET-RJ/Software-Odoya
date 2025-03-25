import React, { useState } from "react"
import { MdModeEdit } from "react-icons/md";
import inputFormProfile from "./inputFormProfile.module.scss"

function InputFormProfile({type, onChange}) {
    const [isInputEnabled, setIsInputEnabled] = useState(false);

    return (
        <>
        <div className={inputFormProfile.container}>
            {isInputEnabled ? (
                    <input className={inputFormProfile.input} disabled={false} type={type} onChange={onChange}></input>
                ) : (
                    <input className={inputFormProfile.input} disabled={true} type={type} onChange={onChange}></input>
                )
            }
            <button type="button" className={inputFormProfile.buttonEditar} onClick={() => setIsInputEnabled(!isInputEnabled)}>
                <MdModeEdit color="black"/>
            </button>
        </div>
        </>
    )
}

export default InputFormProfile;