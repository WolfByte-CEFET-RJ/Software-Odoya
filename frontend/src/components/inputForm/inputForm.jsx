import React from "react";
import "../../styles/inputForm.scss";

function InputForm({type, onChange, placeholder}){

return(
<>
    <input className= "inputForm" type={type} onChange={onChange} placeholder={placeholder}/>
</> 
)
}

export default InputForm;