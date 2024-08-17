

const mockRegister = () => ({});


const MyFloatingInput = ({ label = 'Undefined', type = 'text', register = mockRegister, errors}) => {

  let inputLabel = label.replaceAll(' ', '');
  inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);
  const isError = !!errors?.[inputLabel];

  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        name={inputLabel}
        className={`form-control ${isError ? "is-invalid" : ""}`}
        placeholder={label}
        {...register(inputLabel)}
      />
      <label htmlFor="floatingInput">{label}</label>

      {isError && (
        <div className="invalid-feedback">{errors[inputLabel]?.message}</div>
      )}

    </div>
  );
};

export default MyFloatingInput;
