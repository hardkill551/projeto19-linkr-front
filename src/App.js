import { BrowserRouter, Routes, Route } from "react-router-dom"
import TimelinePage from "./pages/TimelinePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
