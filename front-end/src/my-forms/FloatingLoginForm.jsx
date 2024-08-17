import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import MyFloatingInput from "../my-ui/MyFloatingInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MySubmitButton from "../my-ui/MySubmitButton";
import axios from "axios";

const schema = z.object({
  username: z.string().min(4).max(16),
  password: z.string().min(4).max(30),
});

const FloatingLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(schema)
  });

  // const form = useForm({
  //   resolver: zodResolver(schema),
  //   mode: "onSubmit", // Set validation to occur only on form submission
  // });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.info("Submitted data: ", data);
  };

  console.info('Render...')
  return (
    <>
      <h3>Login Form with ZOD</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <MyFloatingInput register={register} label="Username" errors={errors} />
        <MyFloatingInput
          register={register}
          type="password"
          label="Password"
          errors={errors}
        />
        <MySubmitButton label="Login" />
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FloatingLoginForm;
