import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
// import JSONInput from "react-json-editor-ajrm/index";
// import locale from "react-json-editor-ajrm/locale/en";
import { removeDuplicates, saveAllQuotes } from '../../util/apis';

const initData = `[
    {
        "quote": "Life is what happens when you're busy making other plans.",
        "author": "John Lennon",
        "reference": "Song: Beautiful Boy (Darling Boy)",
        "tags": ["life", "wisdom", "inspiration"]
    }
]`

export const ImportQuotes = () => {

    const [data, setData] = useState([]);
    const [text, setText] = useState(initData);
    const textArea = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        console.info(file);
        //  setFile(file);
        try {
            const content = await file.text();
            const jsonData = JSON.parse(content);
            console.info(jsonData);
            setData(jsonData);
            setText(content);
        } catch (err) {
            console.error('Error reading the file:', err);
        }
    }

    const handleLoadData = () => {
        try {
            const jsonData = JSON.parse(textArea.current.value);
            console.info('Load data...', jsonData)
            //setText(jsonData)
            setData(jsonData);

        } catch (err) {
            console.info('Error while writing as table:', err.message);
            toast.error(err.message);
        }
    }

    const handleRemoveExistedQuotes = async () => {
        console.info('handleOnChange data...', data);

        if (data.length < 1) {
            toast.warn('Nothing to save!');
            return;
        }

        const allSaved = await removeDuplicates(data);
        if (allSaved === null)
            return;

        setData(allSaved);
        textArea.current.value = JSON.stringify(allSaved, null, 5);

    }

    const handleOnChange = async () => {
        console.info('handleOnChange data...', data);

        if (data.length < 1) {
            toast.warn('Nothing to save!');
            return;
        }




        const allSaved = await saveAllQuotes(data);
        if (allSaved) {


            toast.info('Saved all the quotes.');


            const { total, fail, pass, failedQuotes } = allSaved;
            setData(failedQuotes);
            textArea.current.value = JSON.stringify(failedQuotes, null, 5);
            toast.info(`${total} out of ${pass} saved. ${fail} failed.`);
        } else {
            toast.error('Error! while saving quote');
        }

    }

    return (
        <div className='container-fluid'>
            <p>
                <pre>
                    {text}
                </pre>
            </p>
            <div className='row'>


                <div className='col-12'>


                    <input type='file' className='form-control' onChange={handleFileChange} accept=".json" />
                    {
                        null && file &&
                        <>
                            <h4>{file.name}</h4>
                            <h4>{file.size}</h4>
                            <h4>{file.type}</h4>
                        </>
                    }
                </div>
            </div>
            <div className='row'>
                <div class="mb-3 col-md-6" style={{ maxHeight: '100%' }}>

                    <textarea class="form-control" ref={textArea} id="exampleFormControlTextarea1" rows="3" defaultValue={text}></textarea>



                    <button className='btn btn-primary' onClick={handleLoadData}>Display as Table</button>
                   
                </div>
                <div class="mb-3 col-md-6">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">quote</th>
                                <th scope="col">author</th>
                                <th scope="col">reference</th>
                                <th scope="col">tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map(r =>
                                    <tr>
                                        <th scope="row">{r.quote}</th>
                                        <td>{r.author}</td>
                                        <td>{r.reference}</td>
                                        <td>{r.tags.join()}</td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                    <button className='btn btn-info' onClick={handleOnChange}>Save</button>
                    <button className='btn btn-warning' onClick={handleRemoveExistedQuotes}>Remove Existed Quotes</button>
                    
                </div>
            </div>
        </div >
    )
}
