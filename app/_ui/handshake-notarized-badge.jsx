export default function NotarizedBadge({ notary }) {
    return (
        <p className={`font-bold  ${notary ? "text-neutral-dark" : "text-warning"}`}>
            {notary ? `Notarized by: ${notary}` : "Not notarized"}
        </p>
    );
}