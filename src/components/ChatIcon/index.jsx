export default function ChatIcon({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 right-8 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700"
        >
            💬
        </button>
    );
}
