import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

import EmployeeModal from "./EmployeeModal";
import EmployeeCard from "./EmployeeCard";

const EmployeesDisplay = ({ data, showList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams({});
  const q = searchParams.get("q").toLowerCase();
  const office = searchParams.get("office");
  const sort = searchParams.get("sort");

  const filteredData = data.filter((person) =>
    office === "All"
      ? person.name.toLowerCase().includes(q)
      : person.name.toLowerCase().includes(q) && person.office === office
  );

  const sortOptions = {
    nameDescending: (a, b) => b.name.localeCompare(a.name),
    nameAscending: (a, b) => a.name.localeCompare(b.name),
    officeDescending: (a, b) => b.office.localeCompare(a.office),
    officeAscending: (a, b) => a.office.localeCompare(b.office),
  };

  const sortedData = sort ? filteredData.sort(sortOptions[sort]) : filteredData;

  if (sortedData)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 py-4">
        {showList
          ? sortedData.map((person) => (
              <button
                type="button"
                className="hover:bg-red-500 relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                {person.name}
                {isOpen && (
                  <div className="fixed top-0 left-0 right-0 bg-red-500">
                    <EmployeeModal />
                    <span
                      type="button"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
              </button>
            ))
          : sortedData.map((person) => (
              <EmployeeCard
                person={person}
                key={`${person.phoneNumber}_${person.email}_${person.linkedIn}`}
              />
            ))}
      </div>
    );
  return <></>;
};

EmployeesDisplay.propTypes = {
  data: PropTypes.array,
  showList: PropTypes.bool,
};

export default EmployeesDisplay;
