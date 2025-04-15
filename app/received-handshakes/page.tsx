// import HandshakeCard from "@/_ui/handshake-card"
import PageHeader from "@/_ui/page-header"


// const handshakes = [
//     {
//       handshakeName: "NDA Agreement",
//       encryptedDetails: "U2FsdGVkX1+Q92jsF84adU0zA9A=",
//       signedDate: "2025-04-10",
//       completedDate: "2025-04-12",
//       handshakeStatus: "Completed",
//       initiatorUsername: "alice_w",
//       acceptorUsername: "bob_m"
//     },
//     {
//       handshakeName: "Freelance Contract",
//       encryptedDetails: "U2FsdGVkX1+ZaBf78JqvDc9lPx8=",
//       signedDate: "2025-03-22",
//       completedDate: "2025-04-01",
//       handshakeStatus: "Failed",
//       initiatorUsername: "freelancer_john",
//       acceptorUsername: "client_emma"
//     },
//     {
//       handshakeName: "Partnership Terms",
//       encryptedDetails: "U2FsdGVkX1+ds9ak33qlkX3qg5s=",
//       signedDate: "2025-04-01",
//       completedDate: "",
//       handshakeStatus: "Pending",
//       initiatorUsername: "startup_xyz",
//       acceptorUsername: "angel_investor"
//     },
//     {
//       handshakeName: "Loan Agreement",
//       encryptedDetails: "U2FsdGVkX1+0nFSkf82rApl01sQ=",
//       signedDate: "2025-02-10",
//       completedDate: "2025-03-05",
//       handshakeStatus: "Completed",
//       initiatorUsername: "bank_admin",
//       acceptorUsername: "customer_123"
//     },
//     {
//       handshakeName: "Employment Contract",
//       encryptedDetails: "U2FsdGVkX1+lmZ19sa02nLKfdqM=",
//       signedDate: "2025-03-01",
//       completedDate: "2025-03-15",
//       handshakeStatus: "Completed",
//       initiatorUsername: "hr_dpt",
//       acceptorUsername: "new_employee"
//     }
//   ];

export default function Page() {
    return (
        <div>
            {/* price analyzer */}
            <div>
                
            </div>
            {/* recieved handshakes */}
            <div className="flex flex-col items-center justify-top min-h-screen">
                <PageHeader
                    title="Received Handshake"
                    subTitle="Handshakes you have received that need to be accepted or rejected"
                />
                {/* <HandshakeCard {...handshake} /> */}
            </div>
        </div>

    );
}