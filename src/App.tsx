import { Route, Routes } from "react-router-dom";
import { ShowcaseLayout } from "./showcase/ShowcaseLayout";
import ButtonDemo from "./showcase/ButtonDemo";
import HomePage from "./showcase/HomePage";
import ModalDemo from "./showcase/ModalDemo";
import TableDemo from "./showcase/TableDemo";
import FieldFormDemo from "./showcase/FieldFormDemo";
import RhfFormDemo from "./showcase/RhfFormDemo";
import ToastDemo from "./showcase/ToastDemo";
import PrimitivesDemo from "./showcase/PrimitivesDemo";
import DisplayDemo from "./showcase/DisplayDemo";
import NavigationDemo from "./showcase/NavigationDemo";
import OverlaysDemo from "./showcase/OverlaysDemo";
import EntryDemo from "./showcase/EntryDemo";
import DataTableDemo from "./showcase/DataTableDemo";

function App() {
  return (
    <Routes>
      <Route element={<ShowcaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/buttons" element={<ButtonDemo />} />
        <Route path="/modals" element={<ModalDemo />} />
        <Route path="/table" element={<TableDemo />} />
        <Route path="/datatable" element={<DataTableDemo />} />
        <Route path="/form-demo" element={<FieldFormDemo />} />
        <Route path="/form-demo-02" element={<RhfFormDemo />} />
        <Route path="/toast" element={<ToastDemo />} />
        <Route path="/primitives" element={<PrimitivesDemo />} />
        <Route path="/display" element={<DisplayDemo />} />
        <Route path="/navigation" element={<NavigationDemo />} />
        <Route path="/overlays" element={<OverlaysDemo />} />
        <Route path="/entry" element={<EntryDemo />} />
      </Route>
    </Routes>
  );
}

export default App;
