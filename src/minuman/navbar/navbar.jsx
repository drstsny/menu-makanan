import Logo from "../../assets/Logo.png";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-16 h-16 bg-white p-2 rounded-full border border-gray-300 shadow-sm"
                    />
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                        Selamat Datang
                    </h1>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a
                        href="/login"
                        className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-300"
                    >
                        Admin ?
                    </a>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
