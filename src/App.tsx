import { Route, Routes } from "react-router-dom";
import { ShowcaseLayout } from "./showcase/ShowcaseLayout";
import ButtonDemo from "./showcase/ButtonDemo";
import ModalDemo from "./showcase/ModalDemo";
import TableDemo from "./showcase/TableDemo";
import FieldFormDemo from "./showcase/FieldFormDemo";
import RhfFormDemo from "./showcase/RhfFormDemo";
import ToastDemo from "./showcase/ToastDemo";

function App() {
  return (
    <Routes>
      <Route element={<ShowcaseLayout />}>
        <Route path="/" element={<ButtonDemo />} />
        <Route path="/modals" element={<ModalDemo />} />
        <Route path="/table" element={<TableDemo />} />
        <Route path="/form-demo" element={<FieldFormDemo />} />
        <Route path="/form-demo-02" element={<RhfFormDemo />} />
        <Route path="/toast" element={<ToastDemo />} />
      </Route>
    </Routes>
  );
}

export default App;
