import React from "react";

const FilterArea = () => {
  console.log("test");
  return (
    <div className="px-4 space-x-4">
      <input type="text" />
      <button
        type="submit"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-2 py-1"
      >
        Submit
      </button>
    </div>
  );
};

export default FilterArea;
