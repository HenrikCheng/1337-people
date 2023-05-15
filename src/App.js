import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import FilterArea from "./components/FilterArea";
import Loader from "./components/Loader";

const EmployeesDisplay = lazy(() => import("./components/EmployeesDisplay"));

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [filterOffice, setFilterOffice] = useState("All");
  const [filterName, setFilterName] = useState("");
  const [sortMode, setSortMode] = useState("nameDescending");
  const [showList, setShowList] = useState();

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: {
          Authorization:
            process.env.NODE_ENV === "development"
              ? process.env.REACT_APP_DEV_MODE_API
              : process.env.REACT_APP_PROD_MODE_API,
        },
      })
      .then((res) => res.data);

  const { data, error } = useSWR("https://api.1337co.de/v3/employees", fetcher);
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

  return (
    <main className="bg-gray-100 p-4 pt-10 min-h-screen">
      <h1 className="text-4xl bold md:text-8xl md:font-extrabold mb-8 mx-4">
        The fellowship of the tretton37
      </h1>
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
      {employeeData.length === 0 && "No employees found"}
      {error && (
        <div className="bg-gray-100 p-4 pt-10 h-screen w-full flex flex-col items-center justify-center space-y-4">
          <FontAwesomeIcon icon={faScrewdriverWrench} className="fa-2xl" />
          <h2 className="bold">Oops, something went wrong.</h2>
          <p>Try reloading the page...</p>
        </div>
      )}
    </main>
  );
}

export default App;
