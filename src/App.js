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
    <div className="bg-gray-100 sm:p-4">
      <h1 className="text-2xl bold">The fellowship of the tretton37</h1>
      <div className="flex flex-row flex-wrap">
        {data.map((person) => (
          <div
            key={`${person.phoneNumber}_${person.email}`}
            className="w-1/2 xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-1/3 p-2 flex flex-col justify-end"
          >
            {person.imagePortraitUrl ? (
              <img
                src={person.imagePortraitUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="w-full h-full pt-16 bg-white"
              />
            )}
            <div className="flex flex-col sm:flex-row justify-between p-4">
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
        ))}
      </div>
    </div>
  );
}

export default App;
