import { BrowserRouter, Routes, Route } from "react-router-dom"
import TimelinePage from "./pages/TimelinePage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/user/:id" element={< UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;