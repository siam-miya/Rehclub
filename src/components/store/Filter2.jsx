
"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutGrid, SlidersHorizontal } from "lucide-react";

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
  onFilterClick = () => {},
  columns = 3,
  showFilterButton = true,
}) => {
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [selectedGrid, setSelectedGrid] = useState(columns);
  const [showGridOptions, setShowGridOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const toolbarRef = useRef(null);

  useEffect(() => {
    setSelectedGrid(columns);
  }, [columns]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setShowGridOptions(false);
        setShowSortOptions(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowGridOptions(false);
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectSort = (option) => {
    setSelectedSort(option);
    setShowSortOptions(false);
    onSortChange(option);
  };

  const selectGrid = (value) => {
    setSelectedGrid(value);
    setShowGridOptions(false);
    onGridChange(value);
  };

  return (
    <div
      ref={toolbarRef}
      className="relative z-30 flex w-full min-w-0 items-center justify-between gap-2 border-y border-gray-100 py-3 sm:gap-4 sm:py-4"
    >
      {/* Filter: only mobile and tablet */}
      {showFilterButton && (
        <button
          type="button"
          onClick={onFilterClick}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-700 transition-colors hover:text-black sm:text-sm lg:hidden"
        >
          <SlidersHorizontal size={16} strokeWidth={1.7} />
          <span>Filter</span>
        </button>
      )}

      {/* Grid selector */}
      <div
        className="relative flex shrink-0 items-center"
        onMouseEnter={() => setShowGridOptions(true)}
        onMouseLeave={() => setShowGridOptions(false)}
      >
        <button
          type="button"
          aria-label="Choose product grid layout"
          aria-expanded={showGridOptions}
         onClick={() => {
  setShowGridOptions(true);
  setShowSortOptions(false);
}}
          className="flex h-9 w-9 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:text-black sm:h-10 sm:w-10"
        >
          <LayoutGrid size={19} strokeWidth={1.6} />
        </button>

        {/* Options slide out to the right */}
        <div
          className={`absolute left-full top-1/2 z-40 -translate-y-1/2 pl-1 transition-all duration-300 ease-out ${
            showGridOptions
              ? "visible translate-x-0 opacity-100"
              : "invisible -translate-x-3 opacity-0"
          }`}
        >
          <div className="flex items-center gap-1 border border-gray-200 bg-white p-1.5 shadow-lg">
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} columns`}
                aria-pressed={selectedGrid === value}
                onClick={() => selectGrid(value)}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center text-xs font-medium transition-colors ${
                  selectedGrid === value
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort selector */}
      <div className="relative ml-auto shrink-0">
        <button
          type="button"
          aria-expanded={showSortOptions}
          onClick={() => {
            setShowSortOptions((previous) => !previous);
            setShowGridOptions(false);
          }}
          className="flex max-w-[150px] cursor-pointer items-center gap-1.5 border border-gray-200 px-2.5 py-2 text-xs transition-colors hover:border-black sm:max-w-none sm:gap-2 sm:px-3 sm:text-sm"
        >
          <span className="truncate font-medium text-gray-800">
            {selectedSort}
          </span>

          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-300 ${
              showSortOptions ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`absolute right-0 top-full z-40 mt-2 w-[190px] origin-top-right border border-gray-100 bg-white py-2 shadow-xl transition-all duration-200 sm:w-52 ${
            showSortOptions
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          {sortOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => selectSort(option)}
              className={`block w-full cursor-pointer px-4 py-2.5 text-left text-xs transition-colors hover:bg-gray-50 ${
                selectedSort === option
                  ? "bg-gray-50 font-semibold text-black"
                  : "text-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter2;
