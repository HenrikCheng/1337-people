import React, { useEffect, useState, lazy } from "react";
import axios from "axios";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import useLocalstorage from "./utils/useLocalStorage";
import FilterArea from "./components/FilterArea";
import Loader from "./components/Loader";
import EmployeeDisplay from "./components/EmployeeDisplay";

function App() {
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
  console.log("🚀 ~ file: App.js:27 ~ App ~ data:", data);

  const [showList, setShowList] = useState();

  // const [name, setName] = useLocalstorage("name", "");

  return (
    <main className="bg-gray-100 p-4 sm:p-8 pt-10 min-h-screen">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        The fellowship of{" "}
        <span className="underline underline-offset-3">Tretton37</span>
      </h1>
      {/* <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
      <FilterArea showList={showList} setShowList={setShowList} />
      {data ? (
        <EmployeeDisplay
          data={data}
          showList={showList}
          setShowList={showList}
        />
      ) : (
        <Loader />
      )}
      {data && data.length === 0 && "No employees found"}
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
