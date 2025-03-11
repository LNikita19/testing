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
// import MyForm from "./component/Test";
import Navbar from "./component/Navbar";
import About from "./component/About";
import Footer from "./component/footer";
function App() {
  return (<div className="">
    <Navbar />

    <About />
    <Footer />


  </div>
  );
}

export default App;
