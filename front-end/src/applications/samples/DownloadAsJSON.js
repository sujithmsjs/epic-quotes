import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const DownloadAsJSON = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 22 },
  ]);

  const downloadJsonFile = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'table_data.json');
  };

  return (
    <div>
      <table>
        {/* ... Table rendering code ... */}
      </table>

      <button onClick={downloadJsonFile}>Download JSON</button>
    </div>
  );
};

export default DownloadAsJSON;
