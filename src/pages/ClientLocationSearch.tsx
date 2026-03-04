import { useState } from "react";
import { Search, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClientLocationSearch() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    // Generate a temporary application link for direct approach
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "APP-DIR-";
    for (let i = 0; i < 6; i++)
      id += chars[Math.floor(Math.random() * chars.length)];

    navigate(
      `/apply/${id}/passport?country=${encodeURIComponent(destination)}`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Where are you traveling?
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Find your destination to start your visa application
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. Dubai, France, USA"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 text-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0148BA] transition-all bg-gray-50 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={!destination.trim()}
            className="w-full py-4 rounded-xl bg-[#0148BA] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
          >
            Start Application
          </button>
        </form>
      </div>
    </div>
  );
}
