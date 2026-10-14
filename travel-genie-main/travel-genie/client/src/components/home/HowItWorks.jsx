import { motion } from "framer-motion";
import { MapPin, Sparkles, Plane, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Choose your destination",
    description:
      "Tell TravelGenie where you want to go, your travel dates, budget, and preferred travel style.",
    cta: "Start Planning",
    route: "/dashboard/trips/create",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI creates your plan",
    description:
      "Our AI generates personalized itineraries, activities, recommendations, and smart suggestions.",
    cta: "Explore AI Recommendations",
    route: "/dashboard/recommendations",
  },
  {
    number: "03",
    icon: Plane,
    title: "Enjoy your journey",
    description:
      "Book Kam Air flights, follow your plan, explore new places, and save your unforgettable travel memories.",
    cta: "Search Flights",
    route: "/flights",
  },
];

function HowItWorks() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStepClick = (route) => {
    if (!user && route.startsWith("/dashboard")) {
      navigate(`/signup?redirect=${encodeURIComponent(route)}`);
    } else {
      navigate(route);
    }
  };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#F5F7FA] py-20 dark:bg-[#07111F] sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-[#F58220]/10 blur-3xl dark:bg-[#F58220]/10" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 px-4 py-2 text-sm font-semibold text-[#F58220]">
            <Sparkles size={16} />
            Simple process
          </div>

          <h2 className="mt-6 text-3xl font-bold text-[#0B1F3A] dark:text-white sm:text-4xl lg:text-5xl">
            Plan your trip in{" "}
            <span className="text-[#F58220]">three simple steps</span>
          </h2>

          <p className="mt-5 text-gray-600 dark:text-gray-300 sm:text-lg">
            TravelGenie turns your travel ideas into a complete journey with the
            power of artificial intelligence.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => handleStepClick(step.route)}
                className="group relative cursor-pointer rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-[#F58220]/40 hover:shadow-xl hover:shadow-[#F58220]/10 dark:border-white/10 dark:bg-[#0B1F3A]/90 flex flex-col justify-between"
              >
                <div>
                  {/* Number */}
                  <span className="absolute right-7 top-6 text-5xl font-bold text-gray-200 transition-colors group-hover:text-[#F58220]/20 dark:text-white/10 dark:group-hover:text-[#F58220]/20">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F58220] text-white shadow-lg shadow-[#F58220]/25 transition-transform group-hover:scale-110">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#0B1F3A] dark:text-white group-hover:text-[#F58220] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-xs font-bold text-[#F58220] group-hover:text-[#e07010]">
                  <span>{step.cta}</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;