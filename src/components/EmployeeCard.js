import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const EmployeeCard = ({ person }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg flex flex-col justify-end hover:-translate-y-1 duration-300 ease-in-out">
      <button className="flex flex-col" type="button">
        {person.imagePortraitUrl ? (
          <img
            src={person.imagePortraitUrl}
            alt="portrait of employee"
            className="w-full"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="w-full h-full bg-white" />
        )}
        <div className="flex flex-col w-full lg:flex-row justify-between p-4 h-28">
          <div className="flex flex-col items-start">
            <h3>{person.name}</h3>
            <p>Office: {person.office}</p>
          </div>
          <div className="space-x-2 py-2 flex flex-nowrap">
            <FontAwesomeIcon icon={faLinkedin} className="fa-xl" />
            <FontAwesomeIcon icon={faGithubSquare} className="fa-xl" />
            <FontAwesomeIcon icon={faTwitterSquare} className="fa-xl" />
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
