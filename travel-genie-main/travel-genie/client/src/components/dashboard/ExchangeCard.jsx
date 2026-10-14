import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, ChevronDown, Search, X } from "lucide-react";
import { useTrips } from "../../context/TripContext.jsx";
import { useLocalization } from "../../context/LocalizationContext.jsx";

const FALLBACK_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "AED", name: "UAE Dirham", symbol: "AED" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "so'm" },
  { code: "QAR", name: "Qatari Riyal", symbol: "QR" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD" },
];

const FALLBACK_RATES_FROM_USD = {
  USD: 1,
  AFN: 70.5,
  AED: 3.67,
  EUR: 0.92,
  GBP: 0.79,
  TRY: 32.5,
  SAR: 3.75,
  PKR: 278.5,
  INR: 83.2,
  CNY: 7.23,
  JPY: 155.0,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.91,
  UZS: 12650,
  QAR: 3.64,
  KWD: 0.31,
};

const destinationCurrencies = {
  Afghanistan: "AFN",
  Pakistan: "PKR",
  India: "INR",
  Turkey: "TRY",
  Türkiye: "TRY",
  Dubai: "AED",
  UAE: "AED",
  "United Arab Emirates": "AED",
  China: "CNY",
  Japan: "JPY",
  Germany: "EUR",
  France: "EUR",
  Italy: "EUR",
  Spain: "EUR",
  England: "GBP",
  "United Kingdom": "GBP",
  Canada: "CAD",
  Australia: "AUD",
  USA: "USD",
  "United States": "USD",
  "Saudi Arabia": "SAR",
  Uzbekistan: "UZS",
};

// =====================================================
// CURRENCY PICKER
// =====================================================

function CurrencyPicker({
  value,
  onChange,
  currencies,
  label,
  dark = false,
  align = "start",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pickerRef = useRef(null);
  const searchRef = useRef(null);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === value,
  );

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return currencies;

    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query),
    );
  }, [currencies, search]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      searchRef.current?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [open]);

  const handleSelect = (currencyCode) => {
    onChange(currencyCode);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={pickerRef} className="relative min-w-0 flex-1">
      {/* Selected Currency Button */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`flex w-full min-w-0 items-center justify-between gap-1 text-left rtl:text-right ${
          dark ? "text-white" : "text-gray-800 dark:text-white"
        }`}
        aria-label={label}
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">
          {selectedCurrency
            ? `${selectedCurrency.code} — ${selectedCurrency.name}`
            : value}
        </span>

        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          } ${dark ? "text-white/80" : "text-gray-500 dark:text-white/60"}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={`
            absolute top-full z-[100] mt-2
            w-[280px] max-w-[calc(100vw-2rem)]
            overflow-hidden rounded-2xl border border-gray-200 bg-white
            shadow-2xl backdrop-blur-xl
            dark:border-white/15 dark:bg-[#071625]
            sm:w-[310px]
            ${
              align === "end"
                ? "right-0 rtl:right-auto rtl:left-0"
                : "left-0 rtl:left-auto rtl:right-0"
            }
          `}
        >
          {/* Search */}
          <div className="border-b border-gray-200 p-2.5 dark:border-white/10">
            <div
              className="
                flex h-9 min-w-0 items-center gap-2 rounded-xl
                border border-gray-200 bg-gray-50 px-3
                dark:border-white/10 dark:bg-white/5
              "
            >
              <Search
                size={14}
                className="shrink-0 text-gray-400 dark:text-white/40"
              />

              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search currency..."
                className="
                  min-w-0 flex-1 bg-transparent text-xs
                  text-gray-900 outline-none
                  placeholder:text-gray-400
                  dark:text-white dark:placeholder:text-white/40
                "
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpen(false);
                    setSearch("");
                  }
                }}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    flex h-5 w-5 shrink-0 items-center justify-center
                    rounded-full text-gray-400 transition
                    hover:bg-gray-200 hover:text-gray-700
                    dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white
                  "
                  aria-label="Clear currency search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-[260px] overflow-y-auto p-1.5">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleSelect(currency.code)}
                  className={`
                    flex min-h-[40px] w-full min-w-0 items-center justify-between
                    gap-2.5 rounded-xl px-3 py-2 text-left rtl:text-right transition
                    ${
                      currency.code === value
                        ? "bg-[#F58220]/15 text-[#F58220] font-semibold dark:bg-[#F58220]/25 dark:text-amber-400"
                        : "text-gray-800 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/10"
                    }
                  `}
                >
                  <span className="min-w-0 flex-1 truncate">
                    <span className="text-xs font-bold">{currency.code}</span>
                    <span className="ml-2 rtl:ml-0 rtl:mr-2 text-xs text-gray-500 dark:text-white/50">
                      {currency.name}
                    </span>
                  </span>

                  {currency.code === value && (
                    <span className="shrink-0 text-[10px] font-bold text-[#F58220] dark:text-amber-400">
                      ✓
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-6 text-center">
                <Search
                  size={18}
                  className="mx-auto mb-1.5 text-gray-400 dark:text-white/30"
                />
                <p className="text-xs font-medium text-gray-600 dark:text-white/50">
                  No currencies found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// EXCHANGE CARD
// =====================================================

function ExchangeCard() {
  const { trips, loading } = useTrips();
  const { currency, t } = useLocalization();

  const [amount, setAmount] = useState("100");
  const [currencies, setCurrencies] = useState(FALLBACK_CURRENCIES);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);

  const [fromCurrency, setFromCurrency] = useState(currency || "USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const [rate, setRate] = useState(null);
  const [isEstimatedRate, setIsEstimatedRate] = useState(false);
  const [exchangeLoading, setExchangeLoading] = useState(false);
  const [exchangeError, setExchangeError] = useState("");

  // Sync with global currency if changed
  useEffect(() => {
    if (currency) {
      setFromCurrency(currency);
    }
  }, [currency]);

  // =====================================================
  // GET NEWEST TRIP
  // =====================================================

  const latestTrip = useMemo(() => {
    if (!Array.isArray(trips) || trips.length === 0) return null;
    return [...trips].sort((a, b) => Number(b.id) - Number(a.id))[0];
  }, [trips]);

  // =====================================================
  // LOAD ALL CURRENCIES
  // =====================================================

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        setExchangeError("");
        const response = await fetch(
          "https://api.frankfurter.dev/v2/currencies",
        );

        if (!response.ok) {
          throw new Error("Could not load external currencies.");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const apiCurrencies = data
            .map((curr) => ({
              code: curr.iso_code,
              name: curr.name,
              symbol: curr.symbol || "",
            }))
            .filter((curr) => curr.code && curr.name);

          // Merge with fallback currencies ensuring no duplicates
          const mergedMap = new Map();
          FALLBACK_CURRENCIES.forEach((c) => mergedMap.set(c.code, c));
          apiCurrencies.forEach((c) => mergedMap.set(c.code, c));

          const allCurrencies = Array.from(mergedMap.values()).sort((a, b) =>
            a.code.localeCompare(b.code),
          );

          setCurrencies(allCurrencies);
        }
      } catch (error) {
        // Fallback already pre-set to FALLBACK_CURRENCIES, so it remains gracefully functional
        console.warn("Using fallback currency list:", error.message);
      }
    };

    loadCurrencies();
  }, []);

  // =====================================================
  // AUTOMATICALLY SELECT DESTINATION CURRENCY
  // =====================================================

  useEffect(() => {
    const destination = latestTrip?.destination?.trim();
    if (!destination) return;

    if (destinationCurrencies[destination]) {
      setToCurrency(destinationCurrencies[destination]);
      return;
    }

    const foundCountry = Object.keys(destinationCurrencies).find((country) =>
      destination.toLowerCase().includes(country.toLowerCase()),
    );

    if (foundCountry) {
      setToCurrency(destinationCurrencies[foundCountry]);
    }
  }, [latestTrip?.destination]);

  // =====================================================
  // GET LIVE OR ESTIMATED EXCHANGE RATE
  // =====================================================

  useEffect(() => {
    const getExchangeRate = async () => {
      if (!fromCurrency || !toCurrency) return;

      if (fromCurrency === toCurrency) {
        setRate(1);
        setIsEstimatedRate(false);
        setExchangeError("");
        setExchangeLoading(false);
        return;
      }

      setExchangeLoading(true);
      setExchangeError("");

      // Try live API first
      let liveSuccess = false;
      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`,
        );

        if (response.ok) {
          const data = await response.json();
          if (typeof data.rate === "number") {
            setRate(data.rate);
            setIsEstimatedRate(false);
            liveSuccess = true;
          }
        }
      } catch {
        // Continue to fallback
      }

      if (!liveSuccess) {
        // Calculate via known exchange rates
        const fromRate = FALLBACK_RATES_FROM_USD[fromCurrency];
        const toRate = FALLBACK_RATES_FROM_USD[toCurrency];

        if (fromRate && toRate) {
          const computedRate = toRate / fromRate;
          setRate(computedRate);
          setIsEstimatedRate(true);
        } else {
          setRate(null);
          setExchangeError(t("exchange_error", "Live exchange rate unavailable."));
        }
      }

      setExchangeLoading(false);
    };

    getExchangeRate();
  }, [fromCurrency, toCurrency, t]);

  // =====================================================
  // CALCULATE CONVERSION
  // =====================================================

  const convertedAmount =
    rate !== null && amount !== "" && !Number.isNaN(Number(amount))
      ? Number(amount) * Number(rate)
      : null;

  // =====================================================
  // SWAP CURRENCIES
  // =====================================================

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatAmount = (value) => {
    if (value === null || value === undefined) return "—";
    return Number(value).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading || currenciesLoading) {
    return (
      <section
        className="
          h-full min-h-[220px] rounded-[24px]
          border border-gray-200/70 bg-white/80 p-5
          shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl
          dark:border-white/10 dark:bg-white/5
        "
      >
        <p className="text-xs text-gray-600 dark:text-white/60">
          {t("loading", "Loading currency information...")}
        </p>
      </section>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="
        relative h-full min-h-[220px] overflow-visible
        rounded-[24px] border border-gray-200/70
        bg-white/85 px-4 py-3.5
        shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl
        dark:border-white/10 dark:bg-white/5
        transition-colors
      "
    >
      {/* Header */}
      <div className="min-w-0">
        <h2 className="truncate text-sm font-bold text-gray-900 dark:text-white">
          {t("currency_exchange", "Currency Exchange")}
        </h2>

        <p className="mt-0.5 truncate text-[11px] text-gray-500 dark:text-white/60">
          {t("live_currency_conversion", "Live currency conversion")}
        </p>
      </div>

      {/* Conversion Grid */}
      <div className="mt-3.5 flex min-w-0 items-stretch gap-2">
        {/* FROM (Kam Air Brand Gradient) */}
        <div
          className="
            min-w-0 flex-[1_1_0%]
            rounded-2xl
            bg-gradient-to-br from-amber-500 to-[#F58220]
            px-3 py-2.5 text-white
            shadow-md shadow-[#F58220]/20
          "
        >
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="
              w-full min-w-0 bg-transparent
              text-base font-bold text-white outline-none
              placeholder:text-white/70
            "
            aria-label="Amount to convert"
          />

          <div className="mt-2 flex min-w-0 items-center border-t border-white/25 pt-1.5">
            <CurrencyPicker
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={currencies}
              label="From currency"
              dark
              align="start"
            />
          </div>
        </div>

        {/* SWAP BUTTON */}
        <button
          type="button"
          onClick={handleSwap}
          className="
            flex h-8 w-8 shrink-0 self-center
            items-center justify-center rounded-full
            border border-gray-200 bg-white
            shadow-sm transition
            hover:scale-105 hover:bg-[#F58220] hover:text-white hover:border-[#F58220]
            active:scale-95
            text-[#F58220]
            dark:border-white/15 dark:bg-white/10 dark:text-amber-400
            cursor-pointer
          "
          aria-label="Swap currencies"
          title="Swap currencies"
        >
          <ArrowLeftRight size={14} />
        </button>

        {/* TO */}
        <div
          className="
            min-w-0 flex-[1_1_0%]
            rounded-2xl border border-gray-200/80
            bg-gray-50/90 px-3 py-2.5
            dark:border-white/10 dark:bg-white/5
          "
        >
          <div
            className="
              min-w-0 truncate text-base font-bold
              text-gray-900 dark:text-white
            "
          >
            {exchangeLoading ? "..." : formatAmount(convertedAmount)}
          </div>

          <div
            className="
              mt-2 flex min-w-0 items-center
              border-t border-gray-200 pt-1.5
              dark:border-white/10
            "
          >
            <CurrencyPicker
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
              label="To currency"
              align="end"
            />
          </div>
        </div>
      </div>

      {/* EXCHANGE RATE NOTICE */}
      {rate !== null && !exchangeLoading && (
        <p className="mt-3 min-w-0 truncate text-[11px] font-medium text-gray-600 dark:text-white/70">
          1 {fromCurrency} ={" "}
          {Number(rate).toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}{" "}
          {toCurrency}
          <span className="ml-1.5 font-bold text-[#F58220] dark:text-amber-400">
            • {isEstimatedRate ? t("market_rate", "Market rate") : t("live_rate", "Live rate")}
          </span>
        </p>
      )}

      {/* ERROR */}
      {exchangeError && (
        <p className="mt-3 min-w-0 truncate text-[11px] font-medium text-red-600 dark:text-red-400">
          {exchangeError}
        </p>
      )}

      {/* NO TRIP / INFO */}
      {!latestTrip && !exchangeError && (
        <p className="mt-3 min-w-0 truncate text-[11px] text-gray-500 dark:text-white/50">
          {t("convert_hint", "Select any currencies you want to convert.")}
        </p>
      )}
    </section>
  );
}

export default ExchangeCard;
