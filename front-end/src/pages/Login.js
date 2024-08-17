import { useDispatch } from "react-redux";
import { login } from "../store/AuthReducer";
import { DevTool } from "@hookform/devtools";
import { useRef } from "react";
import { redirect, useActionData, useNavigate, useSubmit } from "react-router-dom";
import Illigal from "../my-ui/Illegal";
import MyFloatingInput from "../my-ui/MyFloatingInput";
import { useForm } from "react-hook-form";


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";

const schema = z.object({
  username: z.string().min(4).max(16),
  password: z.string().min(4).max(16)
});

export default function Login() {

  const [showError, setshowError] = useState(false);
  const submit = useSubmit();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const actionData = useActionData();
  const form = useForm({
    resolver: zodResolver(schema)
  });
  const { register, control, reset, handleSubmit, formState, setFieldTouched } = form;
  const { errors, isDirty, isValid } = formState;

  if (actionData && actionData.success) {
    dispath(login(actionData.username));
    navigate('/')
  }

  if (actionData && actionData.error) {
    console.log('Login test...');
    
  }

  const onSubmit = (data) => {
    console.info(data);
    submit(data, { method: 'post' });
  };

  return (
    <>
      <h1>Login</h1>
      <Illigal isLoginRequired={false} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <MyFloatingInput register={register} errors={errors} label='username' />
        <MyFloatingInput register={register} errors={errors} label='Password' type='password' />
        {
          actionData && actionData.error && <p style={{ color: 'red' }}>Username or Password is worng</p>
        }
        <button type="submit" className="btn btn-primary my-4">Login</button>
      </form>

      <DevTool control={control} />
    </>
  );
}


const loginAction = async ({ request }) => {
  const data = await request.formData();
  const authData = {
    email: data.get('username'),
    password: data.get('password'),
  };
  console.info('Login Action : ', authData);

  if (authData.password !== 'Admin@1234') {
    return { error: 'Hey man! you have error!' }
  } else {
    return { success: 'Login successful', username: authData.email }
  }
}

export { loginAction }