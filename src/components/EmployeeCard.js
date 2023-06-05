import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import EmployeeModal from "./EmployeeModal";

const EmployeeCard = ({ person }) => {
  const [open, setOpen] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("favorite-consultants")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("favorite-consultants", JSON.stringify(items));
  };

  const addFavouriteConsultant = (movie) => {
    let newFavouriteList = [...favourites, movie];
    favourites.forEach((element) => {
      if (element === movie) {
        newFavouriteList = favourites;
      }
    });
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteConsultant = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.name !== movie.name
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="relative">
      {open && <EmployeeModal person={person} open={open} setOpen={setOpen} />}
      <button
        onClick={(e) => {
          addFavouriteConsultant(person);
          e.preventDefault();
        }}
        type="button"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="fa-xl hover:text-gray-500 absolute top-5 right-0 z-10 p-2"
        />
      </button>
      <button
        onClick={(e) => {
          removeFavouriteConsultant(person);
          e.preventDefault();
        }}
        type="button"
      >
        <FontAwesomeIcon
          icon={faMinus}
          className="fa-xl hover:text-gray-500 absolute top-5 left-0 z-10 p-2"
        />
      </button>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`bg-white shadow-xl rounded-lg flex flex-col justify-end duration-300 h-full ease-in-out relative ${
          open ? "-translate-y-1" : "hover:-translate-y-1"
        }`}
      >
        {person.imagePortraitUrl ? (
          <img
            src={person.imagePortraitUrl}
            alt="portrait of employee"
            className="h-full grayscale object-cover rounded-t-lg"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="w-full h-auto bg-white" />
        )}
        <div
          // style={{ minheight: "104 px" }}
          className="flex flex-col w-full lg:flex-row justify-between p-2 sm:p-4 h-[6.5rem]"
        >
          <div className="flex flex-col items-start">
            <h4 className="whitespace-nowrap hyphens-auto font-semibold">
              {person.name}
            </h4>
            <p className="whitespace-nowrap">
              {person.primaryRole === "Product"
                ? "Product Owner"
                : person.primaryRole}
            </p>
            {person.office && (
              <p className="whitespace-nowrap hyphens-auto">{`Office: ${person.office}`}</p>
            )}
          </div>
          <div className="space-x-2 py-2 flex flex-nowrap">
            {person.linkedIn && (
              <a href={`https://linkedIn.com/${person.linkedIn}`}>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="fa-xl hover:text-gray-500"
                />
              </a>
            )}
            {person.gitHub && (
              <a href={`https://github.com/${person.gitHub}`}>
                <FontAwesomeIcon
                  icon={faGithubSquare}
                  className="fa-xl hover:text-gray-500"
                />
              </a>
            )}
            {person.twitter && (
              <a href={`https://twitter.com/${person.twitter}`}>
                <FontAwesomeIcon
                  icon={faTwitterSquare}
                  className="fa-xl hover:text-gray-500"
                />
              </a>
            )}

            {!person.twitter && !person.gitHub && !person.linkedIn && (
              <div className="h-6" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

EmployeeCard.propTypes = {
  person: PropTypes.object.isRequired,
};

export default EmployeeCard;
