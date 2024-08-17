const MyRadiobox = ({ name, label = "undefined", register }) => {
  return (
    <div className="form-check">
      <input
        name={name}
        value={label}
        className="form-check-input"
        type="radio"
        id="flexCheckDefault"
        {...register(name)}
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {label}
      </label>
    </div>
  );
};

export default MyRadiobox;
