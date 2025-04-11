import React from "react";
import "../../styles/inputForm.scss";

function InputForm({type, onChange, placeholder, off}){

return(
<div className="container-inputForm">
    <input className= "inputForm" type={type} disable={off} onChange={onChange} placeholder={placeholder}/>
</div> 
)
}

export default InputForm;