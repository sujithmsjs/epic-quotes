import { useId } from "react";


const mockRegister = () => ({});


const MyFloatingPassword = ({ label = 'Undifined', type = 'password', register = mockRegister, errors }) => {


  const id = useId();

  let inputLabel = label.replaceAll(' ', '');
  inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);
  const isError = !!errors?.[inputLabel];

  return (
    <div class="input-group ">

      <div class="form-floating is-invalid">

        <input
          type={type}
          name={inputLabel}
          className={`form-control ${isError ? "is-invalid" : ""}`}
          placeholder={label}

          {...register(inputLabel)}
        />

        <label for="floatingInputGroup2">{label}</label>
      </div>
      <span class="input-group-text">@</span>


      {isError && (
        <div className="invalid-feedback">{errors[inputLabel]?.message}</div>
      )}

    </div>
  );
};


// const demo2 = (
// <div class="input-group has-validation">
//   <span class="input-group-text">@</span>

//   <div className="form-floating mb-3">
{/* <input
  type={type}
  name={inputLabel}
  className={`form-control ${isError ? "is-invalid" : ""}`}
  placeholder={label}

  {...register(inputLabel)}
/> */}
//     <label >{label}</label>
//   </div>


// {
//   isError && (
//     <div className="invalid-feedback">{errors[inputLabel]?.message}</div>
//   )
// }
// </div>
// );

export default MyFloatingPassword;
