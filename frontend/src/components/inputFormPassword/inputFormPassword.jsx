import React from "react";
import { useState } from "react";
import "../../styles/inputForm.scss";
import { Eye, EyeOff } from "lucide-react";

function InputFormPassword({onChange, placeholder}){
    const [view, setView] = useState(false);
return(
<>
    <input className= "inputForm" type={view ? "text": "password"} onChange={onChange} placeholder={placeholder}/>
    <button className ="input-eye-btn" onClick={() => setView(!view)}>
        {view ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
</> 
)
}

export default InputFormPassword;