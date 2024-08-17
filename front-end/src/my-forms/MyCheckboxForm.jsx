import { DevTool } from "@hookform/devtools";
import { Dropdown } from "bootstrap";

import React from "react";
import { useForm } from "react-hook-form";
import MyFloatingInput from "../my-ui/MyFloatingInput";

import MyRadioboxGroup from "../my-ui/MyRadioboxGroup";
import MyDropdwonBox from "../my-ui/MyDropdwonBox";
import MyCheckboxGroup from "../my-ui/MyCheckboxGroup";

const MyCheckboxForm = () => {
  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: {
      skills: ["Java", "Phytho"],
      games: "Tank",
      country: "India"
    }
  });
  const { errors, isDirty, isValid } = formState;

  const onSubmit = (data) => {
    console.info(JSON.stringify(data, null, 5));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <MyFloatingInput name="email" register={register} />

        <MyDropdwonBox
          name="country"
          options={["India", "Chaina", "Pakisthan"]}
          register={register}
        />

        <MyCheckboxGroup
          name="skills"
          options={["Java", "Phytho", "C++"]}
          register={register}
        />

        <MyRadioboxGroup
          name="games"
          options={["Mario", "Contra", "Tank", "Lion king"]}
          register={register}
        />

        <button
          type="submit"
          className="btn btn-success"
          disabled={!isDirty || !isValid}
        >
          Print
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default MyCheckboxForm;
