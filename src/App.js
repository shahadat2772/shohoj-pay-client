import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Navbar from "./Components/Shared/Navbar/Navbar";
import Footer from "./Components/Shared/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Authentication/Login/Login";
import NotFound from "./Components/Shared/NotFound/NotFound";
import SignUp from "./Components/Pages/Authentication/SignUp/SignUp";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./Components/Pages/Authentication/ResetPassword/ResetPassword";
import {ChatEngine} from 'react-chat-engine';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
