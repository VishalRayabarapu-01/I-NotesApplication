import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import LoginForm from './components/LoginForm'
import GetStarted from "./components/GetStarted";
import UserHome from "./components/user/UserHome";
import UserState from "./contexts/UserState";
import PrivateLogin from './PrivateLogin'

function App() {
  return (
    <>
      <UserState>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/get-started" exact element={<GetStarted />} />
          <Route path="/login" exact element={<LoginForm /> } />
          <Route path="/user/*" exact element={<PrivateLogin><UserHome /></PrivateLogin>} />
        </Routes>
      </UserState>
    </>
  );
}

export default App;
