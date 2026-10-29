import { useMemo } from "react";
import { Wallet, TrendingUp, DollarSign, MapPin } from "lucide-react";
import { useTrips } from "../../context/TripContext.jsx";
import { useLocalization } from "../../context/LocalizationContext.jsx";

function Budget() {
  const { trips, loading } = useTrips();
  const { formatPrice, t } = useLocalization();

  const budgetData = useMemo(() => {
    const totalBudget = trips.reduce(
      (total, trip) => total + Number(trip.budget || 0),
      0,
    );

    const averageBudget = trips.length > 0 ? totalBudget / trips.length : 0;

    const highestBudget =
      trips.length > 0
        ? Math.max(...trips.map((trip) => Number(trip.budget || 0)))
        : 0;

    return {
      totalBudget,
      averageBudget,
      highestBudget,
    };
  }, [trips]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-600 dark:text-white/60">
          {t("loading", "Loading budget...")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
          {t("budget", "Budget")}
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-white/70">
          {t("budget_subtitle", "Track and understand your travel spending.")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Budget Card */}
        <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/70 dark:border-white/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/60">
                {t("total_trip_budget", "Total Trip Budget")}
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white">
                {formatPrice(budgetData.totalBudget)}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F58220]/15 text-[#F58220] dark:bg-[#F58220]/25 dark:text-amber-400">
              <Wallet size={24} />
            </div>
          </div>
        </div>

        {/* Average Budget Card */}
        <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/70 dark:border-white/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/60">
                {t("average_trip_budget", "Average Trip Budget")}
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white">
                {formatPrice(Math.round(budgetData.averageBudget))}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-[#F58220] dark:bg-amber-500/25 dark:text-amber-400">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        {/* Highest Budget Card */}
        <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/70 dark:border-white/10 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/60">
                {t("highest_trip_budget", "Highest Trip Budget")}
              </p>

              <h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white">
                {formatPrice(budgetData.highestBudget)}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F58220]/15 text-[#F58220] dark:bg-[#F58220]/25 dark:text-amber-400">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-5 flex items-center gap-2">
          <DollarSign className="text-[#F58220] dark:text-amber-400" size={24} />

          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
            {t("trip_budgets", "Trip Budgets")}
          </h2>
        </div>

        {trips.length === 0 ? (
          <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/70 dark:border-white/10 p-8 text-center shadow-sm">
            <Wallet size={40} className="mx-auto text-gray-400 dark:text-white/40" />

            <h3 className="mt-4 text-lg font-bold text-[#0B1F3A] dark:text-white">
              {t("no_trips_yet", "No trips yet")}
            </h3>

            <p className="mt-2 text-xs text-gray-500 dark:text-white/60">
              {t("create_trip_budget_hint", "Create a trip to start tracking your travel budget.")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/70 dark:border-white/10 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F58220]/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-[#F58220] shrink-0" />

                      <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white">
                        {trip.destination}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs font-medium text-gray-500 dark:text-white/60">
                      {trip.travelStyle || "Travel"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400 dark:text-white/50">
                      {t("budget", "Budget")}
                    </p>

                    <p className="text-xl font-black text-[#F58220] dark:text-amber-400">
                      {formatPrice(Number(trip.budget || 0))}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs text-gray-500 dark:text-white/50">
                    <span>{t("budget", "Budget Share")}</span>
                    <span className="font-semibold text-gray-700 dark:text-white/80">
                      {budgetData.totalBudget > 0
                        ? Math.round(
                            (Number(trip.budget || 0) /
                              budgetData.totalBudget) *
                              100,
                          )
                        : 0}
                      %
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-[#F58220]"
                      style={{
                        width: `${
                          budgetData.totalBudget > 0
                            ? Math.min(
                                (Number(trip.budget || 0) /
                                  budgetData.totalBudget) *
                                  100,
                                100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Budget;
