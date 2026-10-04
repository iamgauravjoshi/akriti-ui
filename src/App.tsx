import { Navigate, Route, Routes } from "react-router-dom";
import { ShowcaseLayout } from "./showcase/ShowcaseLayout";
import HomePage from "./showcase/HomePage";
import ComponentsHome from "./showcase/ComponentsHome";
import ButtonDemo from "./showcase/ButtonDemo";
import ModalDemo from "./showcase/ModalDemo";
import TableDemo from "./showcase/TableDemo";
import DataTableDemo from "./showcase/DataTableDemo";
import FieldFormDemo from "./showcase/FieldFormDemo";
import RhfFormDemo from "./showcase/RhfFormDemo";
import ToastDemo from "./showcase/ToastDemo";
import PrimitivesDemo from "./showcase/PrimitivesDemo";
import DisplayDemo from "./showcase/DisplayDemo";
import NavigationDemo from "./showcase/NavigationDemo";
import OverlaysDemo from "./showcase/OverlaysDemo";
import EntryDemo from "./showcase/EntryDemo";
import DocsHome from "./showcase/docs/DocsHome";
import GettingStarted from "./showcase/docs/GettingStarted";
import Theming from "./showcase/docs/Theming";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ShowcaseLayout />}>
        <Route path="/components" element={<ComponentsHome />} />
        <Route path="/components/buttons" element={<ButtonDemo />} />
        <Route path="/components/primitives" element={<PrimitivesDemo />} />
        <Route path="/components/field-form" element={<FieldFormDemo />} />
        <Route path="/components/rhf-form" element={<RhfFormDemo />} />
        <Route path="/components/inputs" element={<EntryDemo />} />
        <Route path="/components/table" element={<TableDemo />} />
        <Route path="/components/datatable" element={<DataTableDemo />} />
        <Route path="/components/display" element={<DisplayDemo />} />
        <Route path="/components/navigation" element={<NavigationDemo />} />
        <Route path="/components/modals" element={<ModalDemo />} />
        <Route path="/components/overlays" element={<OverlaysDemo />} />
        <Route path="/components/toast" element={<ToastDemo />} />
        <Route path="/docs" element={<DocsHome />} />
        <Route path="/docs/getting-started" element={<GettingStarted />} />
        <Route path="/docs/theming" element={<Theming />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
