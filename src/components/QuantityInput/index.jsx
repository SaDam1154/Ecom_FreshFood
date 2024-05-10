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
        <div className="flex items-center rounded-md bg-gray-100 p-1">
            <button
                className="flex h-8 w-8 items-center justify-center rounded bg-white text-primary-600"
                onClick={() => handleSetValue(value - 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            </button>
            <input
                className="h-8 w-16 bg-transparent text-center text-gray-600"
                onChange={(e) => handleSetValue(e.target.value)}
                value={value}
            />
            <button
                className="flex h-8 w-8 items-center justify-center rounded bg-white text-primary-600"
                onClick={() => handleSetValue(value + 1)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    );
}
