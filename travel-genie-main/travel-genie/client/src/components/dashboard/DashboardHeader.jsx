import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronDown,
  BarChart3,
  Plane,
  Ticket,
} from "lucide-react";

import ThemeSwitcher from "../Common/ThemeSwitcher";
import CurrencyAndLangSwitcher from "../Common/CurrencyAndLangSwitcher";
import { useAuth } from "../../context/AuthContext";
import { useLocalization } from "../../context/LocalizationContext";
import { API_BASE_URL } from "../../api/axios";

function DashboardHeader({ openSidebar }) {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();
  const { t, isRtl } = useLocalization();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  const username =
    user?.username ||
    user?.profile?.user?.username ||
    user?.email?.split("@")[0] ||
    "Passenger";

  const email = user?.email || user?.profile?.user?.email || "";
  const initial = (username.charAt(0) || "P").toUpperCase();
  const isAdmin = Boolean(user?.is_staff || user?.is_superuser);

  const profileImage = user?.profile?.profile_image;
  const avatarUrl = profileImage
    ? profileImage.startsWith("http")
      ? profileImage
      : `${API_BASE_URL}${profileImage}`
    : null;

  return (
    <header
      className="
        w-full
        flex
        items-center
        gap-2
        sm:gap-3
        relative
        z-30
      "
    >
      {/* Mobile Menu Toggle */}
      <button
        type="button"
        onClick={openSidebar}
        className="
          lg:hidden
          h-9
          w-9
          sm:h-10
          sm:w-10
          shrink-0
          rounded-xl
          flex
          items-center
          justify-center
          bg-gray-100/90
          dark:bg-white/10
          border
          border-gray-200/90
          dark:border-white/10
          text-gray-800
          dark:text-white
          backdrop-blur-xl
          hover:bg-gray-200
          dark:hover:bg-white/20
          transition-all
          duration-200
          cursor-pointer
        "
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      {/* Book Flight CTA Button (desktop/tablet) */}
      <Link
        to="/dashboard/flights"
        className="
          hidden
          md:flex
          items-center
          gap-2
          rounded-xl
          px-3.5
          py-2
          bg-gradient-to-r
          from-amber-500
          to-[#F58220]
          text-white
          text-xs
          font-bold
          shadow-md
          shadow-[#F58220]/25
          transition-all
          duration-200
          hover:scale-105
          shrink-0
        "
      >
        <Plane size={15} className={`transform ${isRtl ? "rotate-45" : "-rotate-45"}`} />
        <span>{t("nav_flights")}</span>
      </Link>

      {/* Flight Search / Global Query */}
      <div className="flex-1 min-w-[120px] sm:min-w-[180px]">
        <div className="relative w-full">
          <Search
            size={16}
            className="
              absolute
              start-3.5
              top-1/2
              -translate-y-1/2
              text-gray-400
              dark:text-white/50
              z-10
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(`/dashboard/assistant?q=${encodeURIComponent(search.trim())}`);
              }
            }}
            placeholder={t("header_search_placeholder")}
            className="
              w-full
              rounded-xl
              py-2
              ps-9
              pe-3
              sm:py-2.5
              sm:ps-10
              sm:pe-4
              text-xs
              bg-gray-100/80
              dark:bg-white/5
              border
              border-gray-200/80
              dark:border-white/10
              text-gray-900
              dark:text-white
              placeholder:text-gray-400
              dark:placeholder:text-white/40
              outline-none
              transition-all
              duration-200
              focus:ring-2
              focus:ring-[#F58220]/20
              focus:border-[#F58220]
            "
          />
        </div>
      </div>

      {/* Language & Currency */}
      <div className="shrink-0">
        <CurrencyAndLangSwitcher themeVariant="auto" />
      </div>

      {/* Theme */}
      <ThemeSwitcher themeVariant="auto" />

      {/* User Profile Dropdown */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            flex
            items-center
            gap-2
            p-1
            pr-3
            rounded-full
            bg-white/80
            dark:bg-white/10
            border
            border-gray-200
            dark:border-white/10
            backdrop-blur-xl
            hover:border-[#F58220]
            transition-all
            duration-200
            shadow-sm
            cursor-pointer
          "
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={username}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div
              className="
                h-8
                w-8
                rounded-full
                flex
                items-center
                justify-center
                bg-gradient-to-tr
                from-[#F58220]
                to-amber-500
                text-white
                text-xs
                font-bold
                shadow-sm
              "
            >
              {initial}
            </div>
          )}
          <span className="hidden md:block text-xs font-bold text-gray-800 dark:text-white max-w-[100px] truncate">
            {username}
          </span>
          <ChevronDown
            size={14}
            className={`text-gray-500 dark:text-gray-300 transition-transform duration-200 ${
              menuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="
              absolute
              right-0
              rtl:right-auto
              rtl:left-0
              mt-2
              w-60
              rounded-2xl
              bg-white/95
              dark:bg-[#071625]/95
              backdrop-blur-2xl
              border
              border-gray-200
              dark:border-white/10
              shadow-2xl
              p-2
              z-50
              animate-in
              fade-in
              slide-in-from-top-2
              duration-200
            "
          >
            {/* User Info Header */}
            <div className="px-3 py-2 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {username}
                </p>
                {isAdmin && (
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Admin
                  </span>
                )}
              </div>
              {email && (
                <p className="text-[11px] text-gray-400 dark:text-white/60 truncate mt-0.5">
                  {email}
                </p>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                to="/dashboard/flights"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2
                  rounded-xl
                  text-xs
                  font-medium
                  text-gray-700
                  dark:text-white/80
                  hover:bg-amber-500/10
                  hover:text-[#F58220]
                  transition-colors
                "
              >
                <Plane size={15} className="text-[#F58220]" />
                <span>{t("book_a_flight")}</span>
              </Link>

              <Link
                to="/dashboard/my-trip"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2
                  rounded-xl
                  text-xs
                  font-medium
                  text-gray-700
                  dark:text-white/80
                  hover:bg-amber-500/10
                  hover:text-[#F58220]
                  transition-colors
                "
              >
                <Ticket size={15} className="text-[#F58220]" />
                <span>{t("sidebar_my_etickets")}</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/dashboard/kam-air-analytics"
                  onClick={() => setMenuOpen(false)}
                  className="
                    flex
                    items-center
                    gap-2.5
                    px-3
                    py-2
                    rounded-xl
                    text-xs
                    font-semibold
                    text-amber-600
                    dark:text-amber-400
                    hover:bg-amber-500/10
                    transition-colors
                  "
                >
                  <BarChart3 size={15} />
                  <span>{t("sidebar_executive_analytics")}</span>
                </Link>
              )}

              {isAdmin && (
                <a
                  href={`${API_BASE_URL}/admin/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="
                    flex
                    items-center
                    gap-2.5
                    px-3
                    py-2
                    rounded-xl
                    text-xs
                    font-medium
                    text-gray-600
                    dark:text-gray-400
                    hover:bg-gray-100
                    dark:hover:bg-white/10
                    transition-colors
                  "
                >
                  <ShieldCheck size={15} className="text-emerald-500" />
                  <span>{t("sidebar_django_admin")}</span>
                </a>
              )}

              <Link
                to="/dashboard/profile"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2
                  rounded-xl
                  text-xs
                  font-medium
                  text-gray-700
                  dark:text-white/80
                  hover:bg-gray-100
                  dark:hover:bg-white/10
                  transition-colors
                "
              >
                <User size={15} />
                <span>{t("sidebar_passenger_profile")}</span>
              </Link>

              <Link
                to="/dashboard/settings"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2
                  rounded-xl
                  text-xs
                  font-medium
                  text-gray-700
                  dark:text-white/80
                  hover:bg-gray-100
                  dark:hover:bg-white/10
                  transition-colors
                "
              >
                <Settings size={15} />
                <span>{t("sidebar_preferences")}</span>
              </Link>
            </div>

            {/* Logout Divider */}
            <div className="border-t border-gray-100 dark:border-white/10 pt-1">
              <button
                type="button"
                onClick={handleLogout}
                className="
                  w-full
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2
                  rounded-xl
                  text-xs
                  font-semibold
                  text-red-500
                  hover:bg-red-500/10
                  dark:text-red-400
                  dark:hover:bg-red-500/10
                  transition-colors
                  cursor-pointer
                "
              >
                <LogOut size={15} />
                <span>{t("nav_signout")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default DashboardHeader;
