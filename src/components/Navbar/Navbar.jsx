import React, { useState, useEffect } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { GiNoodles } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import ResponsiveMenu from "../ResponsiveMenu";
import { useNavigate } from "react-router-dom";
import { fetchMe, logout, fetchAllDishes } from "../../services/api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMe()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    fetchAllDishes()
      .then(setAllDishes)
      .catch((err) => console.error("Проблема з отриманням страв:", err));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setQuery("");
    setResults([]);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const filtered = allDishes.filter((dish) =>
        dish.name.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8">
          {/* Logo */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <GiNoodles />
            <p>
              Tom<span className="text-secondary">Yum</span>
            </p>
          </div>

          {/* Icons + Search */}
          <div className="flex gap-x-2 items-center relative">
            {/* {showSearch ? (
              <div className="relative w-64 sm:w-80">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Пошук страви..."
                  className="border px-3 py-1 rounded-lg text-sm w-full"
                />
                <button
                  className="absolute right-2 top-1 text-xl text-gray-500"
                  onClick={handleSearchToggle}
                >
                  <AiOutlineClose />
                </button>

                {results.length > 0 && (
                  <div className="absolute bg-white shadow-lg mt-2 rounded w-full z-50 max-h-60 overflow-y-auto">
                    {results.map((dish) => (
                      <div
                        key={dish.id}
                        onClick={() => {
                          setShowSearch(false);
                          setQuery("");
                          setResults([]);
                          navigate(`/dish/${dish.id}`);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {dish.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
                onClick={handleSearchToggle}
                title="Пошук"
              >
                <CiSearch />
              </button>
            )} */}

            {user?.is_superuser && (
              <button
                onClick={() => navigate("/admin")}
                className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
                title="Адмін-панель"
              >
                <FaUserShield />
              </button>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
                title="Вийти"
              >
                <BiLogOut />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
                title="Увійти"
              >
                <CiUser />
              </button>
            )}

            <div onClick={() => setOpen(!open)}>
              <MdMenu className="text-4xl" />
            </div>
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
