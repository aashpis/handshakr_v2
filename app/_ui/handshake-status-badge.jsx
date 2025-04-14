export default function HandshakeStatusBadge({ status }) {
    const sanitiizedStatus = status.toLowerCase(); // Normalize input
   
    const STATUS_BADGE = {
      completed: (
        <span className="bg-hs-completed text-xs text-white text-center py-1 px-3 rounded-full uppercase">
          Completed
        </span>
      ),
      failed: (
        <span className="bg-hs-failed text-xs text-white text-center py-1 px-3 rounded-full uppercase">
          Failed
        </span>
      ),
      pending: (
        <span className="bg-hs-pending text-xs text-white text-center py-1 px-3 rounded-full uppercase">
          Pending
        </span>
      ),
    }[sanitiizedStatus] ?? (
      <span className="bg-neutral text-xs text-white text-center py-1 px-3 -full uppercase">
        Status Unknown
      </span>
    );
   
    return <div>{STATUS_BADGE}</div>;
}