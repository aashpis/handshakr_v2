import HandshakeStatusBadge from './handshake-status-badge'

export default function HandshakeCard({
  handshakeName,
  encryptedDetails,
  signedDate,
  completedDate,
  handshakeStatus,
  initiatorUsername,
  acceptorUsername
}) {
  const sanitizedStatus = handshakeStatus.toLowerCase();

  const STATUS_BG_STYLE = {
    completed: "bg-hs-completed/50",
    failed: "bg-hs-failed/50",
    pending: "bg-hs-pending/75",
  }[sanitizedStatus] || "bg-neutral-light";

  return (
    <div className="mb-10 w-full max-w-md rounded-lg shadow-md">
      {/* Header */}
      <div className={`px-6 py-2 rounded-t-lg ${STATUS_BG_STYLE}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-white font-semibold">
            {handshakeName}
          </h1>
          <HandshakeStatusBadge status={sanitizedStatus} />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 bg-white rounded-b-lg space-y-2">
        {/* Dates */}
        <div className="flex justify-between">
          <h2 className="font-medium">
            <span className="text-neutral font-bold">
              signedDate:
            </span>{" "}
            {signedDate}
          </h2>
          <h2 className="font-medium">
            <span className="text-neutral font-bold">
              completedDate
            </span>{" "}
            {completedDate}
          </h2>
        </div>

        <div className="px-6 py-5 bg-white rounded-b-lg space-y-2">
          {/* Parties */}
          <div className="flex justify-between">
            <h2 className="font-medium">
              <span className="text-neutral font-bold">
                Initiated by:
              </span>{" "}
              {initiatorUsername}
            </h2>
            <h2 className="font-medium">
              <span className="text-neutral font-bold">
                For:
              </span>{" "}
              {acceptorUsername}
            </h2>
          </div>

          {/* Terms */}
          <div className="space-y-1 pt-2">
            <h2>
              <span className="text-neutral font-bold">
                Details (Encrypted):{" "}
              </span>
              {encryptedDetails}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
