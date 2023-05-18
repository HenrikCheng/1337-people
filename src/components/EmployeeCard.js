import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithubSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import parse from "html-react-parser";

const EmployeeCard = ({ person }) => {
  const [open, setOpen] = useState(false);

  const CardDetails = () => {
    const htmlString = person.mainText;
    return (
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed z-10 inset-0 rounded-lg flex p-20"
      >
        <img
          src={person.imageWallOfLeetUrl}
          alt={`portrait of ${person.name}`}
          className="h-full grayscale object-cover"
        />
        <div className="bg-gray-900 text-white h-full overflow-y-scroll p-4">
          <span className="leading-relaxed underline-offset-4">
            {parse(htmlString)}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="relative">
      {open && <CardDetails />}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`bg-white shadow-xl rounded-lg flex flex-col justify-end duration-300 ease-in-out ${
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
        <div className="flex flex-col w-full lg:flex-row justify-between p-2 sm:p-4">
          <div className="flex flex-col items-start">
            <h4 className="whitespace-nowrap hyphens-auto font-semibold">{person.name}</h4>
            <p className="whitespace-nowrap hyphens-auto">
              {person.primaryRole}
            </p>
            <p className="whitespace-nowrap hyphens-auto">{`Office: ${person.office}`}</p>
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
