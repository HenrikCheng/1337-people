import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";

const StarredConsultants = () => {
  // const starredConsultants = JSON.parse(
  //   localStorage.getItem("favorite-consultants")
  // );
  // const [consultants, setConsultants] = useState(starredConsultants || []);
  // useEffect(() => {
  //   const peoples = JSON.parse(localStorage.getItem("favorite-consultants"));
  //   setConsultants(peoples);
  // }, [localStorage]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl">
        Starred Consultants
      </h2>
    </div>
  );
};

export default StarredConsultants;
