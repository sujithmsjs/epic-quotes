import React from 'react'

import { useEffect, useState } from "react";
import { isValid } from 'zod';

const TagSelector = ({ label = 'Undefined', type = 'text', onChange }) => {
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [valid, setValid] = useState(false);
    const [typing, setTyping] = useState(false);

    let inputLabel = label.replaceAll(' ', '');
    inputLabel = inputLabel[0].toLowerCase() + inputLabel.substring(1);


    const handleTextChange = (event) => {



        setTyping(true);
        setText(event.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {

            if(text.length === 0){
                setValid(true);
                setTags([]);
                setTyping(false);
                onChange([]);
                return;
            }

            const pattern = /^[a-z]+$/
            //const allTags = text.split(",").filter(s => s.trim().length > 1);
            const allTags = text.split(",").map(t => t.trim());
            const validTags = text.split(",").filter(t => t.trim().match(pattern));
            
            console.info('validTags.length', validTags.length);
            console.info('allTags.length', allTags.length);

            if (allTags.length === validTags.length) {
                console.info('Tags are valid ', validTags);
                setValid(true);
                setTags(validTags);
                onChange(validTags);
            } else {
                console.info('Tags are invalid');
                setValid(false);
                
            }
            setTyping(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [text])

    return (
        <div className="form-floating mb-3">
            
            <input
                type={type}
                name={inputLabel}
                className={`form-control ${typing? '' : valid ? "is-valid" : "is-invalid"}`}
                placeholder={label}
                onChange={handleTextChange}
            />
            
            <label htmlFor="floatingInput">{label}</label>

            {
                typing && <p>Typing...</p>
            }

            {
                !typing &&
                <>
                    <h5 style={{fontSize : '14px'}} className="valid-feedback">{tags.join(", ")}</h5>
                    <div className="invalid-feedback">Invalid Tags</div>
                </>
            }
            <p>{valid}</p>
        </div>
    );



};

export default TagSelector;
