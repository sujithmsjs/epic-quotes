import React, { useState } from 'react';
import ReactJson from 'react-json-view';

const JsonEditor = () => {
  const [jsonData, setJsonData] = useState({ key: 'value' });

  const handleJsonChange = (newData) => {
    setJsonData(newData.updated_src);
  };

  return (
    <div>
      <ReactJson
        src={jsonData}
        onEdit={handleJsonChange}
        onDelete={handleJsonChange}
        onAdd={handleJsonChange}
        displayDataTypes={false}
        enableClipboard={false}
        theme="monokai"
      />
    </div>
  );
};

export default JsonEditor;