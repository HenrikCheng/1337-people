import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Loader = () => (
  <div
    role="status"
    data-testid="loader-component"
    className="w-full h-screen flex items-start justify-center pt-20"
  >
    <FontAwesomeIcon icon={faGear} className="w-40 h-40 animate-spin" />
    <FontAwesomeIcon
      icon={faGear}
      className="w-40 h-40 animate-reverse-spin mt-10 text-gray-500"
    />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;
