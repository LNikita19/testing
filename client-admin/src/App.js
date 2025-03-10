import "./App.css";
import About from "./component/About/About";
import Navbar from "./component/Home/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUsPage from "./component/contact/contact";
import Home from "./component/Home/Home";
import { ToastContainer } from "react-toastify";
// import OnlineClass from "./component/Onlineclass"; // Make sure the path is correct
import Login from "./component/Login/login";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Author from "./component/Author/Author";
import Testimonials from "./component/Testimonials/Testimonial";
import Footer from "./component/Footer/Footer";
import Program from "./component/Program/Program";
import ProgramList from "./component/Program/ProgramLIst";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fake login function just for demonstration purposes
  const login = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      <Router>
        <ToastContainer className="!z-[999999]" />
        <div className="flex w-full bg-[#FFF9E1] ">
          {/* {isLoggedIn && <Navbar />} */}
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate replace to="/login" />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route
                path="/Home"
                element={<Home />}
              // element={
              //   isLoggedIn ? <Home /> : <Navigate replace to="/login" />
              // }
              />
              <Route path="/About" element={<About />} />
              <Route path="/Program" element={<Program />} />
              <Route path="/ProgramList" element={<ProgramList />} />

              <Route path="/Author" element={<Author />} />
              <Route path="/ContactUsPage" element={<ContactUsPage />} />
              {/* <Route path="/onlineclass" element={<OnlineClass />} /> */}

              <Route path="/Testimonials" element={<Testimonials />} />
              <Route path="/Footer" element={<Footer />} />

              {/* Redirect to Home if the route is not found */}
              <Route path="*" element={<Navigate replace to="/Home" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
