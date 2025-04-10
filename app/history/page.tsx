import HandshakeCard from "@/_ui/handshake-card"
import PageHeader from "@/_ui/page-header"

const handshakes = [
    {
      id: "12345",
      initiator: "Shankar",
      agreerer: "Ari",
      compensation: "$20",
      terms: "I will sell you a used computer mouse for $20",
      status: "completed",
      notarized: false,
      notary: null,
    },
    {
      id: "12346",
      initiator: "Lenny",
      agreerer: "Mike",
      compensation: "Lunch",
      terms: "I will help you move furniture in exchange for lunch",
      status: "completed",
      notarized: false,
      notary: null,
    },
    {
      id: "12347",
      initiator: "Jordan",
      agreerer: "Casey",
      compensation: "$50",
      terms: "I will design a logo for your startup for $50",
      status: "completed",
      notarized: true,
      notary: "John Doe",
    },
    {
      id: "12348",
      initiator: "Ari",
      agreerer: "Mekky",
      compensation: "Takis",
      terms: "I will give you a bag Takis for a pizza",
      status: "failed",
      notarized: false,
      notary: null,
    },
    {
      id: "12349",
      initiator: "Sam",
      agreerer: "Morgan",
      compensation: "$100",
      terms: "I will develop a simple website for you for $100",
      status: "completed",
      notarized: true,
      notary: "Jane Smith",
    },
  ];


    export default function Page() {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen">
            <PageHeader
            title = "Handshake History"
            subTitle = "All verified handshakes - completed and failed"
            />
                {handshakes.map((handshake) => (
                    <HandshakeCard key={handshake.id} {...handshake} />
                ))}
            </div>
        );
    }