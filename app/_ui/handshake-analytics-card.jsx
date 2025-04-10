export default function HandshakeAnalyticsCard({ count, status }) {
  const sanitizedStatus = status.toLowerCase();
  // Define background styles based on the status
  const STATUS_BG_STYLE = {
    completed: "bg-hs-completed/50",
    failed: "bg-hs-failed/50",
    pending: "bg-hs-pending/50",
  }[sanitizedStatus] || "bg-neutral"; // Default to gray if no match
 
  return (
    <div className="flex flex-row rounded-lg shadow-md">
      <div className={`${STATUS_BG_STYLE} flex-1 flex items-center justify-center`}>
        <div className="text-lg font-bold p-2">
          <p className="capitalize">{status}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 text-2xl font-semibold flex items-center justify-center w-[120px]">
        <p>{count}</p>
      </div>
    </div>
  );
}