function Home() {
    return (
        <div className="container flex h-full w-full items-center justify-center space-x-11">
            <div className=" space-y-3 text-gray-600">
                <p className="text-center text-4xl font-extrabold text-green-600">QUẢN LÝ CỬA HÀNG</p>
                <p className="text-center text-3xl w-full font-bold text-green-600">THỰC PHẨM SẠCH</p>
                <p className="text-xl font-bold">Nếu cần hỗ trợ kỹ thuật, vui lòng thực hiện một trong ba cách sau: </p>
                <p className="text-lg ">
                    1. Truy cập{' '}
                    <a href="https://forum.uit.edu.vn/" className="underline hover:text-blue-600">
                        https://forum.uit.edu.vn/
                    </a>{' '}
                    và gửi yêu cầu hỗ trợ.
                </p>
                <p className="text-lg">
                    2. Gửi email cho phòng kỹ thuật: <span className="underline">20521154@gm.uit.edu.vn</span>
                    {'.'}
                </p>
                <p className="text-lg ">
                    3. Gọi HOTLINE hỗ trợ khách hàng: <span className="underline">0365011369</span>
                    {', '}
                    <span className="underline">0523011333</span>
                    {'.'}
                </p>
                <button>
                    <span className="pr-1">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </span>
                    <span>Đăng xuất</span>
                </button>
            </div>
            <img
                className="w-[40vw] "
                src="https://png.pngtree.com/png-vector/20220518/ourlarge/pngtree-vegan-icon-png-image_4697174.png
"
            />
        </div>
    );
}

export default Home;
