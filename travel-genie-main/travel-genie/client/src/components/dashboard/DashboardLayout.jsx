import { useState } from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import MobileSidebar from "./MobileSidebar";

import DashboardHeader from "./DashboardHeader";

import dashboardBg from "../../assets/images/dashboard-bg.jpg";

function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
      "
    >
      {/* Background */}
      <img
        src={dashboardBg}
        alt="travel background"
        className="
          fixed
          inset-0
          w-full
          h-full
          object-cover
          scale-105
          -z-20
        "
      />

      {/* Overlay */}
      <div
        className="
          fixed
          inset-0
          bg-[#F5F7FA]/90
          backdrop-blur-xl
          dark:bg-gradient-to-br
          dark:from-[#071A2B]/85
          dark:via-[#09263F]/75
          dark:to-[#020617]/95
          -z-10
          transition-colors duration-300
        "
      />

      {/* Glow */}
      <div
        className="
          absolute
          -top-40
          -left-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#F58220]/15
          blur-[160px]
        "
      />

      <div
        className="
          absolute
          bottom-[-150px]
          right-[-150px]
          w-[450px]
          h-[450px]
          rounded-full
          bg-[#0B1F3A]/40
          blur-[150px]
        "
      />

      {/* Layout */}
      <div
        className="
          relative
          z-10
          w-full
          p-4
          lg:p-6
        "
      >
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar */}
        <div className="lg:hidden">
          {mobileSidebarOpen && (
            <MobileSidebar close={() => setMobileSidebarOpen(false)} />
          )}
        </div>

        {/* Main content */}
        <div
          className="
            lg:ml-[268px]
            rtl:lg:ml-0
            rtl:lg:mr-[268px]
            min-w-0
            flex
            flex-col
          "
        >
          {/* Top Sticky Header */}
          <div className="sticky top-4 z-40 mb-6 rounded-[22px] bg-white/90 dark:bg-[#071625]/90 backdrop-blur-2xl border border-gray-200/80 dark:border-white/10 px-4 py-2.5 shadow-xl transition-all">
            <DashboardHeader openSidebar={() => setMobileSidebarOpen(true)} />
          </div>

          <main
            className="
              w-full
              pb-20
            "
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
