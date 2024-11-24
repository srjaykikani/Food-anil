import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="pt-24 md:pt-32 pb-16 bg-slate-100 flex-grow">
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

