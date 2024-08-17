import MyCheckbox from "./MyCheckbox";

const MyCheckboxGroup = ({ name, options, register }) => {
  return (
    <div>
      <h4>{name}</h4>
      {options.map((e, i) => (
        <MyCheckbox key={i} name={name} label={e} register={register} />
      ))}
    </div>
  );
};

export default MyCheckboxGroup;
