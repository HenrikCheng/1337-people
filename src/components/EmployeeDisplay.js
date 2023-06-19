import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

import EmployeeCard from "./EmployeeCard";
import EmployeeList from "./EmployeeList";

const EmployeeDisplay = ({ data, showList }) => {
  const [searchParams] = useSearchParams({});
  const q = (searchParams.get("q") || "").toLowerCase();
  const office = searchParams.get("office") || "All";
  const sort = searchParams.get("sort") || "nameDescending";

  const filteredData = data.filter((person) => {
    if (office === "All") {
      return person.name && person.name.toLowerCase().includes(q);
    } else {
      return (
        person.name &&
        person.name.toLowerCase().includes(q) &&
        person.office === office
      );
    }
  });

  const sortOptions = {
    nameAscending: (a, b) => b.name?.localeCompare(a.name) || 0,
    nameDescending: (a, b) => a.name?.localeCompare(b.name) || 0,
    officeDescending: (a, b) => a.office?.localeCompare(b.office) || 0,
    officeAscending: (a, b) => b.office?.localeCompare(a.office) || 0,
  };

  const sortedData = sort ? filteredData.sort(sortOptions[sort]) : filteredData;

  if (sortedData.length === 0)
    return <div className="p-4 font-semibold">No employees found...</div>;

  if (sortedData)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 py-4">
        {showList
          ? sortedData.map((person) => (
              <EmployeeList
                person={person}
                key={`${person.phoneNumber}_${person.email}`}
              />
            ))
          : sortedData.map((person) => (
              <EmployeeCard
                person={person}
                key={`${person.phoneNumber}_${person.email}`}
              />
            ))}
      </div>
    );
  return <></>;
};

EmployeeDisplay.propTypes = {
  data: PropTypes.array,
  showList: PropTypes.bool,
};

export default EmployeeDisplay;
