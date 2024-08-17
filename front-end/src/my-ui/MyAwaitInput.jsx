import { useEffect, useState } from "react";

const MyAwaitInput = ({ label = 'Undefined', type = 'text', onChange }) => {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);

  let inputLabel = label.replaceAll(' ', '');
  inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);


  const handleTextChange = (event) => {
    setTyping(true);
    setText(event.target.value);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTyping(false);
      onChange(text);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [text])

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        name={inputLabel}
        className={`form-control ${typing ? "is-valid" : ""}`}
        placeholder={label}
        onChange={handleTextChange}
      />
      <label htmlFor="floatingInput">{label}</label>

      {typing && (
        <div className="valid-feedback">Typing...</div>
      )}

    </div>
  );



};

export default MyAwaitInput;
