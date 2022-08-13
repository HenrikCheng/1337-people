import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const EmployeeCard = ({ person }) => {
  console.log(person);
  return (
    <div className="bg-white shadow-xl rounded-lg flex flex-col justify-end hover:-translate-y-1 duration-300 ease-in-out">
      <div className="flex flex-col">
        {person.imagePortraitUrl ? (
          <img
            src={person.imagePortraitUrl}
            alt="portrait of employee"
            className="w-full"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="w-full h-auto bg-white"
          />
        )}
        <div className="flex flex-col w-full lg:flex-row justify-between p-4 h-28">
          <div className="flex flex-col items-start">
            <h3>{person.name}</h3>
            <p>Office: {person.office}</p>
          </div>
          <div className="space-x-2 py-2 flex flex-nowrap">
            {person.linkedIn && (
              <a href={`https://linkedIn.com/${person.linkedIn}`}><FontAwesomeIcon icon={faLinkedin} className="fa-xl hover:text-gray-500" /></a>
            )}
            {person.gitHub && (
              <a href={`https://github.com/${person.gitHub}`}><FontAwesomeIcon icon={faGithubSquare} className="fa-xl hover:text-gray-500" /></a>
            )}
            {person.twitter && (
              <a href={`https://twitter.com/${person.twitter}`}><FontAwesomeIcon icon={faTwitterSquare} className="fa-xl hover:text-gray-500" /></a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeCard.propTypes = {
  person: PropTypes.object.isRequired,
};

export default EmployeeCard;
