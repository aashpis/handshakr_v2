import HandshakeCard from "@/_ui/handshake-card"

const handshake = {
    id: "12345",
    initiator: "Shankar",
    agreerer: "Ari",
    compensation: "$20",
    terms: "I will sell you a used computer mouse for $20",
    status: "pending",
    notarized: false
}

export default function Page() {
    return (
    <div className="flex flex-col items-center justify-top min-h-screen">
        <h1>Pending Handshakes</h1>
        <HandshakeCard {...handshake} />
    </div>

    );
}