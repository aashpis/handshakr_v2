// import HandshakeRepsonseButtons from 'handshake-response-buttons'
import HandshakeStatusBadge from './handshake-status-badge'



export default function HandshakeCard({ id, initiator, agreerer, compensation, terms, status, notarized }) {
    
    const sanitizedStatus = status.toLowerCase();

    const STATUS_BG_STYLE = {
        "completed": "bg-green-100",
        "failed": "bg-red-100",
        "pending": "bg-amber-100"
    }[sanitizedStatus] || "bg-gray-100";

    return (
        <div className=" mb-10 w-full max-w-md rounded-lg shadow-md">
            {/* Top section with dynamic background */}
            <div className={`px-6 py-2 rounded-t-lg ${STATUS_BG_STYLE}`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Handshake #{id}</h1>
                    <div className="text-right">
                        <HandshakeStatusBadge status = {sanitizedStatus}/>
                        {/* {STATUS_BADGE} */}
                        <p className={`text-sm ${notarized ? "text-neutral-dark" : "text-red-700"}`}>
                            {notarized ? `Notarized by ${notarized}` : "Not notarized"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom section with default background */}
            <div className="px-6 py-2 bg-white rounded-b-lg">
                <div className="flex justify-between">
                    <h2 className="font-medium">
                        <span className="text-neutral font-bold text-sm">Initiated by:</span> {initiator}
                    </h2>
                    <h2 className="font-medium">
                        <span className="text-neutral font-bold text-sm">Agreed by:</span> {agreerer}
                    </h2>
                </div>

                <div className="mt-3 space-y-1">
                    <p><span className="text-neutral font-bold text-sm">Compensation: </span>{compensation}</p>
                    <p><span className="text-neutral font-bold text-sm">Terms: </span>{terms}</p>
                </div>
                <div>
                    {}
                </div>
            </div>
        </div>
    );
}
