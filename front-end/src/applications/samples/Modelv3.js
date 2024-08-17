import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const QuoteTable = ({ quotes }) => (
  <table>
    <thead>
      <tr>
        <th>Quote</th>
        <th>Author</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      {quotes.map((quote, index) => (
        <tr key={index}>
          <td>{quote.quote}</td>
          <td>{quote.author}</td>
          <td>{quote.tags.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Modelv3 = () => {
  const [quotes, setQuotes] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const jsonData = JSON.parse(content);
      setQuotes(jsonData.quotes || []);
    } catch (error) {
      console.error('Error reading the file:', error);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.error('Error reading the file json file');
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} accept=".json" onChange={handleFileChange} />
      {quotes.length > 0 ? <QuoteTable quotes={quotes} /> : <p>No quotes to display.</p>}
    </div>
  );
};


