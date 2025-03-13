import React from "react";
import { useState } from "react";
import "../../styles/inputForm.scss";
import { Eye, EyeOff } from "lucide-react";

function InputFormPassword({onChange, placeholder}){
    const [view, setView] = useState(false);
    const handleClick = (e) =>{
        e.preventDefault()
        setView(!view)
    }
return(
<div className="container-inputForm">
    <input className= "inputForm" type={view ? "text": "password"} onChange={onChange} placeholder={placeholder}/>
    <button className ="input-eye-btn" onClick={handleClick}>
        {view ? <EyeOff size={25} /> : <Eye size={25} />}
    </button>
</div> 
)
}

export default InputFormPassword;