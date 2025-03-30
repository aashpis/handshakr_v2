import { useState } from "react";
import HandshakeCreationForm from "../ui/handshake-creation-form";

export default function InitiateHandshake() {
  const [showHandshakeForm, setShowHandshakeForm] = useState(false);

  return (
    <div className="m-auto">
      {!showHandshakeForm ? (
        <button
          onClick={() => setShowHandshakeForm(true)}
          className="bg-primary text-neutral px-4 py-2 rounded-md mt-4"
        >
          Initiate New Handshake
        </button>
      ) : (
        <div>
          <HandshakeCreationForm />
          <button
            onClick={() => setShowHandshakeForm(false)} // Cancel button
            className="bg-gray-500 text-neutral px-4 py-2 rounded-md mt-4"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}