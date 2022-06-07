import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import { AuthProvider } from "./AuthContext";
import { UserDetailsProvider } from "./context/UserDetailsContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <>
      <AuthProvider>
        <UserDetailsProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
          <Footer />
        </UserDetailsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
