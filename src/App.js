import axios from "axios";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

import "./App.css";

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

  if (error) return <div>{error.toString()}</div>;

  if (!data) return <div>loading...</div>;

  console.log(data);
  return (
    <div className="bg-gray-100 p-4 pt-10">
      <h1 className="text-2xl bold px-4">The fellowship of the tretton37</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
        {data.map((person) => (
          <div
            key={`${person.phoneNumber}_${person.email}`}
            className="bg-white shadow-xl rounded-lg flex flex-col justify-end hover:-translate-y-1 duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              {person.imagePortraitUrl ? (
                <img src={person.imagePortraitUrl} alt="portrait of employee" className="w-full" />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-full h-full bg-white"
                />
              )}
              <div className="flex flex-col lg:flex-row justify-between p-4 h-28">
                <div>
                  <h3>{person.name}</h3>
                  <p>Office: {person.office}</p>
                </div>
                <div className="space-x-2 py-2 flex flex-nowrap">
                  <FontAwesomeIcon icon={faLinkedin} className="fa-xl" />
                  <FontAwesomeIcon icon={faGithubSquare} className="fa-xl" />
                  <FontAwesomeIcon icon={faTwitterSquare} className="fa-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
