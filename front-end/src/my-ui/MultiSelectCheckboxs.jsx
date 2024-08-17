

import { useState } from 'react'
import './App.css'



const arr = Array.from({ length: 10 }, (_, i) => i + 1);
const max = 10;

console.info(arr);

function MultiSelectCheckboxs() {
  const [selectAll, setSelectAll] = useState(false);
  const [checks, setChecks] = useState([1, 2, 3, 10, 5]);

  const handleCheck = (event, id) => {

    const checked = event.target.checked;

    setChecks(prv => {
      if (checked) {
        if (prv.length + 1 === max) {
          setSelectAll(true);
        }
        return [...prv, id];
      } else {
        const index = prv.findIndex(e => e === id);
        if (index > -1) {
          setSelectAll(false);
          return [...prv.slice(0, index), ...prv.slice(index + 1, prv.length)];
        }
        return prv;
      }
    });



  }

  const handleSave = () => {
    console.info(checks.join());
  }

  const handleSelectAll = (event) => {
    console.info('Select All: ', event.target.checked)
    const ck = event.target.checked;
    setSelectAll(ck);
    if (ck) {
      setChecks(arr);
    } else {
      setChecks([]);
    }

  }


  return (
    <div>

      <input type='checkbox' key={'selectAll'} checked={selectAll} name='show' onChange={handleSelectAll} /> Select All <br />
      {
        arr.map(e => <div key={e}><input type='checkbox' name='show' checked={checks.includes(e)} onChange={(event) => handleCheck(event, e)} /> {e} {checks.includes(e) + ''} </div>)
      }
      <p>{arr.join()}</p>
      <p>{checks.join()}</p>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default MultiSelectCheckboxs

