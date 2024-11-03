import React from "react";
import "./Homepage.scss";
import Footer from "../Footer";
import Nav from "../nav";
import Header from "../Header";
import Content from "../content";

const Homepage = () => (
  <div className="App">
    <Nav />
    <Header />
    <Content />
    <Footer />
  </div>
);

export default Homepage;
