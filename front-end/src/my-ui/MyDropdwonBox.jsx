

const mockRegister = (name) => {
  return {
  }
}

const MyDropdwonBox = ({ name, options = [], register = mockRegister, onChange }) => {



  return (
    <>
      <label htmlFor="browser" className="form-label">
        {name}
      </label>
      <select className="form-select" {...register(name)} onChange={onChange}>
        {options.map((e, i) => (
          <option key={i}>{e}</option>
        ))}
      </select>
    </>
  );
};

export default MyDropdwonBox;
