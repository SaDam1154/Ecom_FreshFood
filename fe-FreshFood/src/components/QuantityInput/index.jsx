export default function QuantityInput({ value, setValue, min, max }) {
    function handleSetValue(v) {
        let _v = v;
        if (_v > max) {
            _v = max;
        }
        if (_v < min) {
            _v = min;
        }
        setValue(_v);
    }

    return (
        <div className="flex items-center p-1 rounded-md bg-gray-100">
            <button
                className="w-8 h-8 rounded bg-white flex items-center justify-center text-primary-600"
                onClick={() => handleSetValue(value - 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            </button>
            <input
                className="w-16 text-center bg-transparent h-8 text-gray-600"
                onChange={(e) => handleSetValue(e.target.value)}
                value={value}
            />
            <button
                className="w-8 h-8 rounded bg-white flex items-center justify-center text-primary-600"
                onClick={() => handleSetValue(value + 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    );
}
