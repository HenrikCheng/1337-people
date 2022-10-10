import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import EmployeesDisplay from "./components/EmployeesDisplay";
import FilterArea from "./components/FilterArea";
import Loader from "./components/Loader";

function App() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    "https://randomuser.me/api/?results=30",
    fetcher
  );

  const [employeeData, setEmployeeData] = useState([]);
  const [filterOffice, setFilterOffice] = useState("All");
  const [filterName, setFilterName] = useState("");
  const [sortMode, setSortMode] = useState("nameDescending");
  const [showList, setShowList] = useState();

  // useEffect(() => {
  //   if (data) {
  //     if (filterOffice === "All") {
  //       setEmployeeData(
  //         data.filter((person) =>
  //           person.name.toLowerCase().includes(filterName.toLowerCase())
  //         )
  //       );
  //     } else {
  //       setEmployeeData(
  //         data
  //           .filter((person) =>
  //             person.name.toLowerCase().includes(filterName.toLowerCase())
  //           )
  //           .filter((person) => person.office === filterOffice)
  //       );
  //     }
  //   }
  // }, [data, filterName, filterOffice, sortMode]);

  if (error) {
    console.log(error.toString());
    return (
      <div className="bg-gray-100 p-4 pt-10 h-screen w-full flex flex-col items-center justify-center space-y-4">
        <FontAwesomeIcon icon={faScrewdriverWrench} className="fa-2xl" />
        <h2 className="bold">Oops, something went wrong.</h2>
        <p>Try reloading the page...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 pt-10">
      <h1 className="text-3xl bold mb-8 mx-4">
        The fellowship of the tretton37
      </h1>
      {data && (
        <FilterArea
          setFilterName={setFilterName}
          setFilterOffice={setFilterOffice}
          setSortMode={setSortMode}
          setEmployeeData={setEmployeeData}
          data={data}
          showList={showList}
          setShowList={setShowList}
        />
      )}
      {data ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6 p-4">
          {data.results.map((person) => (
            <div>
              <img
                className="grayscale w-50 h-auto rounded-lg"
                src={person.picture.large}
                alt={`portrait of ${person.name.first} ${person.name.last}`}
              />
              {person.name.first} {person.name.last}
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
