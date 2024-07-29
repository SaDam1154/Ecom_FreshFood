import { useTranslation } from 'react-i18next';
import StaggeredDropDown from './StaggeredDropDown.jsx';
import { Dropdown } from 'flowbite-react';
function Sidebar() {
    const { t } = useTranslation();
    return <div className=" flex h-4 w-full items-center justify-between py-3"></div>;
}

export default Sidebar;
