import React from "react";

import EmployeeCard from "./EmployeeCard";

const EmployeeGrid = ({ data }) => {
  console.log(data);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
      {data.map((person) => (
        <EmployeeCard person={person} />
      ))}
    </div>
  );
};

export default EmployeeGrid;
