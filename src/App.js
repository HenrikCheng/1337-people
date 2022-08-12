import "./App.css";
import axios from "axios";
import useSWR from "swr";

function App() {
  const fetcher = (url, token) =>
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
    <div className="flex flex-row flex-wrap">
      {data.map((person) => (
        <div key={person.email} className="w-1/4 p-2 flex flex-col">
          {person.imagePortraitUrl ? (
            <img src={person.imagePortraitUrl} alt="" />
          ) : (
            <img
              className="w-full h-full object-cover"
              src="https://i0.wp.com/tungelfastigheter.se/wp-content/uploads/2018/04/default-user-img.jpg?ssl=1"
              alt=""
            />
          )}
          <h3>{person.name}</h3>
          <p>Office: {person.office}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
