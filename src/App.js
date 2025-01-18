import { useState } from "react";
import "./App.css";
import FirstModal from "./FirstModal";
import ModalForm from "./ModalForm";

function App() {
  const [firstModal, setFirstModal] = useState(true);
  return (
    <div className="App">
      {firstModal && <FirstModal setFirstModal={setFirstModal} />}
      {!firstModal && <ModalForm />}
    </div>
  );
}

export default App;
