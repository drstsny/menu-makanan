import Logo from "../../assets/Logo.png";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
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
