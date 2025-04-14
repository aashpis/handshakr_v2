// import HandshakeRepsonseButtons from 'handshake-response-buttons'
import HandshakeStatusBadge from './handshake-status-badge'
import NotarizedBadge from './handshake-notarized-badge'



export default function HandshakeCard({
  id,
  initiator,
  agreerer,
  compensation,
  terms,
  status,
  notary,
  notarized,
}) {
  const sanitizedStatus = status.toLowerCase();

  const STATUS_BG_STYLE = {
    completed: "bg-hs-completed/50",
    failed: "bg-hs-failed/50",
    pending: "bg-hs-pending/65",
  }[sanitizedStatus] || "bg-neutral-light";

  return (
    <div className="mb-10 w-full max-w-md rounded-lg shadow-md">
      {/* Header */}
      <div className={`px-6 py-2 rounded-t-lg ${STATUS_BG_STYLE}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-white font-semibold">
            Handshake #{id}
          </h1>
          <HandshakeStatusBadge status={sanitizedStatus} />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 bg-white rounded-b-lg space-y-2">
        {/* Parties */}
        <div className="flex justify-between">
          <h2 className="font-medium">
            <span className="text-neutral font-bold">
              Initiated by:
            </span>{" "}
            {initiator}
          </h2>
          <h2 className="font-medium">
            <span className="text-neutral font-bold">
              Agreed by:
            </span>{" "}
            {agreerer}
          </h2>
        </div>

        {/* Notarization */}
        {sanitizedStatus === "completed" && (
          <div className="">
            <NotarizedBadge notary={notary} />
          </div>
        )}

        {/* Terms */}
        <div className="space-y-1 pt-2">
          <p>
            <span className="text-neutral font-bold">
              Compensation:{" "}
            </span>
            {compensation}
          </p>
          <p>
            <span className="text-neutral font-bold">Terms: </span>
            {terms}
          </p>
        </div>
      </div>
    </div>
  );
}
