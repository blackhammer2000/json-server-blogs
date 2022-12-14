import "./App.css";
import Header from "./components/js/Header";
import Blogs from "./components/js/Blogs";
import NewBlog from "./components/js/NewBlog";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App bg-dark">
      <Header />
      <div className="container col">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/home" element={<Blogs />} />
          <Route path="/new" element={<NewBlog />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
