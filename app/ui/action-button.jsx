export default function ActionButton(clickHandler, label) {
    return (
        <button
            onClick={clickHandler}
            className="bg-primary hover:bg-primary-dark text-neutral font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            {label}
        </button>
    );
}