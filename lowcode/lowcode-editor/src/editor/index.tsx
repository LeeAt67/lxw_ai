import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./components/Header";
import Material from "./components/Material";
import Setting from "./components/Setting";
import EditArea from "./components/EditArea";
export default function LowercodeEditor() {
  return (
    <div className="h-[100vh] flex flex-col">
    <Header/>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Material/>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <EditArea/>
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting/>
        </Allotment.Pane>
      </Allotment>
     
    </div>
  );
}
