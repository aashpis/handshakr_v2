"use client";
import { useState } from "react";
import HandshakeCreationForm from "../ui/handshake-creation-form";
import HandshakeCard from "../ui/handshake-card"

const handshake = {
    id: "12345",
    initiator: "Shankar",
    agreerer: "Ari",
    compensation: "$20",
    terms: "I will sell you a used computer mouse for $20",
    status: "",
    notarized: false,
}

export default function Page() {
    return (<div className="flex flex-col items-center justify-top min-h-screen">

        <HandshakeCard {...handshake} />
    </div>

    );
}