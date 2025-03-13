import React from "react";
import "../../styles/inputForm.scss";

function InputForm({type, onChange, placeholder}){

return(
<div className="container-inputForm">
    <input className= "inputForm" type={type} onChange={onChange} placeholder={placeholder}/>
</div> 
)
}

export default InputForm;