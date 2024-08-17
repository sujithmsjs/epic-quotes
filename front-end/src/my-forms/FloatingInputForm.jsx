import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import MyFloatingInput from "../my-ui/MyFloatingInput";


const FloatingInputForm = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.info(data);
  };

  return (
    <>
      <h3>Floating Inputs Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <MyFloatingInput register={register} label='First Name' errors={errors} />
        <MyFloatingInput register={register} label='Last Name' errors={errors} />
        <MyFloatingInput register={register} type='email' label='Email Address' errors={errors} />
        <MyFloatingInput register={register} type='number' label='Mobile' errors={errors} />

        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-primary"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>

      <DevTool control={control} />
    </>
  );
};

export default FloatingInputForm;
