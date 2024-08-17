const MyCheckbox = ({ name, label = "undefined", register }) => {

  
  const r = register(name);


  return (
    <div className="form-check">
      <input
        name={name}
        value={label}
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        {...r}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {label}
      </label>
    </div>
  );
};

export default MyCheckbox;
