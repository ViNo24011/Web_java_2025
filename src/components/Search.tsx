"use client";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-sm border-1 border-gray-300 rounded-md"
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-black pr-4 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          size="sm"
          className="flex-none w-16 bg-gray-200 rounded-l-none border-l-0 h-9 px-2 active:scale-90 transition-all duration-150"
        >
          <SearchIcon className="h-4 w-4 text-black" />
        </Button>
      </div>
    </form>
  );
}
