import { createContext, useContext, useEffect, useState } from "react";

export const CURRENCIES = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateFromUSD: 1 },
  AFN: { code: "AFN", symbol: "؋", name: "Afghan Afghani", rateFromUSD: 70.5 },
  AED: { code: "AED", symbol: "AED", name: "UAE Dirham", rateFromUSD: 3.67 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateFromUSD: 0.92 },
};

export const LANGUAGES = {
  en: { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  fa: { code: "fa", name: "Dari", nativeName: "دری", dir: "rtl" },
  ps: { code: "ps", name: "Pashto", nativeName: "پښتو", dir: "rtl" },
};

const TRANSLATIONS = {
  en: {
    brand_sub: "TravelGenie × Kam Air",
    concept_badge: "Concept Prototype",
    flight_search: "Flight Search",
    flight_directory: "Kam Air Flights",
    departure: "Departure",
    destination: "Destination",
    origin: "Origin",
    departure_date: "Departure Date",
    return_date: "Return Date",
    passengers: "Passengers",
    passenger: "Passenger",
    passenger_1: "1 Passenger",
    passenger_2: "2 Passengers",
    passenger_3: "3 Passengers",
    passenger_4: "4+ Passengers",
    adults: "Adults",
    cabin_class: "Cabin Class",
    economy: "Economy Class",
    business: "Business Class",
    round_trip: "Round Trip",
    one_way: "One-Way",
    search_flights: "Search Flights",
    search_kam_air_flights: "Search Kam Air Flights",
    no_flights_found: "No scheduled Kam Air flights found for this selection.",
    book_now: "Book Flight",
    book_a_flight: "Book a Flight",
    plan_with_ai: "Plan Trip with AI",
    from_price: "From",
    baggage_included: "Checked Baggage",
    cabin_baggage: "Cabin Bag",
    duration: "Duration",
    direct: "Direct",
    demo_notice: "Demo Data — Concept Prototype for portfolio demonstration.",
    visa_info: "Travel & Visa Information",
    my_trips: "My Trips",
    step_select: "1. Select Flight",
    step_passenger: "2. Passenger Details",
    step_addons: "3. Baggage & Extras",
    step_confirm: "4. Confirmation",
    passenger_name: "Full Name (as in Passport)",
    passport_num: "Passport Number",
    passport_expiry: "Passport Expiry Date",
    nationality: "Nationality",
    email: "Email Address",
    phone: "WhatsApp / Phone",
    confirm_booking: "Confirm Reservation",
    booking_success: "Reservation Generated Successfully!",
    pnr_code: "Booking Reference (PNR)",
    save_to_trips: "Save to My Trips",
    download_ticket: "Download PDF Itinerary",
    admin_analytics: "Kam Air Analytics",
    nav_flights: "Book Flights",
    nav_status: "Flight Status",
    nav_assistant: "AI Assistant",
    nav_trips: "My Trips",
    nav_destinations: "Destinations",
    nav_travel_info: "Travel Info",
    nav_support: "Support",
    nav_portal: "Passenger Portal",
    nav_staff_portal: "Staff Portal",
    nav_signin: "Sign In",
    nav_register: "Register",
    nav_signout: "Sign Out",
    nav_settings: "Settings",
    sidebar_dashboard: "Dashboard",
    sidebar_book_flights: "Book Flights",
    sidebar_flight_status: "Flight Status",
    sidebar_ai_concierge: "AI Concierge",
    sidebar_my_etickets: "My E-Tickets",
    sidebar_trip_plans: "Trip Plans",
    sidebar_budget: "Budget",
    sidebar_memories: "Memories",
    sidebar_executive_analytics: "Executive Analytics",
    sidebar_django_admin: "Django Admin",
    sidebar_passenger_profile: "Passenger Profile",
    sidebar_preferences: "Preferences",
    header_search_placeholder: "Search flights, destinations, visas...",
    currency_exchange: "Currency Exchange",
    live_currency_conversion: "Live currency conversion",
    amount_to_convert: "Amount to convert",
    from_currency: "From currency",
    to_currency: "To currency",
    swap_currencies: "Swap currencies",
    live_rate: "Live rate",
    search_currency: "Search currency...",
    no_currencies_found: "No currencies found",
    try_another_currency: "Try another name or currency code.",
    selected: "Selected",
    loading_currency: "Loading currency information...",
    exchange_rate_unavailable: "Live exchange rate unavailable.",
    select_currencies_hint: "Select any currencies you want to convert.",
    travel_calendar: "Travel Calendar",
    upcoming_tours: "Upcoming Tours",
    your_journey: "Your Journey",
    weather: "Weather",
    destination_forecast: "Destination forecast",
    hero_badge: "Official Digital Passenger Platform",
    hero_title_1: "Your Journey Starts with",
    hero_subtitle: "Search flights, manage your journey, check flight information, and get personalized travel assistance in one place.",
    check_live_status: "Check Live Status",
    flight_number_placeholder: "e.g. RQ-901 (Dubai) or RQ-101 (Istanbul)",
    ai_query_placeholder: "Ask anything: baggage allowance, Dubai visa rules, Zamzam water, flight times...",
    ask_assistant: "Ask Assistant",
    popular_routes: "Popular Kam Air Routes",
  },
  fa: {
    brand_sub: "تراول جینی × کام ایر",
    concept_badge: "طرح اولیه آزمایشی",
    flight_search: "جستجوی پرواز",
    flight_directory: "پروازهای کام ایر",
    departure: "مبدا حرکت",
    destination: "مقصد",
    origin: "مبدا",
    departure_date: "تاریخ رفت",
    return_date: "تاریخ برگشت",
    passengers: "مسافران",
    passenger: "مسافر",
    passenger_1: "۱ مسافر",
    passenger_2: "۲ مسافر",
    passenger_3: "۳ مسافر",
    passenger_4: "۴+ مسافر",
    adults: "بزرگسال",
    cabin_class: "کلاس پرواز",
    economy: "اکونومی",
    business: "بیزنس کلاس",
    round_trip: "رفت و برگشت",
    one_way: "یک طرفه",
    search_flights: "جستجوی پروازها",
    search_kam_air_flights: "جستجوی پروازهای کام ایر",
    no_flights_found: "برای مسیر انتخاب شده پروازی یافت نشد.",
    book_now: "رزرو پرواز",
    book_a_flight: "رزرو پرواز",
    plan_with_ai: "برنامه‌ریزی هوشمند با هوش مصنوعی",
    from_price: "شروع از",
    baggage_included: "بار مجاز",
    cabin_baggage: "بار دستی کابین",
    duration: "مدت پرواز",
    direct: "مستقیم",
    demo_notice: "اطلاعات آزمایشی — نمونه اولیه برای ارزیابی طرح.",
    visa_info: "شرایط ویزا و سفر",
    my_trips: "سفرهای من",
    step_select: "۱. انتخاب پرواز",
    step_passenger: "۲. مشخصات مسافر",
    step_addons: "۳. بار و خدمات اضافی",
    step_confirm: "۴. تایید نهایی",
    passenger_name: "نام کامل (مطابق پاسپورت)",
    passport_num: "شماره پاسپورت",
    passport_expiry: "تاریخ انقضای پاسپورت",
    nationality: "تابعیت",
    email: "ایمیل",
    phone: "واتساپ / شماره تماس",
    confirm_booking: "تایید رزرو",
    booking_success: "رزرو آزمایشی با موفقیت صادر شد!",
    pnr_code: "کد پیگیری رزرو (PNR)",
    save_to_trips: "ذخیره در سفرهای من",
    download_ticket: "دانلود تکت پی‌دی‌اف",
    admin_analytics: "آمار و ارقام کام ایر",
    nav_flights: "رزرو پرواز",
    nav_status: "وضعیت پرواز",
    nav_assistant: "دستیار هوش مصنوعی",
    nav_trips: "سفرهای من",
    nav_destinations: "مقاصد پروازی",
    nav_travel_info: "اطلاعات سفر",
    nav_support: "پشتیبانی و دفاتر",
    nav_portal: "پورتال مسافران",
    nav_staff_portal: "پورتال کارمندان",
    nav_signin: "ورود",
    nav_register: "ثبت‌نام",
    nav_signout: "خروج",
    nav_settings: "تنظیمات",
    sidebar_dashboard: "داشبورد",
    sidebar_book_flights: "رزرو پرواز",
    sidebar_flight_status: "وضعیت پروازها",
    sidebar_ai_concierge: "دستیار هوشمند سفر",
    sidebar_my_etickets: "تکت‌های الکترونیکی من",
    sidebar_trip_plans: "پلان‌های سفر",
    sidebar_budget: "بودجه‌بندی",
    sidebar_memories: "خاطرات سفر",
    sidebar_executive_analytics: "گزارش‌های مدیریتی",
    sidebar_django_admin: "مدیریت جنگو",
    sidebar_passenger_profile: "پروفایل مسافر",
    sidebar_preferences: "تنظیمات کاربری",
    header_search_placeholder: "جستجوی پروازها، مقاصد، ویزا...",
    currency_exchange: "تبدیل اسعار",
    live_currency_conversion: "تبدیل زنده اسعار",
    amount_to_convert: "مبلغ جهت تبدیل",
    from_currency: "از ارز",
    to_currency: "به ارز",
    swap_currencies: "تعویض اسعار",
    live_rate: "نرخ لحظه‌ای",
    search_currency: "جستجوی ارز...",
    no_currencies_found: "ارزی یافت نشد",
    try_another_currency: "نام یا کد ارز دیگری را امتحان کنید.",
    selected: "انتخاب شده",
    loading_currency: "در حال دریافت نرخ‌های اسعار...",
    exchange_rate_unavailable: "نرخ لحظه‌ای در دسترس نیست.",
    select_currencies_hint: "ارزهای مورد نظر را جهت تبدیل انتخاب نمایید.",
    travel_calendar: "تقویم سفر",
    upcoming_tours: "سفرهای پیش‌رو",
    your_journey: "مسیر سفر شما",
    weather: "وضعیت هوا",
    destination_forecast: "پیش‌بینی آب و هوا",
    hero_badge: "پلتفرم رسمی دیجیتال مسافران",
    hero_title_1: "سفر شما با کام ایر آغاز می‌شود",
    hero_subtitle: "جستجوی پروازها، مدیریت سفر، بررسی وضعیت پرواز و دریافت راهنمای هوشمند سفر در یک مکان.",
    check_live_status: "بررسی وضعیت زنده",
    flight_number_placeholder: "مثال: RQ-901 (دبی) یا RQ-101 (استانبول)",
    ai_query_placeholder: "هر سوالی دارید بپرسید: وزن بار، ویزای دبی، آب زمزم، زمان پرواز...",
    ask_assistant: "پرسش از دستیار",
    popular_routes: "مسیرهای پرطرفدار کام ایر",
  },
  ps: {
    brand_sub: "ټراول جیني × کام ایر",
    concept_badge: "ازمایښتي نمونه",
    flight_search: "د الوتنو لټون",
    flight_directory: "د کام ایر الوتنې",
    departure: "د روانېدو ځای",
    destination: "منزل / مقصد",
    origin: "د پیل ځای",
    departure_date: "د تګ نېټه",
    return_date: "د بېرته راتګ نېټه",
    passengers: "مسافر",
    passenger: "مسافر",
    passenger_1: "۱ مسافر",
    passenger_2: "۲ مسافران",
    passenger_3: "۳ مسافران",
    passenger_4: "۴+ مسافران",
    adults: "لویان",
    cabin_class: "د الوتکې ټولګی",
    economy: "عادي (اکانومي) ټولګی",
    business: "تجارتي (بزنس) ټولګی",
    round_trip: "تګ او بېرته راتګ",
    one_way: "یو طرفه",
    search_flights: "الوتنې ولټوئ",
    search_kam_air_flights: "د کام ایر الوتنې ولټوئ",
    no_flights_found: "د دې لارې لپاره هېڅ الوتنه ونه موندل شوه.",
    book_now: "ټکټ واخلئ",
    book_a_flight: "الوتنه واخلئ",
    plan_with_ai: "د هوښیار AI سره سفر پلان کړئ",
    from_price: "پیل له",
    baggage_included: "سپارل کېدونکی بار",
    cabin_baggage: "لاسي سامان (کیبن)",
    duration: "د الوتنې موده",
    direct: "مستقیم",
    demo_notice: "ازمایښتي معلومات — د ارزونې لپاره ډیمو بڼه.",
    visa_info: "د ویزې او سفر لارښود",
    my_trips: "زما سفرونه",
    step_select: "۱. د الوتنې ټاکنه",
    step_passenger: "۲. د مسافر معلومات",
    step_addons: "۳. اضافي سامان",
    step_confirm: "۴. وروستی تایید",
    passenger_name: "بشپړ نوم (د پاسپورټ سره سم)",
    passport_num: "د پاسپورټ شمېره",
    passport_expiry: "د پاسپورټ د پای نېټه",
    nationality: "تابعیت",
    email: "برېښنالیک",
    phone: "واټس‌اپ / د اړیکې شمېره",
    confirm_booking: "ریزرویشن تایید کړئ",
    booking_success: "ریزرویشن په بریالیتوب سره بشپړ شو!",
    pnr_code: "د ثبت کوډ (PNR)",
    save_to_trips: "په زما سفرونو کې خوندي کړئ",
    download_ticket: "د ټکټ PDF کښته کړئ",
    admin_analytics: "د کام ایر احصایې",
    nav_flights: "د الوتنو لټون",
    nav_status: "د الوتنې وضعیت",
    nav_assistant: "د AI مرستیال",
    nav_trips: "زما سفرونه",
    nav_destinations: "منزلونه",
    nav_travel_info: "د سفر لارښود",
    nav_support: "مرسته او ملاتړ",
    nav_portal: "د مسافر پورټل",
    nav_staff_portal: "د کارمندانو پورټل",
    nav_signin: "ننوتل",
    nav_register: "نوم لیکنه",
    nav_signout: "وتل",
    nav_settings: "ترتیبات",
    sidebar_dashboard: "ډشبورډ",
    sidebar_book_flights: "د الوتنو لټون",
    sidebar_flight_status: "د الوتنې وضعیت",
    sidebar_ai_concierge: "د AI سفري همکار",
    sidebar_my_etickets: "زما برېښنايي ټکټونه",
    sidebar_trip_plans: "د سفر پلانونه",
    sidebar_budget: "بودیجه",
    sidebar_memories: "خاطرات او یادونه",
    sidebar_executive_analytics: "مدیریتي احصایې",
    sidebar_django_admin: "د سیسټم مدیریت",
    sidebar_passenger_profile: "د مسافر پروفایل",
    sidebar_preferences: "غوره توبونه",
    header_search_placeholder: "د الوتنو، منزلونو، او ویزو لټون وکړئ...",
    currency_exchange: "د اسعارو تبادله",
    live_currency_conversion: "د اسعارو ژوندۍ تبادله",
    amount_to_convert: "د تبادلې رقم",
    from_currency: "له اسعارو",
    to_currency: "اسعارو ته",
    swap_currencies: "د اسعارو بدلول",
    live_rate: "ژوندی نرخ",
    search_currency: "اسعار ولټوئ...",
    no_currencies_found: "اسعار ونه موندل شول",
    try_another_currency: "بل نوم یا د اسعارو کوډ ولټوئ.",
    selected: "ټاکل شوی",
    loading_currency: "د اسعارو معلومات راپورته کېږي...",
    exchange_rate_unavailable: "د اسعارو ژوندی نرخ شتون نلري.",
    select_currencies_hint: "هغه اسعار وټاکئ چې بدلول یې غواړئ.",
    travel_calendar: "د سفر تقویم",
    upcoming_tours: "راتلونکي سفرونه",
    your_journey: "ستاسو سفر",
    weather: "د هوا وضعیت",
    destination_forecast: "د هوا وړاندوینه",
    hero_badge: "د مسافرینو رسمي ډیجیټل پلټفارم",
    hero_title_1: "ستاسو سفر له کام ایر سره پیلېږي",
    hero_subtitle: "الوتنې ولټوئ، خپل سفر اداره کړئ، د الوتنو وضعیت وګورئ، او د سفر هوښیار ملاتړ په یو ځای کې ترلاسه کړئ.",
    check_live_status: "ژوندی حالت وګورئ",
    flight_number_placeholder: "مثلاً: RQ-901 (دوبۍ) یا RQ-101 (استانبول)",
    ai_query_placeholder: "هر څه وپوښتئ: د بار اندازه، د دوبۍ ویزې اصول، د زمزم اوبه، د الوتنې وختونه...",
    ask_assistant: "له مرستیال څخه وپوښتئ",
    popular_routes: "د کام ایر مشهورې لارې",
  },
};

const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem("travelgenie_currency") || "AFN";
  });

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("travelgenie_lang") || "en";
  });

  const setCurrency = (curr) => {
    if (CURRENCIES[curr]) {
      setCurrencyState(curr);
      localStorage.setItem("travelgenie_currency", curr);
    }
  };

  const setLanguage = (lang) => {
    if (LANGUAGES[lang]) {
      setLanguageState(lang);
      localStorage.setItem("travelgenie_lang", lang);
    }
  };

  useEffect(() => {
    const langConfig = LANGUAGES[language] || LANGUAGES.en;
    document.documentElement.lang = langConfig.code;
    document.documentElement.dir = langConfig.dir;
  }, [language]);

  /**
   * Formats a USD amount into the selected currency.
   */
  const formatPrice = (usdAmount, customCurrency = null) => {
    const targetCurrencyKey = customCurrency || currency;
    const targetCurrency = CURRENCIES[targetCurrencyKey] || CURRENCIES.USD;
    const converted = Math.round(Number(usdAmount || 0) * targetCurrency.rateFromUSD);

    if (targetCurrencyKey === "AFN") {
      return `${converted.toLocaleString()} ؋`;
    }
    if (targetCurrencyKey === "AED") {
      return `${converted.toLocaleString()} AED`;
    }
    if (targetCurrencyKey === "EUR") {
      return `€${converted.toLocaleString()}`;
    }
    return `$${converted.toLocaleString()}`;
  };

  /**
   * Translate a given key.
   */
  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const isRtl = LANGUAGES[language]?.dir === "rtl";

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        t,
        isRtl,
        currentCurrencyObj: CURRENCIES[currency] || CURRENCIES.USD,
        currentLanguageObj: LANGUAGES[language] || LANGUAGES.en,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  return useContext(LocalizationContext);
}
