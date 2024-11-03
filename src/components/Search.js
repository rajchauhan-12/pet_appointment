import { useState } from "react";
import {BiCaretDown, BiCheck } from "react-icons/bi";

const Search = ({
  query,
  onQueryChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  const [toggleSort, setToggleSort] = useState(false);

  return (
    <div className="relative mt-5">
      <input
        type="text"
        value={query}
        onChange={onQueryChange}
        className="w-full border-gray-300 rounded-md pl-10 py-2"
        placeholder="Search appointments"
      />
      <button
        onClick={() => setToggleSort(!toggleSort)}
        className="absolute inset-y-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Sort By <BiCaretDown />
      </button>
      {toggleSort && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48">
          <div onClick={() => onSortByChange("petName")} className="p-2">
            Pet Name {sortBy === "petName" && <BiCheck />}
          </div>
          <div onClick={() => onSortByChange("ownerName")} className="p-2">
            Owner Name {sortBy === "ownerName" && <BiCheck />}
          </div>
          <div onClick={() => onSortByChange("aptDate")} className="p-2">
            Date {sortBy === "aptDate" && <BiCheck />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
