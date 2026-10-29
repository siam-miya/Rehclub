
"use client";

import React, { useState } from "react";
import { ChevronDown, LayoutGrid } from "lucide-react";

const sortOptions = [
  "Featured",
  "Best selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

const Filter2 = ({
  onSortChange = () => {},
  onGridChange = () => {},
}) => {
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedGrid, setSelectedGrid] = useState(3);
  const [showGridOptions, setShowGridOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const selectSort = (option) => {
    setSelectedSort(option);
    setShowSortOptions(false);
    onSortChange(option);
  };

  const selectGrid = (columns) => {
    setSelectedGrid(columns);
    setShowGridOptions(false);
    onGridChange(columns);
  };

  return (
    <div className="flex w-full items-center justify-end gap-3 border-b border-gray-100 pb-4">
      {/* Columns Selector */}
      <div className="relative shrink-0">
        <button
          type="button"
          aria-expanded={showGridOptions}
          onClick={() => {
            setShowGridOptions((previous) => !previous);
            setShowSortOptions(false);
          }}
          className="flex items-center gap-2 border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-black"
        >
          <LayoutGrid size={16} />
          <span>{selectedGrid} Columns</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              showGridOptions ? "rotate-180" : ""
            }`}
          />
        </button>

        {showGridOptions && (
          <div className="absolute right-0 top-full z-30 mt-2 flex gap-1 rounded-md border border-gray-200 bg-white p-2 shadow-lg">
            {[2, 3, 4, 5].map((columns) => (
              <button
                key={columns}
                type="button"
                aria-pressed={selectedGrid === columns}
                onClick={() => selectGrid(columns)}
                className={`h-8 w-8 text-sm transition-colors ${
                  selectedGrid === columns
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {columns}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Selector */}
      <div className="relative shrink-0">
        <button
          type="button"
          aria-expanded={showSortOptions}
          onClick={() => {
            setShowSortOptions((previous) => !previous);
            setShowGridOptions(false);
          }}
          className="flex max-w-[190px] items-center gap-2 border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-black sm:max-w-none"
        >
          <span className="truncate">{selectedSort}</span>
          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-200 ${
              showSortOptions ? "rotate-180" : ""
            }`}
          />
        </button>

        {showSortOptions && (
          <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-md border border-gray-100 bg-white py-2 shadow-xl">
            {sortOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => selectSort(option)}
                className={`block w-full px-4 py-2 text-left text-xs transition-colors hover:bg-gray-50 ${
                  selectedSort === option
                    ? "font-semibold text-black"
                    : "text-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter2;
