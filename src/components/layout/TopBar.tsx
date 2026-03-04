import { Search, Bell, LayoutGrid } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center px-6 gap-4 sticky top-0 z-20">
      {/* Search bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by destinations"
            className="w-full pl-5 pr-12 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#014BA9]"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-[#F97316] hover:bg-[#EA580C] rounded-full flex items-center justify-center transition-colors">
            <Search className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <LayoutGrid className="h-5 w-5 text-gray-500" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-600 font-medium">A</span>
          </div>
          <span className="text-sm text-gray-700 font-medium hidden sm:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
