import DashboradSidebar from "@/components/dashboard/DashboradSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className=" px-5 pt-5 border-r">
       <DashboradSidebar/>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <div className="h-16 border-b flex items-center px-5">
          navbar
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}