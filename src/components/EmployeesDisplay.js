import React from "react";
import PropTypes from "prop-types";

import EmployeeCard from "./EmployeeCard";

const EmployeesDisplay = ({ data, showList }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 p-4">
      {showList
        ? data.map((person) => <div>{person.name}</div>)
        : data.map((person) => (
            <EmployeeCard
              person={person}
              key={`${person.phoneNumber}_${person.email}_${person.linkedIn}`}
            />
          ))}
    </div>
  );
};

EmployeesDisplay.propTypes = {
  data: PropTypes.array,
  showList: PropTypes.bool,
};

export default EmployeesDisplay;
