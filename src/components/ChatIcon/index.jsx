export default function ChatIcon({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700"
        >
            💬
        </button>
    );
}
