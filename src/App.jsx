import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyProvider } from "./context/Context";
import "./Common.css";
import { allFiles } from "./components";


function App() {
  const {LandingPage,  SignIn, SignUp } =
    allFiles;
  return (
    <MyProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <main>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<Product />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/final" element={<Order />} />
            <Route path="/address" element={<Address />} /> */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </MyProvider>

  );
}

export default App;
