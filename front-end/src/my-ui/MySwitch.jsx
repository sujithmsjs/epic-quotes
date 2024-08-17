


import React from 'react'
import { Form } from 'react-bootstrap'

export const MySwitch = ({label = "Undefined",checked = false, register = () => { }, onChange = () => { } }) => {

    let inputLabel = label.replaceAll(' ', '');
    inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);

    const r = register(inputLabel);

    return (
        <div class="form-check form-switch">
            <input 
                class="form-check-input"
                {...r}
                name={inputLabel}
                type="checkbox"
                role="switch"
                style={{ width: '3em', height: '1.5em' }} />
            <label class="form-check-label m-1">{label}</label>
        </div>
    )
}
