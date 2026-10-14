import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocalization, CURRENCIES, LANGUAGES } from "../../context/LocalizationContext";

export default function CurrencyAndLangSwitcher({ compact = false, themeVariant = "auto" }) {
  const { currency, setCurrency, language, setLanguage, t } = useLocalization();
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);

  const langRef = useRef(null);
  const currRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (currRef.current && !currRef.current.contains(e.target)) {
        setCurrOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonStyle =
    themeVariant === "dark"
      ? "bg-white/10 border-white/15 text-white hover:border-[#F58220]"
      : "bg-gray-100/90 hover:bg-gray-200/80 border-gray-200/90 text-gray-800 dark:bg-white/10 dark:hover:bg-white/15 dark:border-white/15 dark:text-white hover:border-[#F58220] dark:hover:border-[#F58220]";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
      {/* Currency Switcher */}
      <div className="relative shrink-0" ref={currRef}>
        <button
          type="button"
          onClick={() => {
            setCurrOpen(!currOpen);
            setLangOpen(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition duration-200 cursor-pointer shadow-sm ${buttonStyle}`}
          title={t("select_currency")}
          aria-label={t("select_currency")}
          aria-expanded={currOpen}
        >
          <span className="text-[#F58220] font-black">
            {CURRENCIES[currency]?.symbol || "$"}
          </span>
          <span className="font-bold">{currency}</span>
          <ChevronDown
            size={12}
            className={`opacity-70 transition-transform duration-200 ${currOpen ? "rotate-180" : ""}`}
          />
        </button>

        {currOpen && (
          <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-36 max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {Object.values(CURRENCIES).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setCurrOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  currency === c.code
                    ? "bg-[#F58220] text-white font-bold shadow-sm"
                    : "text-gray-700 dark:text-gray-200 hover:bg-[#F58220]/10 hover:text-[#F58220] dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <span className="font-semibold">{c.code}</span>
                <span className="opacity-80 font-bold">{c.symbol}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Language Switcher */}
      <div className="relative shrink-0" ref={langRef}>
        <button
          type="button"
          onClick={() => {
            setLangOpen(!langOpen);
            setCurrOpen(false);
          }}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition duration-200 cursor-pointer shadow-sm ${buttonStyle}`}
          title={t("select_language")}
          aria-label={t("select_language")}
          aria-expanded={langOpen}
        >
          <Globe size={13} className="text-[#F58220] shrink-0" />
          <span className="font-bold">{LANGUAGES[language]?.nativeName || "EN"}</span>
          <ChevronDown
            size={12}
            className={`opacity-70 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
          />
        </button>

        {langOpen && (
          <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 max-w-[calc(100vw-2rem)] rounded-2xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {Object.values(LANGUAGES).map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setLangOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  language === l.code
                    ? "bg-[#F58220] text-white font-bold shadow-sm"
                    : "text-gray-700 dark:text-gray-200 hover:bg-[#F58220]/10 hover:text-[#F58220] dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <span className="font-semibold">{l.nativeName}</span>
                <span className="text-[10px] opacity-70">({l.code.toUpperCase()})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
