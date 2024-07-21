import { useTranslation } from 'react-i18next';
import StaggeredDropDown from './StaggeredDropDown.jsx';
import { Dropdown } from 'flowbite-react';
function Sidebar() {
    const { t } = useTranslation();
    return (
        <div className=" flex h-20 w-full items-center justify-between py-3">
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

                <span>{t('homepage.discount')}</span>
            </button>
        </div>
    );
}

export default Sidebar;
