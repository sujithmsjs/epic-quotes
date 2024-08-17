import MyRadiobox from "./MyRadiobox";

const MyRadioboxGroup = ({ name, options, register }) => {
  return (
    <div>
      <h4>{name}</h4>
      {options.map((e, i) => (
        <MyRadiobox key={i} name={name} label={e} register={register} />
      ))}
    </div>
  );
};

export default MyRadioboxGroup;
