import React from "react";

const MySubmitButton = ({ label = 'Undefined', formState = {} }) => {

    const { isDirty, isValid } = formState;

    const disable = false;
    if (isValid in formState && isDirty in formState) {
        const disable = !isValid || !isDirty;
    }

    return (
        <div className="d-grid gap-2 mt-3">
            <button
                className="btn btn-primary"
                type="submit"
                disabled={disable}
            >
                {label}
            </button>
        </div>
    );
};

export default MySubmitButton;
