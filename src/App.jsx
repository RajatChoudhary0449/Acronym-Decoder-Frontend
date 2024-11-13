import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import List from "./Components/List";
import EditAcronym from "./Components/EditAcronym";
import AddAcronym from "./Components/AddAcronym";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/list" element={<List></List>} />
        <Route path="/add-query" element={<AddAcronym></AddAcronym>} />
        <Route path="/edit-query/:slug" element={<EditAcronym></EditAcronym>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
