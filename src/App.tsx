import { BrowserRouter, Route, Routes } from "react-router-dom";
import Private from "./pages/private";
import Home from "./pages/home";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./components/toast";
import Menu from "./components/menu";
import NotFound from "./pages/notfound";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toast />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="private" Component={Private} />
        <Route path="login" Component={Home} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
