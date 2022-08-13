import React from "react";
import PropTypes from "prop-types";

import EmployeeCard from "./EmployeeCard";

const EmployeeGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
      {data.map((person) => (
        <EmployeeCard
          person={person}
          key={`${person.phoneNumber}_${person.email}`}
        />
      ))}
    </div>
  );
};

EmployeeGrid.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EmployeeGrid;
