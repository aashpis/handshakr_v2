export default function HandshakeStatusBadge({ status }) {
    const normalizedStatus = status.toLowerCase(); // Normalize input
   
    const STATUS_BADGE = {
      completed: (
        <span className="bg-green-700 text-xs text-white text-center py-1 px-3 rounded uppercase">
          Completed
        </span>
      ),
      failed: (
        <span className="bg-red-700 text-xs text-white text-center py-1 px-3 rounded uppercase">
          Failed
        </span>
      ),
      pending: (
        <span className="bg-amber-500 text-xs text-white text-center py-1 px-3 rounded uppercase">
          Pending
        </span>
      ),
    }[normalizedStatus] ?? (
      <span className="bg-neutral-700 text-xs text-white text-center py-1 px-3 rounded uppercase">
        Status Unknown
      </span>
    );
   
    return <div>{STATUS_BADGE}</div>;
}