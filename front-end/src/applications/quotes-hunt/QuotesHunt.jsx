
import TagsList from './TagsList';
import AddQuote from './AddQuote';
import QuotesList from './QuotesList';

import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowTags from './ShowTags';
import AddTag from './AddTag';




function QuotesHunt() {

  const [showAdd, setShowAdd] = useState(false)


  const handleShowAdd = (event) => {
    setShowAdd(event.target.checked);
  }

  return (
    <></>
  );
}

const abc =
  (
    <>
      {/* <div class="container m-5">
        <h1 class="text-center mb-4">Quotes Collection</h1>

      </div>
      <NavBar />
      <div class="container mt-3">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" name='tags' id="tag1" onChange={handleShowAdd} />
          <label class="form-check-label" for="tag1">Show Add</label>
        </div>
        {
          showAdd && <AddQuote />
        }

        <QuotesList />
      </div> */}
    </>)



export default QuotesHunt;