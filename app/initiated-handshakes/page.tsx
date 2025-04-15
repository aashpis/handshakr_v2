// import HandshakeCard from "@/_ui/handshake-card"
import PageHeader from "@/_ui/page-header"

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-top min-h-screen">
            <PageHeader
                title="Initiated Handshake"
                subTitle="Handshakes you have initiated"
            />
        </div>

    );
}