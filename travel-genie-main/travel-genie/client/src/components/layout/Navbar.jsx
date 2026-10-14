import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Plane,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import CurrencyAndLangSwitcher from "../Common/CurrencyAndLangSwitcher";
import { useAuth } from "../../context/AuthContext";
import { useLocalization } from "../../context/LocalizationContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const { t, isRtl } = useLocalization();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: t("nav_flights"), path: "/flights" },
    { name: t("nav_status"), path: "/flight-status" },
    { name: t("nav_assistant"), path: "/assistant", highlight: true },
    { name: t("nav_trips"), path: "/my-trip" },
    { name: t("nav_destinations"), path: "/destinations" },
    { name: t("nav_travel_info"), path: "/travel-info" },
    { name: t("nav_support"), path: "/support" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1F3A]/98 text-white shadow-2xl backdrop-blur-xl border-b border-white/10"
          : "bg-[#0B1F3A] text-white border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* ================= BRAND LOGO ================= */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 sm:gap-3 shrink-0 group py-1 min-w-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#F58220] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-[#F58220]/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Plane size={20} className={`transform ${isRtl ? "rotate-45" : "-rotate-45"}`} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                KAM<span className="text-[#F58220]">AIR</span>
              </span>
            </div>
            <span className="hidden sm:block text-[10px] font-bold tracking-widest text-amber-400 uppercase mt-0.5 truncate">
              {t("brand_sub")}
            </span>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 text-xs xl:text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2.5 transition duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  active
                    ? "text-[#F58220] font-bold"
                    : link.highlight
                    ? "text-amber-400 hover:text-amber-300 font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.highlight && <Sparkles size={14} className="text-amber-400" />}
                <span>{link.name}</span>
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F58220] rounded-full shadow-[0_0_8px_#F58220]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Staff Analytics Link (If staff/admin) */}
          {(user?.is_staff || user?.is_superuser) && (
            <Link
              to="/dashboard/kam-air-analytics"
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 hover:bg-amber-500/25 transition"
            >
              <ShieldCheck size={13} />
              <span>{t("nav_staff_portal")}</span>
            </Link>
          )}
        </div>

        {/* ================= DESKTOP UTILITIES & USER ================= */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
          <CurrencyAndLangSwitcher themeVariant="dark" />
          <ThemeSwitcher themeVariant="dark" />

          {user ? (
            <div className="flex items-center gap-2 pl-2 rtl:pl-0 rtl:pr-2 border-l rtl:border-l-0 rtl:border-r border-white/10">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] hover:brightness-110 text-white font-bold text-xs shadow-md shadow-[#F58220]/25 transition duration-200"
              >
                <LayoutDashboard size={15} />
                <span>{t("nav_portal")}</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl border border-white/15 text-gray-300 hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/10 transition duration-200 cursor-pointer"
                title={t("nav_signout")}
                aria-label={t("nav_signout")}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 rtl:pl-0 rtl:pr-2 border-l rtl:border-l-0 rtl:border-r border-white/10">
              <Link
                to="/login"
                className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition duration-200"
              >
                {t("nav_signin")}
              </Link>

              <Link
                to="/signup"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] hover:brightness-110 text-white text-xs font-bold shadow-md shadow-[#F58220]/25 transition duration-200"
              >
                {t("nav_register")}
              </Link>
            </div>
          )}
        </div>

        {/* ================= MOBILE TOGGLE & COMPACT UTILS ================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <CurrencyAndLangSwitcher themeVariant="dark" />
          </div>

          <ThemeSwitcher themeVariant="dark" />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:text-[#F58220] transition duration-200 cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#071625] border-t border-white/10 px-4 sm:px-6 py-5 space-y-4 shadow-2xl relative z-50"
          >
            {/* Quick Currency & Language Selector for Phone View */}
            <div className="sm:hidden pb-3 border-b border-white/10 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t("nav_settings")}</span>
              <CurrencyAndLangSwitcher themeVariant="dark" />
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition ${
                      active
                        ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                        : link.highlight
                        ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.highlight && <Sparkles size={16} className="text-amber-400" />}
                  </Link>
                );
              })}
            </div>

            {/* User Auth Controls on Mobile */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] text-white font-bold text-sm shadow-md shadow-[#F58220]/25"
                  >
                    <LayoutDashboard size={18} />
                    <span>{t("nav_portal")}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-red-400/30 text-red-400 font-bold text-sm hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <LogOut size={18} />
                    <span>{t("nav_signout")}</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center p-3 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition"
                  >
                    {t("nav_signin")}
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] text-white font-bold text-sm shadow-md"
                  >
                    {t("nav_register")}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
