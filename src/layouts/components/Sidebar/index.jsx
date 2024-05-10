import StaggeredDropDown from './StaggeredDropDown.jsx';
import { Dropdown } from 'flowbite-react';
function Sidebar() {
    return (
        <div className="flex h-20 w-full items-center justify-between py-3">
            {/* <button className="flex justify-center items-center gap-3 bg-green-500 rounded-lg p-3 text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                <span>Category</span>
            </button>
            <div className="flex gap-5 justify-center items-center ">
                <Dropdown label="Loại thực phẩm" inline>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Dropdown label="Loại thực phẩm" inline>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
            </div> */}

            <button className="flex items-center justify-center gap-3 rounded-lg bg-green-300 p-3 text-green-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                </svg>

                <span>Chương trình khuyến mãi</span>
            </button>
        </div>
    );
}

export default Sidebar;
