import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTable } from "@fortawesome/free-solid-svg-icons";

const FilterArea = ({
  setFilterName,
  setFilterOffice,
  setSortMode,
  setEmployeeData,
  data,
  showList,
  setShowList,
}) => {
  const { results } = data;
  const sortEmployees = (sortMode) => {
    if (sortMode === "givenNameDescending") {
      results.sort((a, b) => {
        return a.name.first > b.name.first
          ? 1
          : b.name.first > a.name.first
          ? -1
          : 0;
      });
    } else if (sortMode === "givenNameAscending") {
      results.sort((a, b) => {
        return a.name.first < b.name.first
          ? 1
          : b.name.first < a.name.first
          ? -1
          : 0;
      });
    } else if (sortMode === "lastNameDescending") {
      results.sort((a, b) => {
        return a.name.last > b.name.last
          ? 1
          : b.name.last > a.name.last
          ? -1
          : 0;
      });
    } else if (sortMode === "lastgivenNameAscending") {
      results.sort((a, b) => {
        return a.name.last < b.name.last
          ? 1
          : b.name.last < a.name.last
          ? -1
          : 0;
      });
    }
    setSortMode(sortMode);
    setEmployeeData(data);
  };
  return (
    <div className="flex flex-nowrap flex-col lg:flex-row justify-between items-start mx-4 lg:items-center">
      <form className="flex flex-col flex-nowrap sm:flex-row justify-between sm:space-x-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by name:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(event) => setFilterName(event.target.value)}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by office:
          <select
            onChange={(event) => setFilterOffice(event.target.value)}
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
            onChange={(event) => sortEmployees(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="givenNameDescending">Given name (descending)</option>
            <option value="givenNameAscending">Given name (ascending)</option>
            <option value="lastNameDescending">Last name (descending)</option>
            <option value="lastgivenNameAscending">
              Last name (ascending)
            </option>
          </select>
        </label>
      </form>
      <button
        onClick={() => setShowList(!showList)}
        className="fa-xl py-3 flex"
      >
        {showList ? (
          <div className="flex flex-col items-end">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Toggle view mode
            </label>
            <FontAwesomeIcon icon={faList} />
          </div>
        ) : (
          <div className="flex flex-col items-end">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Toggle view mode
            </label>
            <FontAwesomeIcon icon={faTable} />
          </div>
        )}
      </button>
    </div>
  );
};

FilterArea.propTypes = {
  setFilterName: PropTypes.func.isRequired,
  setFilterOffice: PropTypes.func.isRequired,
  setSortMode: PropTypes.func.isRequired,
  setEmployeeData: PropTypes.func.isRequired,
  data: PropTypes.array,
  showList: PropTypes.bool,
  setShowList: PropTypes.func.isRequired,
};

export default FilterArea;
