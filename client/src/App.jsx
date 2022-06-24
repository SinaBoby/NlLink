import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import CreateUser from "./pages/User/CreateUser";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import { AuthProvider } from "./AuthContext";
//import { SocketProvider } from "./SocketContext";
import { UserDetailsProvider } from "./context/UserDetailsContext";

import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth";
import Connect from "./pages/Connect/Connect";
import RecommendedConnections from "./pages/RecommendedConnections/RecommendedConnections";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./pages/Chat/Chat";
import NewsDetails from "./pages/News/NewsDetails";
import AddNews from "./pages/News/AddNews";
import Activity from "./pages/Activity/Activity";
import CreateActivity from "./pages/Activity/CreateActivity";

const App = () => {
  return (
    <>
      <AuthProvider>
        <UserDetailsProvider>
          <Nav />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/user/create" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/news/details/" element={<NewsDetails />} />
            <Route element={<RequireAuth />}>
              <Route path="/connect" element={<Connect />} />
              <Route
                path="/recommended-connections"
                element={<RecommendedConnections />}
              />
              <Route path="/chat/:refId" element={<Chat />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/news/add" element={<AddNews />} />
              <Route path="/activities" element={<Activity />} />
              <Route path="/activities/create" element={<CreateActivity />} />
            </Route>
          </Routes>
          <Footer />
        </UserDetailsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
