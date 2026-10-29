import { useLocalization } from "../../context/LocalizationContext.jsx";

function TripCard({ trip, onDelete }) {
  const { formatPrice, t } = useLocalization();

  return (
    <div
      className="
        bg-white/80
        dark:bg-[#071625]
        rounded-3xl
        p-6
        shadow-sm
        border
        border-gray-100
        dark:border-white/10
      "
    >
      <div className="flex justify-between items-start">
        <h2
          className="
            text-2xl
            font-bold
            text-[#0B1F3A]
            dark:text-white
          "
        >
          {trip.destination}
        </h2>

        <button
          className="
            text-gray-500
            hover:text-[#F58220]
            dark:text-gray-400
            transition
          "
        >
          {t("favorite", "Favorite")}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          {t("travel_dates", "Travel dates")}:
          <span className="font-medium">
            {" "}
            {trip.start_date} - {trip.end_date}
          </span>
        </p>

        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          {t("budget", "Budget")}:
          <span className="font-medium text-[#F58220] dark:text-amber-400"> {formatPrice(trip.budget || 0)}</span>
        </p>

        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          {t("travelers", "Travelers")}:
          <span className="font-medium"> {trip.travelers}</span>
        </p>

        <p
          className="
            text-gray-600
            dark:text-gray-300
          "
        >
          {t("travel_style", "Travel style")}:
          <span className="font-medium"> {trip.travel_style}</span>
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          className="
            flex-1
            rounded-xl
            bg-[#F58220]
            py-2
            text-white
            font-semibold
            hover:bg-[#e07010]
            shadow-md shadow-[#F58220]/25
            transition
          "
        >
          {t("edit", "Edit")}
        </button>

        <button
          onClick={() => onDelete(trip.id)}
          className="
            flex-1
            rounded-xl
            bg-red-500
            py-2
            text-white
            font-semibold
            hover:bg-red-600
            transition
          "
        >
          {t("delete", "Delete")}
        </button>
      </div>
    </div>
  );
}

export default TripCard;
