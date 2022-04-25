import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavbarHome";
import UserDetail from "./components/UserDetail";
import UpdateUserDetail from "./components/UpdateUserDetail";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/userDetail" element={<UserDetail />} />
        <Route exact path="/updateUserDetail/:id" element={<UpdateUserDetail />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
