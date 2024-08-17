
const MyFieldSelect = ({ label = 'Undefined', options = [], onChange, value }) => {

  let inputLabel = label.replaceAll(' ', '');
  inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);

  return (
    <div class="form-floating">
      <select className="form-select" value={value}  name={inputLabel} onChange={onChange}>
        {options.map((e, i) => (
          <option key={i}>{e}</option>
        ))}
      </select>
      <label>{label}</label>
    </div>
  );
};

export default MyFieldSelect;
