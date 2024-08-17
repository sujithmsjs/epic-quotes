import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import MyFloatingInput from "../my-ui/MyFloatingInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import MySubmitButton from "../my-ui/MySubmitButton";
import axios from "axios";

const schema = z.object({
  name: z.string().min(4).max(16),
  emailAddress: z.string().min(4).max(30),
  password: z.string().min(4).max(30),
  confirmPassword: z.string().min(4).max(16),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine(async (id) => {

  const user = await axios('https://jsonplaceholder.typicode.com/users');
  const list = user.data;
  return list.every(u => u.email !== id.emailAddress);

}, {
  message: 'Email already existed',
  path: ["emailAddress"],
});


const FloatingInputFormZotSignupUsername = () => {

  const form = useForm({
    resolver: zodResolver(schema)
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.info('Submitted data: ', data);
  };

  return (
    <>
      <h3>Floating Inputs Form With ZOD Signup Username</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <MyFloatingInput register={register} label='Name' errors={errors} />
        <MyFloatingInput register={register} type='email' label='Email Address' errors={errors} />
        <MyFloatingInput register={register} type='password' label='Password' errors={errors} />
        <MyFloatingInput register={register} type='password' label='Confirm Password' errors={errors} />
        <MySubmitButton label='Signup' />

      </form>
      <DevTool control={control} />
    </>
  );
};

export default FloatingInputFormZotSignupUsername;
