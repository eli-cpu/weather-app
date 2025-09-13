import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function isValidGermanPlz(plz) {
  // Must be a string of 5 digits
  if (!/^\d{5}$/.test(plz)) return false;
  const num = parseInt(plz, 10);
  // Valid range for German PLZ: 01067 to 99998, not starting with 00
  return num >= 1067 && num <= 99998 && !plz.startsWith("00");
}

function AddressPage({ plz, setPlz, handleSubmit, setSubmitted }) {
  return (
    <>
      <div className="logo absolute top-0 left-0 m-4"></div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-start w-96 scale-200">
          <input
            id="input"
            type="text"
            placeholder="Postleitzahl eingeben"
            className="input rounded-full"
            value={plz}
            onChange={(e) => setPlz(e.target.value)}
          />
          <input
            type="button"
            value="Submit"
            className="input w-40 h-8 mt-4 ml-1"
            onClick={() => {
              if (isValidGermanPlz(plz)) {
                handleSubmit(plz);
                toast.success("Valide Postleitzahl!");
                setSubmitted(true);
              } else {
                console.error("Ungültige Postleitzahl!");
                toast.error("Ungültige Postleitzahl!");
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
export default AddressPage;
