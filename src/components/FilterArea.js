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
  const sortEmployees = (sortMode) => {
    if (sortMode === "nameDescending") {
      data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    } else if (sortMode === "nameAscending") {
      data.sort((a, b) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
    } else if (sortMode === "officeDescending") {
      data.sort((a, b) =>
        a.office > b.office ? 1 : b.office > a.office ? -1 : 0
      );
    } else if (sortMode === "officeAscending") {
      data.sort((a, b) =>
        a.office < b.office ? 1 : b.office < a.office ? -1 : 0
      );
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
