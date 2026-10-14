import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useTrips } from "../../context/TripContext.jsx";
import { useLocalization } from "../../context/LocalizationContext.jsx";

function CalendarCard() {
  const { trips } = useTrips();
  const { t } = useLocalization();

  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  // =====================================================
  // GET TRIP START DATE
  // Supports the existing possible trip structures
  // =====================================================

  const getTripStartDate = (trip) => {
    if (!trip) return null;

    return (
      trip?.dates?.start ||
      trip?.dates?.startDate ||
      trip?.dates?.departure ||
      trip?.startDate ||
      trip?.start_date ||
      trip?.departureDate ||
      trip?.departure_date ||
      trip?.date ||
      trip?.start ||
      trip?.fromDate ||
      trip?.from_date ||
      null
    );
  };

  // =====================================================
  // GET TRIP END DATE
  // Supports the existing possible trip structures
  // =====================================================

  const getTripEndDate = (trip) => {
    if (!trip) return null;

    return (
      trip?.dates?.end ||
      trip?.dates?.endDate ||
      trip?.dates?.return ||
      trip?.endDate ||
      trip?.end_date ||
      trip?.returnDate ||
      trip?.return_date ||
      trip?.end ||
      trip?.toDate ||
      trip?.to_date ||
      getTripStartDate(trip)
    );
  };

  // =====================================================
  // SAFELY PARSE DATE
  // =====================================================

  const parseTripDate = (value) => {
    if (!value) return null;

    let date;

    // YYYY-MM-DD should be treated as a local calendar date
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      date = new Date(`${value}T00:00:00`);
    } else {
      date = new Date(value);
    }

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    date.setHours(0, 0, 0, 0);

    return date;
  };

  // =====================================================
  // PREPARE TRIP DATE RANGES
  // =====================================================

  const tripRanges = useMemo(() => {
    if (!Array.isArray(trips)) return [];

    return trips
      .map((trip) => {
        const startValue = getTripStartDate(trip);
        const endValue = getTripEndDate(trip);

        const start = parseTripDate(startValue);
        const end = parseTripDate(endValue);

        if (!start) return null;

        return {
          id: trip?.id,
          start,
          end: end && end >= start ? end : start,
        };
      })
      .filter(Boolean);
  }, [trips]);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handlePreviousMonth = () => {
    setCurrentDate(
      (previousDate) =>
        new Date(previousDate.getFullYear(), previousDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (previousDate) =>
        new Date(previousDate.getFullYear(), previousDate.getMonth() + 1, 1),
    );
  };

  // =====================================================
  // DATE HELPERS
  // =====================================================

  const isSameDate = (dateA, dateB) =>
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate();

  // =====================================================
  // GET DATE STATUS
  // =====================================================

  const getDateStatus = (day) => {
    const date = new Date(year, month, day);

    date.setHours(0, 0, 0, 0);

    for (const trip of tripRanges) {
      const isStart = isSameDate(date, trip.start);
      const isEnd = isSameDate(date, trip.end);

      // One-day trip
      if (isStart && isEnd) {
        return "single";
      }

      // Trip start
      if (isStart) {
        return "start";
      }

      // Trip end
      if (isEnd) {
        return "end";
      }

      // Dates between start and end
      if (date > trip.start && date < trip.end) {
        return "between";
      }
    }

    return null;
  };

  // =====================================================
  // TODAY
  // =====================================================

  const isToday = (day) => {
    const date = new Date(year, month, day);

    return isSameDate(date, today);
  };

  // =====================================================
  // CALENDAR CELLS
  // =====================================================

  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <section
      className="
    relative
    h-full
    min-h-[220px]
    overflow-hidden
    rounded-[28px]
    border
    border-gray-200/70
    bg-white/85
    px-4
    py-3
    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
    backdrop-blur-xl
    dark:border-white/10
    dark:bg-white/5
    transition-colors
  "
    >
      {/* =====================================================
          GLASS HIGHLIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-white/20
          via-transparent
          to-transparent
          dark:from-white/[0.03]
        "
      />

      <div className="relative flex h-full flex-col">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex shrink-0 items-center justify-between">
          <div>
            <h3
              className="
                text-sm
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              {t("travel_calendar", "Travel Calendar")}
            </h3>

            <p
              className="
                mt-0.5
                text-[10px]
                font-medium
                text-gray-500
                dark:text-white/50
              "
            >
              {monthNames[month]} {year}
            </p>
          </div>

          {/* Navigation */}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-gray-50
                text-gray-600
                transition
                hover:bg-[#F58220]/10
                hover:text-[#F58220]
                hover:border-[#F58220]/30
                active:scale-90
                dark:border-white/10
                dark:bg-white/5
                dark:text-white/60
                dark:hover:bg-white/10
                dark:hover:text-amber-400
                cursor-pointer
              "
              aria-label="Previous month"
            >
              <ChevronLeft size={13} />
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-gray-50
                text-gray-600
                transition
                hover:bg-[#F58220]/10
                hover:text-[#F58220]
                hover:border-[#F58220]/30
                active:scale-90
                dark:border-white/10
                dark:bg-white/5
                dark:text-white/60
                dark:hover:bg-white/10
                dark:hover:text-amber-400
                cursor-pointer
              "
              aria-label="Next month"
            >
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* =====================================================
            CALENDAR
        ===================================================== */}

        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          {/* Weekdays */}

          <div className="grid grid-cols-7 pb-1 text-center">
            {days.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className="
                  text-[8px]
                  font-semibold
                  text-gray-400
                  dark:text-white/35
                "
              >
                {day}
              </span>
            ))}
          </div>

          {/* Dates */}

          <div
            className="
              mt-1
              grid
              flex-1
              grid-cols-7
              grid-rows-6
              text-center
            "
          >
            {Array.from({ length: 42 }, (_, index) => {
              const day = calendarCells[index];

              if (!day) {
                return <span key={`empty-${index}`} />;
              }

              const status = getDateStatus(day);
              const todayDate = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  className={`
                    relative
                    flex
                    min-h-[22px]
                    items-center
                    justify-center
                    text-[9px]
                    font-medium
                    transition
                    active:scale-90

                    ${
                      status === "between"
                        ? `
                          bg-amber-500/15
                          text-[#F58220]
                          dark:bg-amber-500/25
                          dark:text-amber-400
                        `
                        : ""
                    }

                    ${
                      status === "start"
                        ? `
                          rounded-l-full
                          bg-gradient-to-r
                          from-amber-500
                          to-[#F58220]
                          text-white
                          shadow-[0_3px_10px_rgba(245,130,32,0.25)]
                        `
                        : ""
                    }

                    ${
                      status === "end"
                        ? `
                          rounded-r-full
                          bg-gradient-to-r
                          from-amber-500
                          to-[#F58220]
                          text-white
                          shadow-[0_3px_10px_rgba(245,130,32,0.25)]
                        `
                        : ""
                    }

                    ${
                      status === "single"
                        ? `
                          rounded-full
                          bg-gradient-to-r
                          from-amber-500
                          to-[#F58220]
                          text-white
                          shadow-[0_3px_10px_rgba(245,130,32,0.25)]
                        `
                        : ""
                    }

                    ${
                      !status && todayDate
                        ? `
                          rounded-full
                          border
                          border-[#F58220]
                          text-[#F58220]
                          font-bold
                          dark:text-amber-400
                        `
                        : ""
                    }

                    ${
                      !status && !todayDate
                        ? `
                          rounded-full
                          text-gray-700
                          hover:bg-[#F58220]/10
                          hover:text-[#F58220]
                          dark:text-white/70
                          dark:hover:bg-white/10
                        `
                        : ""
                    }
                  `}
                  aria-label={`${monthNames[month]} ${day}, ${year}`}
                >
                  {day}

                  {/* =================================================
                      TODAY DOT INSIDE A TRIP
                  ================================================= */}

                  {todayDate && status && (
                    <span
                      className="
                        absolute
                        bottom-0.5
                        h-1
                        w-1
                        rounded-full
                        bg-white
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CalendarCard;
