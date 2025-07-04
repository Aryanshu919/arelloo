import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RegisterPage from "./pages/Register";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import SignInPage from "./pages/SignIn";
import ProjectBoards from "./pages/ProjectBoards";
import ProjectBoardView from "./pages/ProjectBoardView";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/boards" element={<ProjectBoards />} />
        <Route path="/board/:boardId" element={<ProjectBoardView />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

    </BrowserRouter>
    <Toaster/>
  </div>
  );
}

export default App;