"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchTransport } from "@/lib/api/list/searchApi";
import { LOCATIONS } from "@/lib/constants";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy query parameters từ URL
  const startLocation = searchParams.get("start_location");
  const endLocation = searchParams.get("end_location");
  const date = searchParams.get("date");
  const tripType = searchParams.get("tripType");

  useEffect(() => {
    if (startLocation && endLocation && date) {
      fetchSearchResults();
    }
  }, [startLocation, endLocation, date, tripType]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await searchTransport({
        start_location: startLocation,
        end_location: endLocation,
        date: date,
        tripType: tripType,
      });

      setSearchResults(response.data || []);
    } catch (err) {
      setError("Không thể tìm kiếm kết quả");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get location name
  const getLocationName = (code: string) => {
    const location = LOCATIONS.find((loc) => loc.value === code);
    return location ? location.label : code;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm</h1>

      {/* Search parameters display */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Thông tin tìm kiếm:</h2>
        <p>
          <strong>Từ:</strong> {getLocationName(startLocation)}
        </p>
        <p>
          <strong>Đến:</strong> {getLocationName(endLocation)}
        </p>
        <p>
          <strong>Ngày:</strong> {date}
        </p>
        <p>
          <strong>Loại:</strong>{" "}
          {tripType === "oneWay" ? "Một chiều" : "Khứ hồi"}
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Đang tìm kiếm...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Search results */}
      {!loading && !error && searchResults.length > 0 && (
        <div className="space-y-4">
          {searchResults.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <p className="text-gray-600">{result.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  {result.price} VNĐ
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Đặt vé
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && !error && searchResults.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Không tìm thấy kết quả nào</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
