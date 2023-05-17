import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import EmployeeModal from "./EmployeeModal";
import EmployeeCard from "./EmployeeCard";

const EmployeesDisplay = ({ employeeData, showList }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(
      "🚀 ~ file: EmployeesDisplay.js:8 ~ EmployeesDisplay ~ isOpen:",
      isOpen
    );
  }, [isOpen]);

  if (employeeData)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 py-4">
        {showList
          ? employeeData.map((person) => (
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
          : employeeData.map((person) => (
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
