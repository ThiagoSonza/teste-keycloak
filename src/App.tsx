import { BrowserRouter, Route, Routes } from "react-router-dom";
import Private from "./pages/private";
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
        <Route path="/" Component={Private} />
        <Route path="private" Component={Private} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
