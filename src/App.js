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
  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization:
            "api-key 14:2022-08-11:alicia.sjoberg@1337.tech f0974dfbeeed5a03ab6c64a9e99db84d013967c7a457f7674a38a5b5e065daea",
        },
      })
      .then((res) => res.data);

  const { data, error } = useSWR("https://api.1337co.de/v3/employees", fetcher);

  const [employeeData, setEmployeeData] = useState([]);
  const [filterOffice, setFilterOffice] = useState("All");
  const [filterName, setFilterName] = useState("");
  const [sortMode, setSortMode] = useState("nameDescending");
  const [showList, setShowList] = useState();

  useEffect(() => {
    if (data) {
      if (filterOffice === "All") {
        setEmployeeData(
          data.filter((person) =>
            person.name.toLowerCase().includes(filterName.toLowerCase())
          )
        );
      } else {
        setEmployeeData(
          data
            .filter((person) =>
              person.name.toLowerCase().includes(filterName.toLowerCase())
            )
            .filter((person) => person.office === filterOffice)
        );
      }
    }
  }, [data, filterName, filterOffice, sortMode]);

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
      <h1 className="text-3xl bold mb-8 mx-4">The fellowship of the tretton37</h1>
      <FilterArea
        setFilterName={setFilterName}
        setFilterOffice={setFilterOffice}
        setSortMode={setSortMode}
        setEmployeeData={setEmployeeData}
        data={data}
        showList={showList}
        setShowList={setShowList}
      />
      {data ? (
        <EmployeesDisplay
          data={employeeData}
          showList={showList}
          setShowList={showList}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
