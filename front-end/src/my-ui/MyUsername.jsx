import React from "react";

const MyUsername = ({ label, register, errors }) => {
  const { name } = { ...register };
  const isError = !!errors[name];

  return (
    <div className="pt-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className={`form-control ${isError ? "is-invalid" : ""}`}
        id={name}
        {...register} // Pass the name as an argument to register
      />
      {isError && (
        <div className="invalid-feedback">{errors[name]?.message}</div>
      )}
      {/* No need htmlFor a "valid-feedback" div, you can remove it */}
    </div>
  );
};

export default MyUsername;
