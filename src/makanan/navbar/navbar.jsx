import Logo from "../../assets/Logo.png";

const Navbar = () => {
    return (
        <nav className="bg-gray-400 ">
            {/* Container for Navbar */}
            <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto justify-between p-4">
                {/* Logo Section */}
                <div className="flex md:ml-96">
                    <img src={Logo} alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 " />
                </div>
                {/* Header Section */}
                <div className="md:mr-96 hidden md:flex ">
                    <h1 className="pt-1 text-lg sm:text-xl md:text-3xl font-bold ">
                        Selamat Datang
                    </h1>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
