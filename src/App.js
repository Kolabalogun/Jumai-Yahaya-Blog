import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Pages from "./Functions/Pages";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />

      <Pages />
    </div>
  );
}

export default App;
