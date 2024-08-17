

import React, { useState } from 'react'

export const ReadJSONData = () => {
    const [fileContent, setFileContent] = useState('');

    const handleFileUpload = (content) => {
        setFileContent(content);
    };

    //console.info(JSON.parse(fileContent));
    return (
        <div>
            <h1>React File Upload and Display Example</h1>
            <FileUploadForm onFileUpload={handleFileUpload} />
            {fileContent && (
                <div>
                    <h2>Uploaded File Content:</h2>
                    <pre>{fileContent}</pre>
                    <pre>{fileContent}</pre>
                </div>
            )}
        </div>
    );
}

const FileUploadForm = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      readFileContent(file);
    }
  };

  const readFileContent = (selectedFile) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      onFileUpload(fileContent);
    };

    reader.readAsText(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose a JSON file:
        <input type="file" onChange={handleFileChange} accept=".json" />
      </label>
      <button type="submit">Upload and Display</button>
    </form>
  );
};

export default FileUploadForm;
