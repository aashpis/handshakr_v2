export default function HandshakeStatusBadge({ status }) {
  const sanitizedStatus = status.toLowerCase(); // Normalize with fallback

  const STATUS_BADGE = {
    completed: (
      <span className="bg-hs-completed text-xs text-white text-center py-1 px-3 rounded-full uppercase">
        Completed
      </span>
    ),
    created: (
      <span className="bg-primary text-xs text-white text-center py-1 px-3 rounded-full uppercase">
        Created
      </span>
    ),
    accepted: (
      <span className="bg-primary-dark text-xs text-white text-center py-1 px-3 rounded-full uppercase">
        Accepted
      </span>
    ),
    failed: (
      <span className="bg-hs-failed text-xs text-white text-center py-1 px-3 rounded-full uppercase">
        Failed
      </span>
    ),
    canceled: (
      <span className="bg-hs-failed text-xs text-white text-center py-1 px-3 rounded-full uppercase">
        Canceled
      </span>
    ),
    pending: (
      <span className="bg-hs-pending text-xs text-white text-center py-1 px-3 rounded-full uppercase">
        Pending
      </span>
    ),
  }[sanitizedStatus] ?? (
    <span className="bg-neutral text-xs text-white text-center py-1 px-3 rounded-full uppercase">
      {sanitizedStatus}
    </span>
  );

  return <div>{STATUS_BADGE}</div>;
}
