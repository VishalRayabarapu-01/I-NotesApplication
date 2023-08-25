import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import GetStarted from "./components/GetStarted";
import UserHome from "./components/user/UserHome";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/get-started" exact element={<GetStarted />} />
          <Route path="/login" exact element={<UserHome />} />
          <Route path="/user/home" exact element={<UserHome />} />
        </Routes>
    </>
  );
}

export default App;
