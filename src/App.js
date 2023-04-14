import { Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Home/SignIn";
import SignUp from "./Pages/Home/SignUp";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/sign-in" element={<SignIn/>}></Route>
    <Route path="/sign-up" element={<SignUp/>}></Route>

  </Routes>
  );
}

export default App;
