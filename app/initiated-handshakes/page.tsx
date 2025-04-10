import HandshakeCard from "@/_ui/handshake-card"
import PageHeader from "@/_ui/page-header"
import LoginForm from "@/_ui/login-form";
const handshake = {
    id: "12345",
    initiator: "Shankar",
    agreerer: "Ari",
    compensation: "$20",
    terms: "I will sell you a used computer mouse for $20",
    status: "pending",
    notarized: false,
    notary: null
}

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-top min-h-screen">
            <PageHeader
                title="Initiated Handshake"
                subTitle="Handshakes you have initiated"
            />
            <HandshakeCard {...handshake} />
            <LoginForm />
        </div>

    );
}