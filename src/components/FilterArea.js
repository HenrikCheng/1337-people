import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTable,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const FilterArea = ({ showList, setShowList }) => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const changeHandler = (e) => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("q", e.target.value);
    setSearchParams(updatedSearchParams.toString());
  };

  const debouncedOnChange = debounce(changeHandler, 500);

  return (
    <div className="flex flex-nowrap flex-col lg:flex-row justify-between items-start lg:items-center">
      <form
        className="flex flex-col flex-nowrap sm:flex-row justify-between sm:space-x-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block text-gray-700 text-sm font-bold mb-2 relative">
          Filter by name:
          <input
            id="nameInput"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={debouncedOnChange}
            defaultValue={
              searchParams.get("q") && searchParams.get("q").length > 1
                ? searchParams.get("q")
                : ""
            }
          />
          {searchParams.toString() && (
            <button
              className="absolute top-1/2 right-2"
              onClick={() => {
                setSearchParams("");
                document.getElementById("nameInput").value = "";
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by office:
          <select
            onChange={(event) => {
              let updatedSearchParams = new URLSearchParams(
                searchParams.toString()
              );
              updatedSearchParams.set("office", event.target.value);
              setSearchParams(updatedSearchParams.toString());
            }}
            defaultValue={
              searchParams.get("office") &&
              searchParams.get("office").length > 1
                ? searchParams.get("office")
                : ""
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All</option>
            <option value="Stockholm">Stockholm</option>
            <option value="Lund">Lund</option>
            <option value="Ljubljana">Ljubljana</option>
            <option value="Helsingborg">Helsingborg</option>
            <option value="Borlänge">Borlänge</option>
          </select>
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sort by:
          <select
            onChange={(event) => {
              let updatedSearchParams = new URLSearchParams(
                searchParams.toString()
              );
              updatedSearchParams.set("sort", event.target.value);
              setSearchParams(updatedSearchParams.toString());
            }}
            defaultValue={
              searchParams.get("sort") && searchParams.get("sort").length > 1
                ? searchParams.get("sort")
                : ""
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="nameDescending">Name (descending)</option>
            <option value="nameAscending">Name (ascending)</option>
            <option value="officeDescending">Office (descending)</option>
            <option value="officeAscending">Office (ascending)</option>
          </select>
        </label>
      </form>
      <button
        onClick={() => setShowList(!showList)}
        className="fa-xl py-3 flex"
      >
        <div className="flex flex-col items-end">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Toggle view mode
          </label>
          <FontAwesomeIcon icon={showList ? faList : faTable} />
        </div>
      </button>
    </div>
  );
};

FilterArea.propTypes = {
  data: PropTypes.array,
  showList: PropTypes.bool,
  setShowList: PropTypes.func.isRequired,
};

export default FilterArea;
