import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="has-[:focus]:border-harbor-gray-foreground border-2 border-transparent flex items-enter space-x-2 py-3 px-4 bg-harbor-gray rounded-md ">
      <SearchIcon className="w-6 h-6 text-harbor-gray-foreground" />
      <input
        className="bg-transparent focus:outline-none"
        placeholder=" Search"
      />
    </div>
  );
};

export default SearchBar;
