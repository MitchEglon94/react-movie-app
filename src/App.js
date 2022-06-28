import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import OffCanvasMenu from "./components/OffCanvasMenu";

function App() {
  return (
    <div className="App">
      <Header />
      <OffCanvasMenu />
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
