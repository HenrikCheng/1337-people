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
    nameAscending: (a, b) => {
      if (!a.name || !b.name) return 0;
      return b.name.localeCompare(a.name);
    },
    nameDescending: (a, b) => {
      if (!a.name || !b.name) return 0;
      return a.name.localeCompare(b.name);
    },
    officeDescending: (a, b) => {
      if (!a.office || !b.office) return 0;
      return b.office.localeCompare(a.office);
    },
    officeAscending: (a, b) => {
      if (!a.office || !b.office) return 0;
      return a.office.localeCompare(b.office);
    },
  };

  const sortedData = sort ? filteredData.sort(sortOptions[sort]) : filteredData;

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
