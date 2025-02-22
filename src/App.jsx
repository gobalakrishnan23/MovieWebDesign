import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./assets/component/home";
import Api from "./assets/component/api";
import TopRated from "./assets/component/topRated";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/api" element={<Api/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/toprated" element={<TopRated/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
