import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logoValorant.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const scrollToTop = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const scrollToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Agents", id: "agents" },
    { name: "Weapons", id: "weapons" },
    { name: "Maps", id: "maps" },
    { name: "Store", route: "/store" },
  ];

  return (
    <header className="bg-valorant-dark text-white shadow-md sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center p-4">
        {/* Logo & Developer Info */}
        <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
          <img
            src={Logo}
            alt="logo"
            className="w-16 hover:opacity-80 transition-opacity"
          />
          <h3 className="text-white px-4">developed by Wiellona</h3>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item) =>
            item.route ? (
              <RouterLink
                key={item.name}
                to={item.route}
                className="cursor-pointer text-white hover:text-valorant-red font-medium px-8"
              >
                {item.name}
              </RouterLink>
            ) : (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="cursor-pointer text-white hover:text-valorant-red font-medium bg-transparent border-none"
              >
                {item.name}
              </button>
            )
          )}

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-8 py-2 rounded-xl text-white font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <RouterLink
              to="/login"
              className="bg-valorant-red px-8 py-2 rounded-xl text-white font-medium hover:bg-red-700 transition"
            >
              Login
            </RouterLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-valorant-red bg-valorant-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-valorant-dark border-t border-red py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4 text-center">
            {navItems.map((item) =>
              item.route ? (
                <RouterLink
                  key={item.name}
                  to={item.route}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-valorant-red font-medium"
                >
                  {item.name}
                </RouterLink>
              ) : (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-valorant-red font-medium"
                >
                  {item.name}
                </button>
              )
            )}

            {/* Mobile Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="bg-gray-700 text-white py-2 rounded-xl font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <RouterLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-valorant-red text-white py-2 rounded-xl font-medium hover:bg-red-700 transition"
              >
                Login
              </RouterLink>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
