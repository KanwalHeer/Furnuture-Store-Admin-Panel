import Sidebar from "./_component/sidebar";
import Header from "./_component/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed top-16 left-0 z-40 w-64 md:bg-gradient-to-r md:from-yellow-500 md:to-yellow-600 bg-transparent text-white h-screen p-6">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        {/* Children content */}
        <div className="mt-16 p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}