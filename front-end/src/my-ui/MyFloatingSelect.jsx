

const mockRegister = (name) => {
  return {
  }
}

const MyFloatingSelect = ({ label = 'Undefined', options = [], register = mockRegister, onChange, value }) => {

  let inputLabel = label.replaceAll(' ', '');
  inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);

  



  const demo = <>
    <label htmlFor="browser" className="form-label">
      {label}
    </label>
    <select className="form-select" {...register(inputLabel)} name={inputLabel} value={value} onChange={onChange}>
      {options.map((e, i) => (
        <option key={i}>{e}</option>
      ))}
    </select>
  </>

  return (
    <div class="form-floating">
      <select className="form-select" {...register(inputLabel)} name={inputLabel} onChange={onChange}>
        {options.map((e, i) => (
          <option key={i}>{e}</option>
        ))}
      </select>
      <label>{label}</label>
    </div>
  );
};

export default MyFloatingSelect;
