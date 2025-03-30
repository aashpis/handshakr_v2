"use client";
import { useState } from "react";
import HandshakeCreationForm from "../ui/handshake-creation-form";
import HandshakeCard from "../ui/handshake-card"

const handshakes = [
    {
        id: "12345",
        initiator: "Shankar",
        agreererer: "Ari",
        compensation: "$20",
        terms: "I will sell you a used computer mouse for $20",
        status: "completed",
        notarized: false,
    },
    {
        id: "12346",
        initiator: "Lenny",
        agreererer: "Mike",
        compensation: "Lunch",
        terms: "I will help you move furniture in exchange for lunch",
        status: "completed",
        notarized: false,
    },
    {
        id: "12347",
        initiator: "Jordan",
        agreerer: "Casey",
        compensation: "$50",
        terms: "I will design a logo for your startup for $50",
        status: "completed",
        notarized: "John Doe",
    },
    {
        id: "12348",
        initiator: "Ari",
        agreerer: "Mekky",
        compensation: "Takis",
        terms: "I will give you a bag Takis for a pizza",
        status: "failed",
        notarized: false,
    },
    {
        id: "12349",
        initiator: "Sam",
        agreerer: "Morgan",
        compensation: "$100",
        terms: "I will develop a simple website for you for $100",
        status: "completed",
        notarized: "Jane Smith",
    }
];




    export default function Page() {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen">
                {handshakes.map((handshake) => (
                    <HandshakeCard key={handshake.id} {...handshake} />
                ))}
            </div>
        );
    }