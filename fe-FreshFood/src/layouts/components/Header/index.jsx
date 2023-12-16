function Header({ children }) {
    return (
        <header className="flex min-h-[24px] h-6 select-none items-center justify-center  font-medium text-slate-900">
            {children}
        </header>
    );
}

export default Header;
