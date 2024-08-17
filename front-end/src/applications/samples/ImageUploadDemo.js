import React from 'react'
import { useState } from 'react';

export const ImageUploadDemo = () => {

    return (
        <div>
            <h1>Image Upload Example</h1>
            <ImageUpload />
        </div>
    );

}


const ImageUpload = () => {
    const [imageSrc, setImageSrc] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageDataUrl = event.target.result;
                setImageSrc(imageDataUrl);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageSrc && (
                <div>
                    <h2>Preview:</h2>
                    <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
