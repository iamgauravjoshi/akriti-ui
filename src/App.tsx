import { Route, Routes } from "react-router";
import "./App.css";
import ButtonDemo from "./components/ButtonsDemo";
import ModalDemo from "./components/ModalDemo";
import TableDemo from "./components/TableDemo";
import FormDemo01 from "./components/FormDemo01";
import FormDemo02 from "./components/FormDemo02";

function App() {
  return (
    <>
      <div
        className={
          "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-10"
        }
      >
        <Routes>
          <Route path="/" element={<ButtonDemo />} />
          <Route path="/modals" element={<ModalDemo />} />
          <Route path="/table" element={<TableDemo />} />
          <Route path="/form-demo" element={<FormDemo01 />} />
          <Route path="/form-demo-02" element={<FormDemo02 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
