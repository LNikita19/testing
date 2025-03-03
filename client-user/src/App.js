import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./component/Home/Home";
// import Footer from "./component/Footer";
// import Navbar from "./component/Navbar";
// import About from "./component/About/about";
// import Activities from "./component/Activities/Activities";
// import AdmissionPage from "./component/Admission/admissionPage";
// import Contact from "./component/Contact/Contact";
// import Newsletter from "./component/Newsletter";
import MyForm from "./component/Test";
function App() {
  return (
    <Router>
      <div className="w-screen">
        {/* <Navbar /> */}

        {/* Routes */}
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/admissions" element={<AdmissionPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Newsletter" element={<Newsletter />} /> */}
          <Route path="/MyForm" element={<MyForm />} />
          {/* Add other routes as necessary */}
        </Routes>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
