import { BrowserRouter, Routes, Route } from "react-router-dom"
import TimelinePage from "./pages/TimelinePage";
import UserPage from "./pages/UserPage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path='/hashtag/:hashtag' element={<Hashtag />} />
        <Route path="/user/:id" element={< UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
