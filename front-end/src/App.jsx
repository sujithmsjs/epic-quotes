

import "popper.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AddQuote } from "./applications/quotes-hunt/AddQuote";
import AddTag from "./applications/quotes-hunt/AddTag";
import Metrics from "./applications/quotes-hunt/Metrics";
import Proverbs from "./applications/quotes-hunt/Proverbs";
import QuotesList from "./applications/quotes-hunt/QuotesList";
import QuotesListV2 from "./applications/quotes-hunt/QuotesListV2";
import QuotesListV3 from "./applications/quotes-hunt/QuotesListV3";
import QuotesNavBar2 from './applications/quotes-hunt/QuotesNavBar2';
import { SearchBarTest } from "./applications/quotes-hunt/SearchBarTest";
import ShowTags from "./applications/quotes-hunt/ShowTags";
import { ConfirmDialogProvider } from "./context/ConfirmDialogContext";
import { store } from "./store/store";
import { ImportQuotes } from "./applications/quotes-hunt/ImportQuotes";

const router = createBrowserRouter([
  {
    path: '/',
    element: <QuotesNavBar2 />,
    children: [
      {
        index: true,
        element: <QuotesList />,
      },
      {
        path: 'home',
        element: <QuotesListV2 />,
      },
      {
        path: 'add',
        element: <AddQuote />
      },
      {
        path: 'add/:quoteId',
        element: <AddQuote />
      },
      {
        path: 'tags',
        element: <ShowTags />
      },
      {
        path: 'proverbs',
        element: <Proverbs />
      },
      {
        path: 'add-tag',
        element: <AddTag />
      },
      {
        path: 'search-test',
        element: <SearchBarTest />
      },
      {
        path: "import",
        element: <ImportQuotes />
      },
      {
        path: 'metrics',
        element: <Metrics />
      },
      {
        path: 'listv3',
        element: <QuotesListV3 />
      },
    ]
  }
])



export default function App() {

  // const [isDark, setDarkTheme] = useState(false);
  // document.documentElement.setAttribute('data-bs-theme', isDark ? "dark" : "light");
  document.documentElement.setAttribute('data-bs-theme', "dark");

  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
        <ConfirmDialogProvider>
          <RouterProvider router={router}></RouterProvider>
        </ConfirmDialogProvider>
      </Provider>
    </>
  );
}
