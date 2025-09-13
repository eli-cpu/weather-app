import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AddressPage from "./pages/address/AddressPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [plz, setPlz] = useState("");
  function handleSubmit(plz) {
    document.cookie = `plz=${plz}; path=/; max-age=31536000`;
  }

  // Cookie-Abfrage in useEffect
  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )plz=([^;]+)"));
    if (match) {
      const cookiePlz = match[2];
      setPlz(cookiePlz);
      setSubmitted(true);
    }
  }, []);

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Oberer Bereich für Logo und weitere Elemente */}
      <div className="flex items-center h-20 pt-15">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-30 h-30 cursor-pointer"
          onClick={() => setSubmitted(false)}
        />
        {/* Hier kannst du später weitere Elemente ergänzen */}
      </div>
      {/* Hauptinhalt */}
      <div>
        <Toaster />
        {submitted ? (
          <HomePage plz={plz} />
        ) : (
          <AddressPage
            plz={plz}
            setPlz={setPlz}
            handleSubmit={handleSubmit}
            setSubmitted={setSubmitted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
