import React, { useState, useRef, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import inputFormEdit from "./inputFormEdit.module.scss";

function InputFormEdit({ type, onChange, place }) {
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const inputRef = useRef(null);

  // Sempre que isInputEnabled ficar true, damos foco no input
  useEffect(() => {
    if (isInputEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputEnabled]);

  return (
    <div className={inputFormEdit.container}>
      <input
        ref={inputRef}
        className={inputFormEdit.input}
        disabled={!isInputEnabled}
        type={type}
        onChange={onChange}
        value={place}
      />
      <button
        type="button"
        className={inputFormEdit.buttonEditar}
        onClick={() => setIsInputEnabled(!isInputEnabled)}
      >
        <MdModeEdit color="black" />
      </button>
    </div>
  );
}

export default InputFormEdit;
